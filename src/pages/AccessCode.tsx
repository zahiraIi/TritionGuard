
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
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
            onClick={() => navigate("/auth")}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">Community Access</h1>
        </motion.div>

        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/10 backdrop-blur-lg rounded-full p-6"
          >
            <Lock className="w-12 h-12 text-blue-200" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-4"
          >
            <h2 className="text-2xl font-bold">Enter Access Code</h2>
            <p className="text-blue-200 leading-relaxed">
              This code ensures you're part of the trusted community network
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="w-full space-y-6"
          >
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your access code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-blue-200 text-center font-mono text-lg tracking-wider"
                required
              />
              <p className="text-xs text-blue-300 text-center">
                Contact your community organizer for access
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !code}
              className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full"
                />
              ) : (
                "Join Community"
              )}
            </Button>

            <div className="text-center">
              <p className="text-xs text-blue-300">
                Demo codes: UCSD2024, TRITON, GUARDIAN, SAFETY
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default AccessCode;
