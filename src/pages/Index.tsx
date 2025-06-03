
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
                {/* Street Network filling entire space */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Main Streets spanning full width */}
                  <motion.path
                    d="M0 30 Q25 32 50 35 Q75 38 100 40"
                    stroke="#4a5568"
                    strokeWidth="1"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                  />
                  <motion.path
                    d="M0 50 Q30 52 60 55 Q80 57 100 60"
                    stroke="#4a5568"
                    strokeWidth="0.8"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                  <motion.path
                    d="M0 70 Q40 72 70 75 Q85 77 100 80"
                    stroke="#4a5568"
                    strokeWidth="0.8"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.2 }}
                  />
                  
                  {/* Cross Streets spanning full height */}
                  <motion.path
                    d="M35 0 L38 100"
                    stroke="#4a5568"
                    strokeWidth="0.8"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                  />
                  <motion.path
                    d="M65 0 L68 100"
                    stroke="#4a5568"
                    strokeWidth="0.8"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.6 }}
                  />

                  {/* Navigation Route */}
                  <motion.path
                    d="M50 0 Q52 25 55 50 Q58 75 60 100"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, delay: 2 }}
                  />
                </svg>

                {/* Buildings/Areas positioned across the space */}
                <motion.div
                  className="absolute top-4 left-4 w-8 h-6 bg-gray-700 rounded opacity-60"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.8 }}
                />
                <motion.div
                  className="absolute top-12 right-8 w-10 h-8 bg-gray-700 rounded opacity-60"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 }}
                />
                <motion.div
                  className="absolute bottom-8 left-12 w-9 h-7 bg-gray-700 rounded opacity-60"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.2 }}
                />

                {/* Navigation Arrow */}
                <motion.div
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
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
                  className="absolute top-8 left-1/3 w-3 h-3 bg-green-400 rounded-full shadow-lg"
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
                  className="absolute bottom-12 right-1/4 w-3 h-3 bg-red-400 rounded-full shadow-lg"
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
