import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Camera, MapPin, AlertTriangle, Clock, Image, Trash, Crosshair } from "lucide-react";
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
    // Get current location when component mounts
    getCurrentLocation();
    
    // Set default severity based on report type
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
      setSelectedLocation(location); // Default to current location
    } catch (error) {
      console.warn('Could not get current location:', error);
      // Fallback to UCSD campus center
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

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Create marker for incident location
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

    // Update selected location when marker is dragged
    marker.current.on('dragend', () => {
      const lngLat = marker.current?.getLngLat();
      if (lngLat) {
        setSelectedLocation({
          lat: lngLat.lat,
          lng: lngLat.lng
        });
      }
    });

    // Allow clicking on map to set location
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
    { value: 'police', label: 'Police Activity', color: 'bg-orange-500', hoverColor: 'hover:bg-orange-600', description: 'Police presence or enforcement activity' },
    { value: 'ice', label: 'ICE Activity - Critical', color: 'bg-red-700', hoverColor: 'hover:bg-red-800', description: 'Immigration enforcement - immediate danger' },
    { value: 'general', label: 'General Safety Concern', color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600', description: 'Other safety-related incidents' },
    { value: 'emergency', label: 'Emergency Situation', color: 'bg-red-500', hoverColor: 'hover:bg-red-600', description: 'Immediate help needed' }
  ];

  const handleTakePhoto = async () => {
    try {
      const photo = await cameraService.takeIncidentPhoto(reportType as any);
      if (photo) {
        setPhotos(prev => [...prev, photo]);
        toast({
          title: "Photo captured",
          description: "Evidence photo has been securely stored with location data",
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
      // Create incident report
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

      // Create new incident for the map
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

      console.log('Submitting new incident:', newIncident);

      // Store incident locally for the map FIRST
      const incidents = JSON.parse(localStorage.getItem('trition_incidents') || '[]');
      incidents.push(newIncident);
      localStorage.setItem('trition_incidents', JSON.stringify(incidents));
      console.log('Incident stored locally:', incidents.length, 'total incidents');

      // Store report details
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

      // Send community alert with enhanced notification
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

      // Trigger a custom event to update the map IMMEDIATELY
      console.log('Dispatching newIncidentReported event');
      window.dispatchEvent(new CustomEvent('newIncidentReported', { 
        detail: newIncident 
      }));

      // Show immediate success feedback
      toast({
        title: "Report submitted successfully! 🚨",
        description: "Community members have been alerted. Your report is now visible on the map.",
      });

      // Add a small delay to ensure the map updates before navigation
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
          bgColor: 'bg-orange-500/10'
        };
      case 'ice':
        return {
          title: 'ICE Activity',
          description: 'Report immigration enforcement activity',
          icon: AlertTriangle,
          color: 'text-red-500',
          bgColor: 'bg-red-500/10'
        };
      default:
        return {
          title: 'General Incident',
          description: 'Report any safety concern',
          icon: AlertTriangle,
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10'
        };
    }
  };

  const typeInfo = getReportTypeInfo(reportType);
  const IconComponent = typeInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-6"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/map")}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">Report Incident</h1>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Incident Type */}
          <div className={`${typeInfo.bgColor} border border-white/10 rounded-xl p-6`}>
            <div className="flex items-center space-x-4">
              <IconComponent className={`w-8 h-8 ${typeInfo.color}`} />
              <div>
                <h2 className="text-xl font-bold">{typeInfo.title}</h2>
                <p className="text-gray-300">{typeInfo.description}</p>
              </div>
            </div>
          </div>

          {/* Location Selection */}
          <div className="space-y-4">
            <label className="text-lg font-semibold">Incident Location</label>
            
            {selectedLocation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="font-medium">Selected Location</p>
                      <p className="text-sm text-gray-300">
                        {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMapSelector(!showMapSelector)}
                    className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
                  >
                    <Crosshair className="w-4 h-4 mr-2" />
                    {showMapSelector ? 'Hide Map' : 'Select on Map'}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Map Selector */}
            {showMapSelector && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 300 }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
              >
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-3">
                    Drag the red marker or click anywhere on the map to set the incident location
                  </p>
                  <div ref={mapRef} className="w-full h-64 rounded-lg overflow-hidden" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Severity Selection */}
          <div className="space-y-3">
            <label className="text-lg font-semibold">Incident Type & Priority</label>
            
            {severity === 'ice' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-center space-x-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-red-200">Critical Priority Selected</div>
                  <div className="text-red-300">This report will be marked as immediate danger and sent with highest priority to the community.</div>
                </div>
              </motion.div>
            )}
            
            <div className="grid grid-cols-1 gap-2.5">
              {severityOptions.map((option) => {
                const isSelected = severity === option.value;
                return (
                  <Button
                    key={option.value}
                    type="button"
                    onClick={() => setSeverity(option.value)}
                    variant="ghost"
                    className={cn(
                      "w-full h-auto p-3 text-left rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 justify-start",
                      isSelected
                        ? `${option.color} ${option.hoverColor} text-white border-transparent focus-visible:ring-white`
                        : "bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600 focus-visible:ring-slate-400"
                    )}
                  >
                    <div className="flex items-center w-full">
                      <div className={cn("w-2.5 h-2.5 rounded-full mr-3 flex-shrink-0", option.color)}></div>
                      <div className="flex-1">
                        <p className={cn(
                          "font-medium text-sm",
                          isSelected ? "text-white" : "text-slate-100"
                        )}>
                          {option.label}
                        </p>
                        <p className={cn(
                          "text-xs mt-0.5",
                          isSelected ? "text-white/80" : "text-slate-400"
                        )}>
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Photo Evidence */}
          <div className="space-y-4">
            <label className="text-lg font-semibold">Photo Evidence (Optional)</label>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={handleTakePhoto}
                className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-4 rounded-xl flex flex-col items-center justify-center space-y-3 min-h-[80px]"
              >
                <Camera className="w-6 h-6 flex-shrink-0" />
                <span className="text-sm font-medium">Take Photo</span>
              </Button>
              
              <Button
                type="button"
                onClick={handleSelectFromGallery}
                className="bg-gray-600 hover:bg-gray-700 text-white py-6 px-4 rounded-xl flex flex-col items-center justify-center space-y-3 min-h-[80px]"
              >
                <Image className="w-6 h-6 flex-shrink-0" />
                <span className="text-sm font-medium">From Gallery</span>
              </Button>
            </div>

            {/* Photo Preview */}
            {photos.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-300">{photos.length} photo(s) attached</p>
                <div className="flex flex-wrap gap-2">
                  {photos.map((photo) => (
                    <div key={photo.id} className="relative bg-gray-800 rounded-lg p-2 flex items-center space-x-2">
                      <Image className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-300">
                        {photo.type} - {new Date(photo.timestamp).toLocaleTimeString()}
                      </span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removePhoto(photo.id)}
                        className="w-6 h-6 text-red-400 hover:text-red-300"
                      >
                        <Trash className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-lg font-semibold">Additional Details (Optional)</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you observed, number of individuals, vehicles, etc."
              className="min-h-24 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Submit Report & Alert Community</span>
              </div>
            )}
          </Button>

          <p className="text-xs text-gray-400 text-center">
            Reports are anonymous and help keep the community safe
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default ReportIncident;
