
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
    <div className="min-h-screen bg-gray-50">
      {/* Header with modern map illustration */}
      <div className="bg-white px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Modern map illustration with guard emoji */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-72 h-48 mx-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl flex items-center justify-center relative overflow-hidden border border-blue-100">
              {/* Map grid background */}
              <div className="absolute inset-0">
                <svg width="100%" height="100%" className="opacity-20">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Map elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Roads/paths */}
                <svg width="280" height="180" className="absolute">
                  <path d="M50 90 Q140 60 230 90" stroke="#6366f1" strokeWidth="3" fill="none" className="opacity-40"/>
                  <path d="M80 120 Q180 100 250 130" stroke="#8b5cf6" strokeWidth="2" fill="none" className="opacity-30"/>
                  <path d="M30 140 Q120 160 200 140" stroke="#06b6d4" strokeWidth="2" fill="none" className="opacity-30"/>
                </svg>
                
                {/* Location pins */}
                <div className="absolute top-12 left-16 w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                <div className="absolute top-20 right-20 w-2 h-2 bg-green-500 rounded-full shadow-lg"></div>
                <div className="absolute bottom-16 left-20 w-2 h-2 bg-blue-500 rounded-full shadow-lg"></div>
                <div className="absolute bottom-12 right-16 w-3 h-3 bg-purple-500 rounded-full shadow-lg"></div>
              </div>
              
              {/* Central guard emoji with shield background */}
              <div className="relative z-10 w-24 h-24 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/50">
                <div className="text-center">
                  <div className="text-3xl mb-1">🛡️</div>
                  <Shield className="w-4 h-4 text-blue-600 mx-auto" />
                </div>
              </div>
              
              {/* Floating safety indicators */}
              <div className="absolute top-8 left-12 w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div className="absolute bottom-10 right-12 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div className="absolute top-12 right-8 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Lock className="w-3 h-3 text-purple-600" />
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

      {/* Emergency quick access */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="px-6 pb-8"
      >
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-red-900">Need Help Now?</h4>
                <p className="text-sm text-red-700">Emergency support available 24/7</p>
              </div>
            </div>
            <Button
              onClick={() => navigate("/emergency")}
              variant="outline"
              className="border-red-200 text-red-700 hover:bg-red-100 px-4 py-2 text-sm"
            >
              Emergency
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Bottom safe area */}
      <div className="h-8"></div>
    </div>
  );
};

export default Index;
