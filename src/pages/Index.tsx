
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Users, MapPin, Lock, Heart, Phone } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Secure & Anonymous",
      description: "Your identity is protected with top-tier encryption for complete privacy.",
      bgColor: "bg-red-50",
      iconColor: "text-red-500"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect instantly with fellow students for real-time safety alerts and assistance.",
      bgColor: "bg-green-50",
      iconColor: "text-green-500"
    },
    {
      icon: MapPin,
      title: "Safe Navigation",
      description: "Easily find safe zones and avoid risky areas with our interactive safety map.",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with modern map illustration */}
      <div className="bg-white px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Modern clean map illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <div className="w-80 h-64 mx-auto bg-gray-900 rounded-3xl flex items-center justify-center relative overflow-hidden">
              {/* Subtle grid pattern */}
              <div className="absolute inset-0">
                <svg width="100%" height="100%" className="opacity-10">
                  <defs>
                    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Map elements - clean and minimal */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Simplified location areas */}
                <div className="absolute top-16 left-12 w-16 h-12 bg-blue-500/30 rounded-xl"></div>
                <div className="absolute top-20 right-16 w-20 h-8 bg-purple-500/20 rounded-lg"></div>
                <div className="absolute bottom-20 left-16 w-12 h-16 bg-green-500/25 rounded-xl"></div>
                <div className="absolute bottom-16 right-12 w-18 h-10 bg-red-500/20 rounded-lg"></div>
                
                {/* Clean location pins */}
                <div className="absolute top-20 left-16 w-3 h-3 bg-blue-400 rounded-full shadow-lg"></div>
                <div className="absolute top-24 right-20 w-2.5 h-2.5 bg-purple-400 rounded-full shadow-lg"></div>
                <div className="absolute bottom-24 left-20 w-2.5 h-2.5 bg-green-400 rounded-full shadow-lg"></div>
                <div className="absolute bottom-20 right-16 w-3 h-3 bg-red-400 rounded-full shadow-lg"></div>
              </div>
              
              {/* Central guard element - clean and prominent */}
              <div className="relative z-10 w-20 h-20 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-2xl mb-1">🛡️</div>
                  <div className="w-4 h-0.5 bg-gray-400 mx-auto"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main heading with TritonGuard */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-900 mb-4 leading-tight"
          >
            Welcome to
            <br />
            <span className="text-blue-600">TritonGuard</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 leading-relaxed max-w-sm mx-auto"
          >
            Your comprehensive safety network designed for student protection and community support
          </motion.p>
        </motion.div>
      </div>

      {/* Features section */}
      <div className="px-6 py-8 space-y-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-start space-x-4"
          >
            <div className={`w-12 h-12 ${feature.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
              <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="px-6 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={() => navigate("/auth")}
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-200"
          >
            Get Started
          </Button>
          
          <p className="text-center text-gray-500 text-sm mt-4 leading-relaxed">
            Join a trusted community of students committed to safety and mutual support
          </p>
        </motion.div>
      </div>

      {/* Bottom safe area */}
      <div className="h-8"></div>
    </div>
  );
};

export default Index;
