import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Users, MapPin, Plus, Minus } from "lucide-react";

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
          {/* Interactive Dark Map Component with Border */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <div className="w-full h-64 bg-gray-900 relative overflow-hidden rounded-3xl border-4 border-gray-300">
              {/* Map Content */}
              <div className="absolute inset-0">
                {/* Map background with subtle texture */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                
                {/* Street Network and Geographic Features */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
                  {/* Background areas and blocks */}
                  <defs>
                    <pattern id="cityTexture" patternUnits="userSpaceOnUse" width="20" height="20">
                      <rect width="20" height="20" fill="#1f2937"/>
                      <rect x="0" y="0" width="1" height="20" fill="#374151" opacity="0.3"/>
                      <rect x="0" y="0" width="20" height="1" fill="#374151" opacity="0.3"/>
                    </pattern>
                  </defs>
                  
                  {/* City blocks */}
                  <rect x="20" y="30" width="60" height="40" fill="#1f2937" rx="2"/>
                  <rect x="100" y="25" width="80" height="50" fill="#1f2937" rx="2"/>
                  <rect x="200" y="40" width="70" height="35" fill="#1f2937" rx="2"/>
                  <rect x="300" y="20" width="60" height="45" fill="#1f2937" rx="2"/>
                  
                  <rect x="30" y="100" width="50" height="30" fill="#1f2937" rx="2"/>
                  <rect x="120" y="110" width="90" height="45" fill="#1f2937" rx="2"/>
                  <rect x="250" y="105" width="65" height="35" fill="#1f2937" rx="2"/>
                  <rect x="340" y="95" width="45" height="40" fill="#1f2937" rx="2"/>
                  
                  <rect x="15" y="170" width="70" height="50" fill="#1f2937" rx="2"/>
                  <rect x="110" y="180" width="85" height="40" fill="#1f2937" rx="2"/>
                  <rect x="220" y="175" width="75" height="45" fill="#1f2937" rx="2"/>
                  <rect x="320" y="185" width="55" height="35" fill="#1f2937" rx="2"/>

                  {/* Major Roads - Horizontal */}
                  <motion.path
                    d="M0 85 Q100 87 200 85 Q300 83 400 85"
                    stroke="#4a5568"
                    strokeWidth="4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                  />
                  <motion.path
                    d="M0 160 Q120 162 240 160 Q320 158 400 160"
                    stroke="#4a5568"
                    strokeWidth="4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />

                  {/* Major Roads - Vertical */}
                  <motion.path
                    d="M90 0 Q92 60 95 120 Q98 180 100 250"
                    stroke="#4a5568"
                    strokeWidth="4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.2 }}
                  />
                  <motion.path
                    d="M280 0 Q282 70 285 140 Q288 200 290 250"
                    stroke="#4a5568"
                    strokeWidth="4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.4 }}
                  />

                  {/* Secondary Roads */}
                  <motion.path
                    d="M0 120 L400 125"
                    stroke="#374151"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.6 }}
                  />
                  <motion.path
                    d="M150 0 L155 250"
                    stroke="#374151"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.8 }}
                  />
                  <motion.path
                    d="M220 0 L225 250"
                    stroke="#374151"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 2 }}
                  />

                  {/* Curved main route */}
                  <motion.path
                    d="M50 0 Q150 30 200 80 Q250 130 300 180 Q350 220 380 250"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, delay: 2.2 }}
                  />

                  {/* Buildings scattered throughout */}
                  <motion.rect
                    x="25" y="35" width="8" height="12" fill="#374151" rx="1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.5 }}
                  />
                  <motion.rect
                    x="45" y="32" width="12" height="15" fill="#374151" rx="1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.6 }}
                  />
                  <motion.rect
                    x="110" y="30" width="15" height="18" fill="#374151" rx="1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.7 }}
                  />
                  <motion.rect
                    x="140" y="28" width="10" height="14" fill="#374151" rx="1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.8 }}
                  />
                  <motion.rect
                    x="210" y="45" width="12" height="16" fill="#374151" rx="1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.9 }}
                  />
                  <motion.rect
                    x="240" y="42" width="8" height="12" fill="#374151" rx="1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 3 }}
                  />
                  <motion.rect
                    x="310" y="25" width="14" height="20" fill="#374151" rx="1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 3.1 }}
                  />

                  {/* Parks/Green spaces */}
                  <motion.circle
                    cx="60" cy="200" r="12" fill="#065f46" opacity="0.6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 3.2 }}
                  />
                  <motion.ellipse
                    cx="320" cy="140" rx="18" ry="12" fill="#065f46" opacity="0.6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 3.3 }}
                  />
                </svg>

                {/* Navigation Arrow */}
                <motion.div
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 3.5, duration: 0.5 }}
                >
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-b-3 border-b-white transform rotate-180"></div>
                  </div>
                </motion.div>

                {/* Safety Zones */}
                <motion.div
                  className="absolute top-16 left-1/4 w-3 h-3 bg-green-400 rounded-full shadow-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.7)",
                      "0 0 0 8px rgba(34, 197, 94, 0)",
                      "0 0 0 0 rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 4 }}
                />
                <motion.div
                  className="absolute bottom-16 right-1/3 w-3 h-3 bg-red-400 rounded-full shadow-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(248, 113, 113, 0.7)",
                      "0 0 0 8px rgba(248, 113, 113, 0)",
                      "0 0 0 0 rgba(248, 113, 113, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 4.2 }}
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
            </div>
          </motion.div>

          {/* Bold, clean title matching reference style */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight"
          >
            TritonGuard
          </motion.h1>
        </motion.div>
      </div>

      {/* Features section matching screenshot design */}
      <div className="px-6 py-8 space-y-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-gray-50 rounded-2xl p-4 flex items-start space-x-4"
          >
            <div className={`w-12 h-12 ${feature.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
              <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
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
