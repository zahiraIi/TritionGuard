
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Users, Shield, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AccessCode = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Demo access codes
  const validCodes = ["UCSD2024", "TRITON", "GUARDIAN", "SAFETY"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (validCodes.includes(code.toUpperCase())) {
        localStorage.setItem('trition_access_granted', 'true');
        localStorage.setItem('trition_access_code', code.toUpperCase());
        toast({
          title: "Access granted",
          description: "Welcome to the community safety network",
        });
        navigate("/map");
      } else {
        toast({
          title: "Invalid access code",
          description: "Please check your code and try again",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const communityFeatures = [
    { icon: Users, text: "Trusted community network" },
    { icon: Shield, text: "Verified student members" },
    { icon: Lock, text: "Secure communication channels" }
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
            onClick={() => navigate("/auth")}
            className="text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Join Community</h1>
        </motion.div>
      </div>

      <div className="px-6 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mx-auto">
            <Key className="w-10 h-10 text-purple-600" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              Access Your
              <br />
              Safety Network
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-sm mx-auto">
              Enter your community access code to join the trusted safety network
            </p>
          </div>
        </motion.div>

        {/* Community Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center space-x-4 bg-gray-50 rounded-2xl p-4"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <feature.icon className="w-6 h-6 text-gray-700" />
              </div>
              <span className="text-gray-900 font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Access Code Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-900">
              Access Code
            </label>
            <Input
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 text-center font-mono text-lg tracking-wider py-4 rounded-xl focus:bg-white focus:border-purple-300 focus:ring-purple-100 transition-all"
              required
            />
            <p className="text-sm text-gray-500 text-center">
              Contact your community organizer for access
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !code}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-auto"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Verifying access...</span>
              </div>
            ) : (
              "Join Community Network"
            )}
          </Button>
        </motion.form>

        {/* Demo Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 rounded-2xl p-4 border border-blue-100"
        >
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-blue-900">Demo Access Codes</h4>
            <p className="text-sm text-blue-700">
              For demonstration: UCSD2024, TRITON, GUARDIAN, SAFETY
            </p>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-green-50 rounded-2xl p-4 border border-green-100"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Secure Access</h4>
              <p className="text-sm text-green-700">
                All community access is encrypted and anonymous
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom spacing */}
      <div className="h-12"></div>
    </div>
  );
};

export default AccessCode;
