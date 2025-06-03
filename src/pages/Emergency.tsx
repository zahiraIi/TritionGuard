
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowLeft, Shield, Users, AlertTriangle, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Emergency = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [alertSent, setAlertSent] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  useEffect(() => {
    // Check if we came from SOS activation by checking if there's an emergency incident
    const checkEmergencyStatus = () => {
      // Listen for emergency incidents to determine if SOS was activated
      const handleEmergencyIncident = () => {
        setIsEmergencyActive(true);
      };

      window.addEventListener('addEmergencyIncident', handleEmergencyIncident);
      
      // Also check if we're in emergency state based on recent SOS activation
      // This is a simple check - in a real app you'd want more sophisticated state management
      const emergencyActivated = sessionStorage.getItem('emergencyActivated');
      if (emergencyActivated) {
        setIsEmergencyActive(true);
      }

      return () => {
        window.removeEventListener('addEmergencyIncident', handleEmergencyIncident);
      };
    };

    checkEmergencyStatus();
  }, []);

  const emergencyContacts = [
    { name: "Legal Aid Hotline", number: "1-800-839-8682", color: "bg-blue-500" },
    { name: "UCSD Police", number: "(858) 534-4357", color: "bg-gray-600" },
    { name: "Crisis Text Line", number: "Text HOME to 741741", color: "bg-purple-500" },
    { name: "San Diego Crisis Line", number: "(888) 724-7240", color: "bg-red-500" }
  ];

  const handleCall = (number: string, name: string) => {
    toast({
      title: `Calling ${name}`,
      description: `Connecting to ${number}`,
    });
  };

  const sendCommunityAlert = () => {
    setAlertSent(true);
    toast({
      title: "Community Alert Sent",
      description: "Your emergency has been shared with trusted community members",
    });
  };

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
              <h1 className="text-lg font-semibold text-gray-900">Emergency Support</h1>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-6 py-6 space-y-6 max-w-md mx-auto">
        {/* Status Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${isEmergencyActive ? 'bg-red-100' : 'bg-green-100'} rounded-2xl flex items-center justify-center`}>
              {isEmergencyActive ? (
                <AlertTriangle className="w-6 h-6 text-red-600" />
              ) : (
                <Shield className="w-6 h-6 text-green-600" />
              )}
            </div>
            <div className="flex-1">
              <h2 className={`font-semibold ${isEmergencyActive ? 'text-red-900' : 'text-gray-900'}`}>
                {isEmergencyActive ? 'In Danger' : 'You\'re Safe'}
              </h2>
              <p className={`text-sm ${isEmergencyActive ? 'text-red-600' : 'text-gray-600'}`}>
                {isEmergencyActive ? 'Emergency alert activated' : 'Protected environment'}
              </p>
            </div>
            <div className={`w-3 h-3 ${isEmergencyActive ? 'bg-red-500' : 'bg-green-500'} rounded-full`}></div>
          </div>
        </motion.div>

        {/* Community Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {!alertSent ? (
            <Button
              onClick={sendCommunityAlert}
              className="w-full bg-black hover:bg-gray-800 text-white p-6 rounded-2xl font-medium shadow-sm"
            >
              <div className="flex items-center justify-center space-x-3">
                <Users className="w-5 h-5" />
                <span>Alert Community Members</span>
              </div>
            </Button>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Community Notified</p>
                  <p className="text-sm text-green-600">Help is on the way</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 px-1">Emergency Contacts</h3>
          
          {emergencyContacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Button
                onClick={() => handleCall(contact.number, contact.name)}
                className="w-full bg-white hover:bg-gray-50 text-left p-4 rounded-2xl border border-gray-100 shadow-sm h-auto"
                variant="ghost"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 ${contact.color} rounded-full flex items-center justify-center`}>
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{contact.name}</div>
                    <div className="text-sm text-gray-500">{contact.number}</div>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Know Your Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            onClick={() => navigate("/know-your-rights")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 p-4 rounded-2xl font-medium"
            variant="ghost"
          >
            Know Your Rights
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Emergency;
