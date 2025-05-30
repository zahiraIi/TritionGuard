
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4 mb-8"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">Secure Login</h1>
        </motion.div>

        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/10 backdrop-blur-lg rounded-full p-6"
          >
            <Shield className="w-12 h-12 text-blue-200" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-4"
          >
            <h2 className="text-2xl font-bold">Anonymous Authentication</h2>
            <p className="text-blue-200 leading-relaxed">
              Your identity is completely protected. No personal information is collected or stored.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">End-to-end encrypted</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">No tracking or logging</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Secure anonymous ID</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAnonymousLogin}
              disabled={isLoading}
              className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full"
                />
              ) : (
                "Continue Anonymously"
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
