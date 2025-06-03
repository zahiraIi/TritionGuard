
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
      {/* Header with illustration placeholder */}
      <div className="bg-white px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Illustration placeholder */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-72 h-48 mx-auto bg-gradient-to-br from-blue-100 via-purple-50 to-blue-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
              
              {/* Main shield icon */}
              <div className="relative z-10 w-20 h-20 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-6 left-8 w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="absolute bottom-8 right-8 w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <div className="absolute top-8 right-12 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-900 mb-4 leading-tight"
          >
            All Your Safety
            <br />
            in One Place
          </motion.h1>
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
