
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, AlertTriangle, Shield, Camera, Bell, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MapComponent from "@/components/MapComponent";
import PanicButton from "@/components/PanicButton";
import AlertCard from "@/components/AlertCard";

const MapView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "police",
      location: "Library Walk",
      time: "2 min ago",
      severity: "high",
      description: "Multiple police vehicles reported"
    },
    {
      id: 2,
      type: "ice",
      location: "Student Center",
      time: "15 min ago",
      severity: "critical",
      description: "ICE activity reported - avoid area"
    }
  ]);

  const [showAlerts, setShowAlerts] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and has access
    const isAuthenticated = localStorage.getItem('trition_user_authenticated');
    const hasAccess = localStorage.getItem('trition_access_granted');
    
    if (!isAuthenticated || !hasAccess) {
      navigate('/auth');
    }
  }, [navigate]);

  const handleQuickReport = (type: string) => {
    navigate(`/report?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-gray-900/90 to-transparent p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-lg">TritionGuard</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAlerts(!showAlerts)}
              className="text-white hover:bg-white/10"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/know-your-rights")}
              className="text-white hover:bg-white/10"
            >
              <Info className="w-5 h-5" />
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
          className="absolute top-20 left-4 right-4 z-10 max-h-64 overflow-y-auto"
        >
          <div className="space-y-2">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-24 left-4 right-4 z-10"
      >
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => handleQuickReport("police")}
            className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl shadow-lg flex items-center space-x-2"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Report Police</span>
          </Button>
          <Button
            onClick={() => handleQuickReport("ice")}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl shadow-lg flex items-center space-x-2"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Report ICE</span>
          </Button>
        </div>
      </motion.div>

      {/* Panic Button */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <PanicButton />
      </div>

      {/* Camera Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 right-4 z-10"
      >
        <Button
          onClick={() => navigate("/report?mode=camera")}
          className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-full shadow-lg"
          size="icon"
        >
          <Camera className="w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default MapView;
