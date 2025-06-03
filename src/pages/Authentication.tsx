
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Authentication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAnonymousLogin = async () => {
    setIsLoading(true);
    
    // Simulate anonymous authentication process
    setTimeout(() => {
      localStorage.setItem('trition_user_authenticated', 'true');
      toast({
        title: "Anonymous login successful",
        description: "You are now logged in anonymously",
      });
      navigate("/access-code");
      setIsLoading(false);
    }, 1500);
  };

  const securityFeatures = [
    "End-to-end encrypted",
    "No tracking or logging", 
    "Secure anonymous ID",
    "Zero personal data stored"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4 mb-8"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Secure Access</h1>
        </motion.div>
      </div>

      <div className="px-6 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto">
            <Shield className="w-10 h-10 text-blue-600" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              Complete Privacy
              <br />
              Guaranteed
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-sm mx-auto">
              Your identity is completely protected. No personal information is collected or stored.
            </p>
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-2xl p-6 space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            Your Security Features
          </h3>
          <div className="space-y-3">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <Button
            onClick={handleAnonymousLogin}
            disabled={isLoading}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-200 h-auto"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Securing connection...</span>
              </div>
            ) : (
              "Continue Anonymously"
            )}
          </Button>
          
          <p className="text-center text-gray-500 text-sm leading-relaxed">
            By continuing, you agree to our anonymous access terms
          </p>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 rounded-2xl p-4 border border-blue-100"
        >
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-blue-900">Protected Environment</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              This platform is designed specifically for student safety and privacy protection
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom spacing */}
      <div className="h-12"></div>
    </div>
  );
};

export default Authentication;
