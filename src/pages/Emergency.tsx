import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowLeft, Shield, Info, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Emergency = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [alertSent, setAlertSent] = useState(false);

  const emergencyContacts = [
    { name: "Legal Aid Hotline", number: "1-800-839-8682", type: "legal" },
    { name: "Immigration Legal Services", number: "(619) 232-2121", type: "legal" },
    { name: "SPACES @ UCSD", number: "(858) 534-4777", type: "support" },
    { name: "UCSD Police (Non-Emergency)", number: "(858) 534-4357", type: "safety" },
    { name: "Crisis Text Line", number: "Text HOME to 741741", type: "crisis" },
    { name: "San Diego County Crisis Line", number: "(888) 724-7240", type: "crisis" }
  ];

  const handleCall = (number: string, name: string) => {
    // In a real app, this would initiate a phone call
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
    <div className="min-h-screen bg-red-900 text-white">
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
          <h1 className="text-2xl font-bold text-red-200">Emergency Protocol</h1>
        </motion.div>

        {/* Emergency Status */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-red-800 border border-red-700 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center space-x-4">
            <Shield className="w-8 h-8 text-red-300" />
            <div>
              <h2 className="text-xl font-bold">Emergency Mode Active</h2>
              <p className="text-red-200">You are in a safe, protected environment</p>
            </div>
          </div>
        </motion.div>

        {/* Community Alert */}
        {!alertSent ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Button
              onClick={sendCommunityAlert}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Alert Community Members</span>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-800 border border-green-700 rounded-xl p-4 mb-6 text-center"
          >
            <p className="text-green-200">✓ Community has been notified of your situation</p>
          </motion.div>
        )}

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-6"
        >
          <h3 className="text-lg font-semibold text-red-200 flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Emergency Contacts</span>
          </h3>
          
          {emergencyContacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Button
                onClick={() => handleCall(contact.number, contact.name)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-xl flex items-center justify-between"
              >
                <div className="text-left">
                  <div className="font-semibold">{contact.name}</div>
                  <div className="text-sm text-gray-300">{contact.number}</div>
                </div>
                <Phone className="w-5 h-5 text-green-400" />
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Know Your Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            onClick={() => navigate("/know-your-rights")}
            className="w-full bg-blue-800 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold flex items-center justify-center space-x-2"
          >
            <Info className="w-5 h-5" />
            <span>Know Your Rights</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Emergency;
