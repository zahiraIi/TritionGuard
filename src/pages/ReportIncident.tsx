
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Camera, MapPin, AlertTriangle, Image, Trash, Crosshair, Send } from "lucide-react";
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
      label: 'General Safety Concern', 
      color: 'from-yellow-400 to-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      description: 'Other safety-related incidents' 
    },
    { 
      value: 'police', 
      label: 'Police Activity', 
      color: 'from-orange-400 to-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'Police presence or enforcement activity' 
    },
    { 
      value: 'ice', 
      label: 'ICE Activity - Critical', 
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      description: 'Immigration enforcement - immediate danger' 
    },
    { 
      value: 'emergency', 
      label: 'Emergency Situation', 
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      description: 'Immediate help needed' 
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
        return {
          title: 'Police Activity',
          description: 'Report police presence or activity',
          icon: AlertTriangle,
          color: 'text-orange-500',
          bgColor: 'from-orange-50 to-orange-100'
        };
      case 'ice':
        return {
          title: 'ICE Activity',
          description: 'Report immigration enforcement activity',
          icon: AlertTriangle,
          color: 'text-red-500',
          bgColor: 'from-red-50 to-red-100'
        };
      default:
        return {
          title: 'General Incident',
          description: 'Report any safety concern',
          icon: AlertTriangle,
          color: 'text-blue-500',
          bgColor: 'from-blue-50 to-blue-100'
        };
    }
  };

  const typeInfo = getReportTypeInfo(reportType);
  const IconComponent = typeInfo.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/map")}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Report Incident</h1>
              <p className="text-gray-300 text-sm">Anonymous community alert</p>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container mx-auto px-6 py-6 space-y-6">
        {/* Incident Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${typeInfo.bgColor} rounded-2xl p-6 border border-gray-100`}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">{typeInfo.title}</h2>
              <p className="text-gray-600">{typeInfo.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Location Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Incident Location</h3>
          
          {selectedLocation && (
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Selected Location</p>
                    <p className="text-sm text-gray-600">
                      {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMapSelector(!showMapSelector)}
                  className="rounded-xl"
                >
                  <Crosshair className="w-4 h-4 mr-2" />
                  {showMapSelector ? 'Hide' : 'Edit'}
                </Button>
              </div>
            </div>
          )}

          {showMapSelector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 300 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
            >
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">
                  Drag the marker or tap to set the incident location
                </p>
                <div ref={mapRef} className="w-full h-64 rounded-xl overflow-hidden" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Severity Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Incident Priority</h3>
          
          <div className="space-y-3">
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
                      "w-full p-4 h-auto rounded-2xl border-2 transition-all duration-200",
                      isSelected
                        ? `${option.bgColor} ${option.borderColor} shadow-sm`
                        : "bg-white border-gray-100 hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        isSelected ? `bg-gradient-to-r ${option.color}` : "bg-gray-100"
                      )}>
                        <div className={cn(
                          "w-2.5 h-2.5 rounded-full",
                          isSelected ? "bg-white" : "bg-gray-400"
                        )}></div>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-900">{option.label}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Photo Evidence */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Photo Evidence (Optional)</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={handleTakePhoto}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6 rounded-2xl shadow-sm"
            >
              <div className="flex flex-col items-center space-y-2">
                <Camera className="w-6 h-6" />
                <span className="text-sm font-medium">Take Photo</span>
              </div>
            </Button>
            
            <Button
              type="button"
              onClick={handleSelectFromGallery}
              className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 py-6 rounded-2xl shadow-sm"
              variant="outline"
            >
              <div className="flex flex-col items-center space-y-2">
                <Image className="w-6 h-6" />
                <span className="text-sm font-medium">From Gallery</span>
              </div>
            </Button>
          </div>

          {photos.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{photos.length} photo(s) attached</p>
              <div className="space-y-2">
                {photos.map((photo) => (
                  <div key={photo.id} className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Image className="w-4 h-4 text-blue-600" />
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
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Additional Details (Optional)</h3>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you observed, number of individuals, vehicles, etc."
            className="min-h-24 rounded-2xl border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 rounded-2xl shadow-lg transition-all duration-300"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Sending Alert...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Send className="w-5 h-5" />
              <span>Submit Report & Alert Community</span>
            </div>
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Reports are anonymous and help keep the community safe
        </p>
      </form>

      {/* Bottom Safe Area */}
      <div className="h-8"></div>
    </div>
  );
};

export default ReportIncident;
