import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Camera, MapPin, AlertTriangle, Clock, Image, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CameraService, { IncidentPhoto } from "@/services/CameraService";
import NotificationService from "@/services/NotificationService";
import { Geolocation } from '@capacitor/geolocation';

const ReportIncident = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const reportType = searchParams.get('type') || 'general';
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<IncidentPhoto[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  const cameraService = CameraService.getInstance();
  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    // Get current location when component mounts
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (error) {
      console.warn('Could not get current location:', error);
    }
  };

  const severityOptions = [
    { value: 'low', label: 'Low Priority', color: 'bg-yellow-500' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-orange-500' },
    { value: 'high', label: 'High Priority', color: 'bg-red-500' },
    { value: 'critical', label: 'Critical - Immediate Danger', color: 'bg-red-700' }
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
      
      // Send community alert
      await notificationService.sendCommunityAlert({
        id: incidentId,
        type: reportType as any,
        title: getReportTypeInfo(reportType).title,
        body: description || `${getReportTypeInfo(reportType).title} reported in your area`,
        location: currentLocation ? {
          lat: currentLocation.lat,
          lng: currentLocation.lng,
          address: 'UCSD Campus'
        } : undefined,
        severity: severity as any,
        timestamp: Date.now(),
      });

      // Store incident locally
      const incidents = JSON.parse(localStorage.getItem('trition_incidents') || '[]');
      incidents.push({
        id: incidentId,
        type: reportType,
        description,
        severity,
        photos: photos.map(p => p.id),
        location: currentLocation,
        timestamp: Date.now(),
      });
      localStorage.setItem('trition_incidents', JSON.stringify(incidents));

      toast({
        title: "Report submitted successfully",
        description: "Community members have been alerted. Stay safe.",
      });
      
      setTimeout(() => {
        navigate("/map");
      }, 1500);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Could not submit report. Please try again.",
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

          {/* Current Location */}
          {currentLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-medium">Current Location</p>
                  <p className="text-sm text-gray-300">
                    {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Severity Selection */}
          <div className="space-y-3">
            <label className="text-lg font-semibold">Severity Level</label>
            <div className="grid grid-cols-2 gap-3">
              {severityOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  onClick={() => setSeverity(option.value)}
                  variant={severity === option.value ? "default" : "outline"}
                  className={`p-4 text-left ${
                    severity === option.value 
                      ? `${option.color} text-white` 
                      : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Photo Evidence */}
          <div className="space-y-4">
            <label className="text-lg font-semibold">Photo Evidence (Optional)</label>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={handleTakePhoto}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl flex flex-col items-center space-y-2"
              >
                <Camera className="w-6 h-6" />
                <span>Take Photo</span>
              </Button>
              
              <Button
                type="button"
                onClick={handleSelectFromGallery}
                className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-xl flex flex-col items-center space-y-2"
              >
                <Image className="w-6 h-6" />
                <span>From Gallery</span>
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
