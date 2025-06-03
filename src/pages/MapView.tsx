import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, AlertTriangle, Shield, Camera, Bell, Info, Navigation, Plus, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MapComponent from "@/components/MapComponent";
import PanicButton from "@/components/PanicButton";
import AlertCard from "@/components/AlertCard";
import NotificationService, { AlertNotification } from "@/services/NotificationService";
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const MapView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<AlertNotification[]>([]);
  const [showAlerts, setShowAlerts] = useState(true);
  const [isNotificationInitialized, setIsNotificationInitialized] = useState(false);
  const [showTestButton, setShowTestButton] = useState(false);

  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    // Check if user is authenticated and has access
    const isAuthenticated = localStorage.getItem('trition_user_authenticated');
    const hasAccess = localStorage.getItem('trition_access_granted');
    
    if (!isAuthenticated || !hasAccess) {
      navigate('/auth');
      return;
    }

    // Initialize notifications
    initializeNotifications();

    // Load stored alerts
    loadStoredAlerts();

    // Set up community alert listener
    const handleCommunityAlert = (event: CustomEvent<AlertNotification>) => {
      addNewAlert(event.detail);
    };

    window.addEventListener('communityAlert', handleCommunityAlert as EventListener);

    // Show test button in development mode (when clicking top-left corner 3 times)
    let clickCount = 0;
    const handleCornerClick = (e: MouseEvent) => {
      if (e.clientX < 50 && e.clientY < 50) {
        clickCount++;
        if (clickCount >= 3) {
          setShowTestButton(true);
          console.log('Test mode enabled');
        }
      } else {
        clickCount = 0;
      }
    };

    window.addEventListener('click', handleCornerClick);

    return () => {
      window.removeEventListener('communityAlert', handleCommunityAlert as EventListener);
      window.removeEventListener('click', handleCornerClick);
    };
  }, [navigate]);

  const initializeNotifications = async () => {
    try {
      await notificationService.initialize();
      setIsNotificationInitialized(true);
      console.log('Notifications initialized successfully');
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  };

  const loadStoredAlerts = () => {
    const storedAlerts = notificationService.getStoredAlerts();
    // Only show alerts from the last 24 hours
    const recentAlerts = storedAlerts.filter(
      alert => Date.now() - alert.timestamp < 24 * 60 * 60 * 1000
    );
    setAlerts(recentAlerts);
  };

  const addNewAlert = async (alert: AlertNotification) => {
    setAlerts(prev => [alert, ...prev].slice(0, 10)); // Keep only latest 10 alerts

    // Trigger haptic feedback for new alerts
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      console.log('Haptic feedback not available');
    }

    // Show toast notification
    toast({
      title: alert.title,
      description: alert.body,
      variant: alert.severity === 'critical' || alert.severity === 'high' ? 'destructive' : 'default',
    });
  };

  const handleQuickReport = async (type: string) => {
    // Provide haptic feedback on button press
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      console.log('Haptic feedback not available');
    }
    
    navigate(`/report?type=${type}`);
  };

  const clearAllAlerts = () => {
    setAlerts([]);
    notificationService.clearAlerts();
    toast({
      title: "Alerts cleared",
      description: "All community alerts have been cleared",
    });
  };

  const getAlertStats = () => {
    const now = Date.now();
    const last24h = alerts.filter(alert => now - alert.timestamp < 24 * 60 * 60 * 1000);
    const lastHour = alerts.filter(alert => now - alert.timestamp < 60 * 60 * 1000);
    
    return {
      total24h: last24h.length,
      lastHour: lastHour.length,
      critical: alerts.filter(alert => alert.severity === 'critical').length,
    };
  };

  const stats = getAlertStats();

  const sendTestNotification = async () => {
    await notificationService.sendTestNotification();
  };

  const simulateICEAlert = async () => {
    await notificationService.sendCommunityAlert({
      id: `test_ice_${Date.now()}`,
      type: 'ice',
      title: 'ICE Activity Alert - Critical',
      body: 'Immigration enforcement activity reported in campus area. Avoid the location and seek safe spaces.',
      severity: 'ice',
      timestamp: Date.now(),
      location: {
        lat: 32.8801,
        lng: -117.2340,
        address: 'UCSD Campus Area'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-gray-900/95 to-transparent p-3 sm:p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            <div>
              <span className="font-bold text-base sm:text-lg">TritionGuard</span>
              {isNotificationInitialized && (
                <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-green-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="text-xs text-gray-300 text-right">
              <div>{stats.total24h} alerts (24h)</div>
              {stats.critical > 0 && (
                <div className="text-red-400">{stats.critical} critical</div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAlerts(!showAlerts)}
              className="text-white hover:bg-white/10 relative w-8 h-8 sm:w-auto sm:h-auto"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {stats.lastHour > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {stats.lastHour}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/know-your-rights")}
              className="text-white hover:bg-white/10 w-8 h-8 sm:w-auto sm:h-auto"
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Map */}
      <MapComponent />

      {/* Alerts Panel */}
      {showAlerts && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          className="absolute top-16 sm:top-20 left-2 right-32 sm:left-4 sm:right-56 z-10 max-h-60 sm:max-h-72 overflow-hidden bg-gray-900/95 backdrop-blur-lg rounded-lg sm:rounded-xl border border-gray-700"
        >
          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="font-semibold text-sm sm:text-base text-white">Community Alerts</h3>
              {alerts.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllAlerts}
                  className="text-xs text-gray-400 hover:text-white px-2 py-1"
                >
                  Clear All
                </Button>
              )}
            </div>
            
            {alerts.length === 0 ? (
              <div className="text-center py-4 sm:py-6 text-gray-400">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 opacity-50" />
                <p className="text-sm sm:text-base">No recent alerts</p>
                <p className="text-xs">Community is secure</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-40 sm:max-h-48 overflow-y-auto">
                {alerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Bottom Action Bar (SOS, Add Report, Navigate) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }} 
        className="absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* Navigate to Safe Zone Button (Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center space-y-1"
          >
            <Button
              onClick={() => {
                toast({
                  title: "Finding nearest safe zone",
                  description: "Calculating route to closest safe location...",
                });
                // Logic to call MapComponent's find nearest safe zone would go here
              }}
              className="bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-200 transform active:scale-95"
              size="icon"
            >
              <Navigation className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <span className="text-xs text-black font-medium">Safe Zone</span>
          </motion.div>

          {/* Panic Button (Center) */}
          <div className="scale-100">
            <PanicButton /> {/* PanicButton already has some bottom margin/text if not pressed */}
          </div>

          {/* Add Report Button (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center space-y-1"
          >
            <Button
              onClick={() => navigate("/report")}
              className="bg-red-600 hover:bg-red-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-200 transform active:scale-95"
              size="icon"
            >
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <span className="text-xs text-black font-medium">Add Report</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Emergency Actions */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-6 left-6 z-20 space-y-3"
      >
        <Button
          size="sm"
          variant="secondary"
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white border-2 border-white shadow-lg"
          onClick={() => navigate('/emergency')}
        >
          <Phone className="w-5 h-5" />
        </Button>
        
        <Button
          size="sm"
          variant="secondary"
          className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white border-2 border-white shadow-lg"
          onClick={() => {
            // Find nearest safe zone and zoom to it
            window.dispatchEvent(new CustomEvent('findNearestSafeZone'));
          }}
        >
          <Shield className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Test Notification Buttons (Development) */}
      {showTestButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-6 right-6 z-30 space-y-2"
        >
          <Button
            size="sm"
            variant="outline"
            className="bg-purple-600 hover:bg-purple-700 text-white border-white"
            onClick={sendTestNotification}
          >
            🧪 Test Notification
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-red-800 hover:bg-red-900 text-white border-white"
            onClick={simulateICEAlert}
          >
            🚨 Test ICE Alert
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default MapView;
