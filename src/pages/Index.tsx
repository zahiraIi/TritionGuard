
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Users, MapPin } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-full p-6">
              <Shield className="w-16 h-16 text-blue-200" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              TritionGuard
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed">
              Anonymous community safety reporting and protection for students
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-4 py-6"
          >
            <div className="text-center space-y-2">
              <Users className="w-8 h-8 mx-auto text-blue-300" />
              <p className="text-sm text-blue-200">Community</p>
            </div>
            <div className="text-center space-y-2">
              <MapPin className="w-8 h-8 mx-auto text-blue-300" />
              <p className="text-sm text-blue-200">Real-time</p>
            </div>
            <div className="text-center space-y-2">
              <Shield className="w-8 h-8 mx-auto text-blue-300" />
              <p className="text-sm text-blue-200">Anonymous</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <Button
              onClick={() => navigate("/auth")}
              className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>
            <p className="text-xs text-blue-300 opacity-80">
              100% anonymous • Secure • Community-driven
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
