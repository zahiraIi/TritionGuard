
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Geolocation } from '@capacitor/geolocation';
import NotificationService, { AlertNotification } from "@/services/NotificationService";

const PanicButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();
  const notificationService = NotificationService.getInstance();
  
  // Safely get navigate hook
  let navigate;
  try {
    navigate = useNavigate();
    useEffect(() => {
      setIsRouterReady(true);
      // Get user location when component mounts
      getCurrentLocation();
    }, []);
  } catch (error) {
    console.log("Router not ready yet");
  }

  const getCurrentLocation = async () => {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      setUserLocation({
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      });
      console.log('User location obtained:', coordinates.coords.latitude, coordinates.coords.longitude);
    } catch (error) {
      console.log('Could not get user location:', error);
      // Fallback to UCSD campus center if geolocation fails
      setUserLocation({
        lat: 32.8801,
        lng: -117.2340
      });
    }
  };

  const handlePanicPress = async () => {
    if (isPressed) return;
    
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      console.log('Haptic feedback not available');
    }

    setIsPressed(true);
    setCountdown(5);

    const newIntervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(newIntervalId);
          setIntervalId(null);
          
          // Set emergency state
          sessionStorage.setItem('emergencyActivated', 'true');
          
          // Trigger emergency protocol
          toast({
            title: "Emergency Alert Sent",
            description: "Community has been notified. Accessing emergency resources...",
            variant: "destructive",
          });

          // Send community alert with location
          const alert: AlertNotification = {
            id: new Date().toISOString(),
            type: 'emergency',
            title: 'SOS Activation',
            body: 'An SOS has been activated by a community member. Please be vigilant.',
            severity: 'critical',
            timestamp: Date.now(),
            location: userLocation ? {
              lat: userLocation.lat,
              lng: userLocation.lng,
              address: 'Current Location'
            } : undefined
          };
          
          console.log('Sending emergency alert with location:', alert);
          notificationService.sendCommunityAlert(alert);

          // Also dispatch a custom event to add the emergency to the map
          if (userLocation) {
            window.dispatchEvent(new CustomEvent('addEmergencyIncident', {
              detail: {
                id: `emergency_${Date.now()}`,
                lat: userLocation.lat,
                lng: userLocation.lng,
                type: 'emergency',
                severity: 'critical',
                time: 'Now',
                description: 'SOS Emergency Alert',
                verified: true,
                reports: 1
              }
            }));
          }

          if (navigate && isRouterReady) {
            navigate("/emergency");
          } else {
            // Fallback if navigation isn't available
            window.location.href = "/emergency";
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const handleCancel = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsPressed(false);
    setCountdown(0);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {isPressed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-2"
        >
          <div className="text-white font-bold text-lg">{countdown}</div>
          <Button
            onClick={handleCancel}
            variant="outline"
            className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          >
            Cancel
          </Button>
        </motion.div>
      )}
      
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          onClick={handlePanicPress}
          disabled={isPressed}
          className={`w-20 h-20 rounded-full shadow-2xl font-bold text-lg transition-all duration-300 ${
            isPressed 
              ? 'bg-red-800 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isPressed ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <AlertTriangle className="w-8 h-8" />
            </motion.div>
          ) : (
            <div className="flex flex-col items-center">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-xs">SOS</span>
            </div>
          )}
        </Button>
        
        {!isPressed && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-red-600/30 rounded-full -z-10"
          />
        )}
      </motion.div>
      
      {!isPressed && (
        <p className="text-xs text-black font-medium text-center max-w-20">
          Emergency
        </p>
      )}
    </div>
  );
};

export default PanicButton;
