
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowLeft, Shield, Info, Users, AlertTriangle, Clock, Heart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Emergency = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [alertSent, setAlertSent] = useState(false);

  const emergencyContacts = [
    { name: "Legal Aid Hotline", number: "1-800-839-8682", type: "legal", color: "bg-blue-500" },
    { name: "Immigration Legal Services", number: "(619) 232-2121", type: "legal", color: "bg-blue-500" },
    { name: "SPACES @ UCSD", number: "(858) 534-4777", type: "support", color: "bg-green-500" },
    { name: "UCSD Police (Non-Emergency)", number: "(858) 534-4357", type: "safety", color: "bg-orange-500" },
    { name: "Crisis Text Line", number: "Text HOME to 741741", type: "crisis", color: "bg-purple-500" },
    { name: "San Diego County Crisis Line", number: "(888) 724-7240", type: "crisis", color: "bg-red-500" }
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white sticky top-0 z-50">
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
              <h1 className="text-xl font-bold">Emergency Support</h1>
              <p className="text-red-100 text-sm">You're in a safe space</p>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Status Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">Protected Environment</h2>
              <p className="text-gray-600 text-sm">You are in a secure, anonymous space</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </motion.div>

        {/* Community Alert */}
        {!alertSent ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={sendCommunityAlert}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-6 rounded-2xl font-semibold shadow-lg"
            >
              <div className="flex items-center justify-center space-x-3">
                <Users className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-bold">Alert Community Members</div>
                  <div className="text-sm text-orange-100">Send anonymous alert to nearby students</div>
                </div>
              </div>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-green-800">Community Notified</p>
                <p className="text-sm text-green-600">Fellow students have been alerted of your situation</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Emergency Contacts */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <Phone className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
          </div>
          
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
                  <div className={`w-10 h-10 ${contact.color} rounded-xl flex items-center justify-center`}>
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">{contact.name}</div>
                    <div className="text-sm text-gray-600">{contact.number}</div>
                  </div>
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-3 h-3 text-green-600" />
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
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-6 rounded-2xl font-semibold shadow-lg"
          >
            <div className="flex items-center justify-center space-x-3">
              <Info className="w-6 h-6" />
              <div className="text-left">
                <div className="font-bold">Know Your Rights</div>
                <div className="text-sm text-blue-100">Legal information and guidance</div>
              </div>
            </div>
          </Button>
        </motion.div>
      </div>

      {/* Bottom Safe Area */}
      <div className="h-8"></div>
    </div>
  );
};

export default Emergency;
