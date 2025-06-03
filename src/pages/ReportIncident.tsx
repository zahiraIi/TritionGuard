import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Camera, MapPin, AlertTriangle, Image, Trash, Send, Crosshair } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CameraService, { IncidentPhoto } from "@/services/CameraService";
import NotificationService from "@/services/NotificationService";
import { Geolocation } from '@capacitor/geolocation';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cn } from "@/lib/utils";

const ReportIncident = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const reportType = searchParams.get('type') || 'general';
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<IncidentPhoto[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showMapSelector, setShowMapSelector] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const cameraService = CameraService.getInstance();
  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    getCurrentLocation();
    if (reportType === 'ice') {
      setSeverity('ice');
    } else if (reportType === 'police') {
      setSeverity('police');
    } else {
      setSeverity('general');
    }
  }, [reportType]);

  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrentLocation(location);
      setSelectedLocation(location);
    } catch (error) {
      console.warn('Could not get current location:', error);
      const fallbackLocation = { lat: 32.8801, lng: -117.2340 };
      setCurrentLocation(fallbackLocation);
      setSelectedLocation(fallbackLocation);
    }
  };

  const initializeMapSelector = () => {
    if (!mapRef.current || !currentLocation) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoiemFsaTEiLCJhIjoiY21iYTdmMzQzMHlyaDJtb2RxM3hobGdvYSJ9.ps3ojvR2-xQopxq6NwRt4A';

    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [selectedLocation?.lng || currentLocation.lng, selectedLocation?.lat || currentLocation.lat],
      zoom: 16
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const el = document.createElement('div');
    el.className = 'incident-location-marker';
    el.innerHTML = `
      <div style="
        width: 20px;
        height: 20px;
        background-color: #dc2626;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        cursor: grab;
      "></div>
    `;

    marker.current = new mapboxgl.Marker({
      element: el,
      draggable: true
    })
      .setLngLat([selectedLocation?.lng || currentLocation.lng, selectedLocation?.lat || currentLocation.lat])
      .addTo(map.current);

    marker.current.on('dragend', () => {
      const lngLat = marker.current?.getLngLat();
      if (lngLat) {
        setSelectedLocation({
          lat: lngLat.lat,
          lng: lngLat.lng
        });
      }
    });

    map.current.on('click', (e) => {
      const location = {
        lat: e.lngLat.lat,
        lng: e.lngLat.lng
      };
      setSelectedLocation(location);
      marker.current?.setLngLat([location.lng, location.lat]);
    });
  };

  useEffect(() => {
    if (showMapSelector) {
      setTimeout(() => {
        initializeMapSelector();
      }, 100);
    }
    
    return () => {
      map.current?.remove();
    };
  }, [showMapSelector, currentLocation]);

  const severityOptions = [
    { 
      value: 'general', 
      label: 'General Safety', 
      color: 'bg-yellow-500',
      description: 'Other safety concerns' 
    },
    { 
      value: 'police', 
      label: 'Police Activity', 
      color: 'bg-orange-500',
      description: 'Police presence or activity' 
    },
    { 
      value: 'ice', 
      label: 'ICE Activity', 
      color: 'bg-red-500',
      description: 'Immigration enforcement' 
    }
  ];

  const handleTakePhoto = async () => {
    try {
      const photo = await cameraService.takeIncidentPhoto(reportType as any);
      if (photo) {
        setPhotos(prev => [...prev, photo]);
        toast({
          title: "Photo captured",
          description: "Evidence photo has been securely stored",
        });
      }
    } catch (error) {
      toast({
        title: "Camera error",
        description: "Could not take photo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSelectFromGallery = async () => {
    try {
      const photo = await cameraService.selectFromGallery();
      if (photo) {
        setPhotos(prev => [...prev, photo]);
        toast({
          title: "Photo selected",
          description: "Photo has been added to your report",
        });
      }
    } catch (error) {
      toast({
        title: "Gallery error",
        description: "Could not select photo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const incidentId = `incident_${Date.now()}`;
      const reportLocation = selectedLocation || currentLocation;
      
      if (!reportLocation) {
        toast({
          title: "Location required",
          description: "Please allow location access or select a location on the map.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const newIncident = {
        id: incidentId,
        lat: reportLocation.lat,
        lng: reportLocation.lng,
        type: reportType,
        severity: severity,
        time: "Just now",
        description: description || `${getReportTypeInfo(reportType).title} reported`,
        verified: false,
        reports: 1,
        timestamp: Date.now()
      };

      const incidents = JSON.parse(localStorage.getItem('trition_incidents') || '[]');
      incidents.push(newIncident);
      localStorage.setItem('trition_incidents', JSON.stringify(incidents));

      const reports = JSON.parse(localStorage.getItem('trition_reports') || '[]');
      reports.push({
        id: incidentId,
        type: reportType,
        description,
        severity,
        photos: photos.map(p => p.id),
        location: reportLocation,
        timestamp: Date.now(),
      });
      localStorage.setItem('trition_reports', JSON.stringify(reports));

      await notificationService.sendCommunityAlert({
        id: incidentId,
        type: reportType as any,
        title: `${getReportTypeInfo(reportType).title} Alert`,
        body: description || `${getReportTypeInfo(reportType).title} reported in your area. Stay alert and be safe.`,
        location: {
          lat: reportLocation.lat,
          lng: reportLocation.lng,
          address: 'UCSD Campus Area'
        },
        severity: severity as any,
        timestamp: Date.now(),
      });

      window.dispatchEvent(new CustomEvent('newIncidentReported', { 
        detail: newIncident 
      }));

      toast({
        title: "Report submitted successfully! 🚨",
        description: "Community members have been alerted.",
      });

      setTimeout(() => {
        navigate("/map");
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Submission failed",
        description: "Could not submit report. Please check your connection and try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const getReportTypeInfo = (type: string) => {
    switch (type) {
      case 'police':
        return { title: 'Police Activity', icon: AlertTriangle };
      case 'ice':
        return { title: 'ICE Activity', icon: AlertTriangle };
      default:
        return { title: 'General Incident', icon: AlertTriangle };
    }
  };

  const typeInfo = getReportTypeInfo(reportType);
  const IconComponent = typeInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm sticky top-0 z-50"
      >
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/map")}
              className="rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900">Report Incident</h1>
            </div>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6 max-w-md mx-auto">
        {/* Incident Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h2 className="font-medium text-gray-900">{typeInfo.title}</h2>
              <p className="text-sm text-gray-600">Anonymous community alert</p>
            </div>
          </div>
        </motion.div>

        {/* Location */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 px-1">Location</h3>
          
          {selectedLocation && (
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Current Location</p>
                    <p className="text-xs text-gray-500">
                      {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMapSelector(!showMapSelector)}
                  className="rounded-full"
                >
                  <Crosshair className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {showMapSelector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 250 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
            >
              <div className="p-3">
                <p className="text-sm text-gray-600 mb-2">Drag the marker or tap to set location</p>
                <div ref={mapRef} className="w-full h-52 rounded-xl overflow-hidden" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Priority */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 px-1">Priority Level</h3>
          
          <div className="space-y-2">
            {severityOptions.map((option) => {
              const isSelected = severity === option.value;
              return (
                <motion.div
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    onClick={() => setSeverity(option.value)}
                    variant="ghost"
                    className={cn(
                      "w-full p-4 h-auto rounded-2xl border transition-all duration-200",
                      isSelected
                        ? "bg-white border-gray-300 shadow-sm"
                        : "bg-white border-gray-100 hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        isSelected ? option.color : "bg-gray-100"
                      )}>
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          isSelected ? "bg-white" : "bg-gray-400"
                        )}></div>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-gray-900">{option.label}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Photos */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 px-1">Photos (Optional)</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              onClick={handleTakePhoto}
              className="bg-black hover:bg-gray-800 text-white py-4 rounded-2xl"
              variant="ghost"
            >
              <div className="flex flex-col items-center space-y-1">
                <Camera className="w-5 h-5" />
                <span className="text-sm">Camera</span>
              </div>
            </Button>
            
            <Button
              type="button"
              onClick={handleSelectFromGallery}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-2xl"
              variant="ghost"
            >
              <div className="flex flex-col items-center space-y-1">
                <Image className="w-5 h-5" />
                <span className="text-sm">Gallery</span>
              </div>
            </Button>
          </div>

          {photos.length > 0 && (
            <div className="space-y-2">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-xl p-3 flex items-center justify-between border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Image className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{photo.type} photo</p>
                      <p className="text-xs text-gray-500">
                        {new Date(photo.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removePhoto(photo.id)}
                    className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 px-1">Additional Details</h3>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you observed..."
            className="min-h-20 rounded-2xl border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 resize-none bg-white"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-2xl"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Sending Alert...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Submit Report</span>
            </div>
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center px-4">
          Reports are anonymous and help keep the community safe
        </p>
      </form>
    </div>
  );
};

export default ReportIncident;
