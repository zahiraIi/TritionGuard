import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Users, MapPin } from "lucide-react";

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
      {/* Header with animated map */}
      <div className="bg-white px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Animated Mapbox-style map */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <div className="w-80 h-64 mx-auto bg-gray-900 rounded-3xl flex items-center justify-center relative overflow-hidden">
              {/* Animated grid background */}
              <motion.div 
                className="absolute inset-0"
                animate={{ 
                  backgroundPosition: ["0px 0px", "24px 24px"] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px'
                }}
              />
              
              {/* Animated location pins and areas */}
              <div className="absolute inset-0">
                {/* Pulsing location areas */}
                <motion.div 
                  className="absolute top-16 left-12 w-16 h-12 bg-blue-500/30 rounded-xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: 0
                  }}
                />
                <motion.div 
                  className="absolute top-20 right-16 w-20 h-8 bg-purple-500/20 rounded-lg"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    delay: 1
                  }}
                />
                <motion.div 
                  className="absolute bottom-20 left-16 w-12 h-16 bg-green-500/25 rounded-xl"
                  animate={{ 
                    scale: [1, 1.08, 1],
                    opacity: [0.25, 0.45, 0.25]
                  }}
                  transition={{ 
                    duration: 3.5,
                    repeat: Infinity,
                    delay: 2
                  }}
                />
                <motion.div 
                  className="absolute bottom-16 right-12 w-18 h-10 bg-red-500/20 rounded-lg"
                  animate={{ 
                    scale: [1, 1.06, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ 
                    duration: 4.5,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                />
                
                {/* Animated location pins */}
                <motion.div 
                  className="absolute top-20 left-16 w-3 h-3 bg-blue-400 rounded-full shadow-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.7)",
                      "0 0 0 8px rgba(59, 130, 246, 0)",
                      "0 0 0 0 rgba(59, 130, 246, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 0
                  }}
                />
                <motion.div 
                  className="absolute top-24 right-20 w-2.5 h-2.5 bg-purple-400 rounded-full shadow-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(168, 85, 247, 0.7)",
                      "0 0 0 6px rgba(168, 85, 247, 0)",
                      "0 0 0 0 rgba(168, 85, 247, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 1
                  }}
                />
                <motion.div 
                  className="absolute bottom-24 left-20 w-2.5 h-2.5 bg-green-400 rounded-full shadow-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.7)",
                      "0 0 0 6px rgba(34, 197, 94, 0)",
                      "0 0 0 0 rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2.2,
                    repeat: Infinity,
                    delay: 2
                  }}
                />
                <motion.div 
                  className="absolute bottom-20 right-16 w-3 h-3 bg-red-400 rounded-full shadow-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(248, 113, 113, 0.7)",
                      "0 0 0 8px rgba(248, 113, 113, 0)",
                      "0 0 0 0 rgba(248, 113, 113, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 1.8,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                />
              </div>
              
              {/* Central guard element with subtle animation */}
              <motion.div 
                className="relative z-10 w-20 h-20 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl"
                animate={{ 
                  y: [0, -2, 0],
                  boxShadow: [
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">🛡️</div>
                  <div className="w-4 h-0.5 bg-gray-400 mx-auto"></div>
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
