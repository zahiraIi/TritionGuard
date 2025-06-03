
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Users, MapPin, Bell, Lock, Heart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Anonymous & Secure",
      description: "Complete privacy protection with no personal data collection",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Real-time alerts and support from fellow students",
      color: "from-green-500 to-green-600"
    },
    {
      icon: MapPin,
      title: "Real-time Safety",
      description: "Live incident reports and safe zone navigation",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-3xl font-bold mb-3">TritionGuard</h1>
            <p className="text-blue-100 text-lg mb-6 max-w-md mx-auto leading-relaxed">
              Your anonymous community safety network for students
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-6 mb-8 border border-gray-100 shadow-sm"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe Space for Everyone</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A secure, anonymous platform designed specifically for undocumented students and those at risk of deportation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-green-50 rounded-2xl p-5 mb-8 border border-green-100"
        >
          <div className="flex items-center justify-center space-x-6 text-center">
            <div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs text-green-700 font-medium">100% Anonymous</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs text-green-700 font-medium">Secure Encrypted</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs text-green-700 font-medium">Community Driven</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-4"
        >
          <Button
            onClick={() => navigate("/auth")}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            Get Started Safely
          </Button>
          
          <p className="text-center text-xs text-gray-500">
            Your safety and privacy are our top priorities
          </p>
        </motion.div>
      </div>

      {/* Bottom Safe Area */}
      <div className="h-8"></div>
    </div>
  );
};

export default Index;
