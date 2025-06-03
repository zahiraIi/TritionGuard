
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, AlertTriangle, Users, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const KnowYourRights = () => {
  const navigate = useNavigate();

  const rightsInfo = [
    {
      title: "Right to Remain Silent",
      icon: Shield,
      color: "bg-blue-500",
      content: "You have the constitutional right to remain silent. You are not required to answer questions about your immigration status, where you were born, or how you entered the United States."
    },
    {
      title: "Do Not Open Your Door",
      icon: Shield,
      color: "bg-green-500",
      content: "You do not have to open your door to ICE agents unless they have a valid warrant signed by a judge. Ask to see the warrant through the door or window."
    },
    {
      title: "Right to an Attorney",
      icon: Users,
      color: "bg-purple-500",
      content: "You have the right to speak to a lawyer. If you cannot afford one, ask for a list of free or low-cost legal services. Do not sign any documents without speaking to a lawyer first."
    },
    {
      title: "Stay Calm, Do Not Run",
      icon: AlertTriangle,
      color: "bg-orange-500",
      content: "Stay calm and do not run, argue, resist, or obstruct the officers. Keep your hands where officers can see them. Remember that anything you say can be used against you later."
    }
  ];

  const quickTips = [
    "Ask 'Am I free to leave?'",
    "Exercise your right to remain silent",
    "Don't sign anything without a lawyer",
    "Contact emergency contacts immediately"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm sticky top-0 z-50"
      >
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900">Know Your Rights</h1>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-6 py-6 space-y-6 max-w-md mx-auto">
        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4"
        >
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Important</h3>
              <p className="text-sm text-gray-700">
                This information is for educational purposes. Always consult with a qualified immigration attorney for legal advice.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rights Information */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 px-1">Your Constitutional Rights</h3>
          
          {rightsInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-gray-50">
                    <div className="flex items-center space-x-3 w-full">
                      <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center`}>
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="pl-11">
                      <p className="text-sm text-gray-700 leading-relaxed">{item.content}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </div>

        {/* Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-4"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">If Approached</h3>
          </div>
          
          <div className="space-y-2">
            {quickTips.map((tip, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back to Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={() => navigate("/map")}
            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-2xl"
          >
            Back to Safety Map
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowYourRights;
