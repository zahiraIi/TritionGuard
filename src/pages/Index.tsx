
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Users, MapPin, Plus, Minus, Navigation, Map, Phone, Settings } from "lucide-react";

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
      {/* Header with animated interactive map */}
      <div className="bg-white px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Interactive Dark Map Component */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <div className="w-80 h-64 mx-auto bg-gray-900 rounded-3xl relative overflow-hidden shadow-2xl">
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur flex items-center justify-between px-4 text-white text-xs">
                <div className="flex items-center space-x-2">
                  <span>APRIL 5</span>
                  <span>☀️ 20°C</span>
                </div>
                <span>7:30PM</span>
                <div className="flex items-center space-x-1">
                  <span>📶 5G</span>
                  <span>🔋 100%</span>
                </div>
              </div>

              {/* Search Bar */}
              <motion.div 
                className="absolute top-12 left-4 right-4 z-20"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-gray-800/90 backdrop-blur rounded-full px-4 py-2 flex items-center space-x-2">
                  <span className="text-white text-sm">📍 UCSD Campus</span>
                  <button className="ml-auto text-gray-400 hover:text-white">✕</button>
                </div>
              </motion.div>

              {/* Map Content */}
              <div className="absolute inset-0 pt-20">
                {/* Street Network */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 256">
                  {/* Main Streets */}
                  <motion.path
                    d="M50 80 Q120 85 180 90 Q220 95 280 100"
                    stroke="#4a5568"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                  />
                  <motion.path
                    d="M40 120 Q100 125 160 130 Q200 135 270 140"
                    stroke="#4a5568"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                  <motion.path
                    d="M60 160 Q130 165 200 170 Q240 175 290 180"
                    stroke="#4a5568"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.2 }}
                  />
                  
                  {/* Cross Streets */}
                  <motion.path
                    d="M120 60 L125 200"
                    stroke="#4a5568"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                  />
                  <motion.path
                    d="M180 70 L185 190"
                    stroke="#4a5568"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.6 }}
                  />

                  {/* Navigation Route */}
                  <motion.path
                    d="M160 50 Q165 80 170 110 Q175 140 180 170 Q185 190 190 210"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, delay: 2 }}
                  />
                </svg>

                {/* Street Labels */}
                <motion.div
                  className="absolute top-16 left-20 text-white text-xs font-medium transform -rotate-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  Voigt Drive
                </motion.div>
                <motion.div
                  className="absolute top-28 right-16 text-white text-xs font-medium transform rotate-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.7 }}
                >
                  Library Walk
                </motion.div>
                <motion.div
                  className="absolute bottom-20 left-12 text-white text-xs font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.9 }}
                >
                  Scholars Drive
                </motion.div>

                {/* Buildings/Areas */}
                <motion.div
                  className="absolute top-20 left-8 w-12 h-8 bg-gray-700 rounded opacity-60"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.8 }}
                />
                <motion.div
                  className="absolute top-32 right-12 w-16 h-10 bg-gray-700 rounded opacity-60"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 }}
                />
                <motion.div
                  className="absolute bottom-16 left-16 w-14 h-12 bg-gray-700 rounded opacity-60"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.2 }}
                />

                {/* Navigation Arrow */}
                <motion.div
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 3, duration: 0.5 }}
                >
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-b-3 border-b-white transform rotate-180"></div>
                  </div>
                </motion.div>

                {/* Safety Zones */}
                <motion.div
                  className="absolute top-24 left-1/3 w-3 h-3 bg-green-400 rounded-full shadow-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.7)",
                      "0 0 0 8px rgba(34, 197, 94, 0)",
                      "0 0 0 0 rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 3.5 }}
                />
                <motion.div
                  className="absolute bottom-20 right-1/4 w-3 h-3 bg-red-400 rounded-full shadow-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(248, 113, 113, 0.7)",
                      "0 0 0 8px rgba(248, 113, 113, 0)",
                      "0 0 0 0 rgba(248, 113, 113, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 4 }}
                />
              </div>

              {/* Map Controls */}
              <motion.div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="bg-gray-800/90 backdrop-blur rounded-lg flex flex-col shadow-lg">
                  <button className="p-2 text-white hover:bg-gray-700 rounded-t-lg">
                    <Plus className="w-4 h-4" />
                  </button>
                  <div className="w-full h-px bg-gray-600"></div>
                  <button className="p-2 text-white hover:bg-gray-700 rounded-b-lg">
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Bottom Navigation Bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur flex items-center justify-around"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-5 h-5 grid grid-cols-2 gap-px">
                    <div className="bg-gray-400 rounded-sm"></div>
                    <div className="bg-gray-400 rounded-sm"></div>
                    <div className="bg-gray-400 rounded-sm"></div>
                    <div className="bg-gray-400 rounded-sm"></div>
                  </div>
                  <span className="text-gray-400 text-xs">DASHBOARD</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Navigation className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 text-xs">QUICK</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 text-xs">NAVIGATION</span>
                  <div className="w-8 h-1 bg-blue-400 rounded-full"></div>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 text-xs">PHONE</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 text-xs">SETTINGS</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bold, clean title matching reference style */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight"
          >
            All Your Safety in
            <br />
            <span className="text-5xl font-black text-gray-900">TritonGuard</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-medium text-gray-600 leading-relaxed max-w-md mx-auto"
          >
            Your comprehensive safety network designed for student protection and community support
          </motion.p>
        </motion.div>
      </div>

      {/* Features section with updated typography */}
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 font-medium leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section with updated typography */}
      <div className="px-6 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={() => navigate("/auth")}
            className="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-2xl text-lg transition-all duration-200"
          >
            Get Started
          </Button>
          
          <p className="text-center text-gray-500 font-medium text-sm mt-4 leading-relaxed">
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
