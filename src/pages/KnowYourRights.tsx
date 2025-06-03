
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Info, AlertTriangle, BookOpen, Users, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const KnowYourRights = () => {
  const navigate = useNavigate();

  const rightsInfo = [
    {
      title: "Right to Remain Silent",
      icon: Shield,
      color: "bg-blue-500",
      content: "You have the constitutional right to remain silent. You are not required to answer questions about your immigration status, where you were born, or how you entered the United States. You may tell the officer that you are exercising your right to remain silent."
    },
    {
      title: "Do Not Open Your Door",
      icon: Shield,
      color: "bg-green-500",
      content: "You do not have to open your door to ICE agents unless they have a valid warrant signed by a judge. Ask to see the warrant through the door or window. A warrant must have your correct name and address to be valid."
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
    },
    {
      title: "Emergency Preparedness",
      icon: Phone,
      color: "bg-red-500",
      content: "Always carry emergency contact information with you. Memorize important phone numbers. Let family members know your plans and check in regularly."
    }
  ];

  const quickTips = [
    "Ask 'Am I free to leave?'",
    "Exercise your right to remain silent",
    "Don't sign anything without a lawyer",
    "Contact emergency contacts immediately"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Know Your Rights</h1>
              <p className="text-blue-100 text-sm">Legal protection guide</p>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">Important Legal Information</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                This information is for educational purposes. Always consult with a qualified immigration attorney for legal advice specific to your situation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rights Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Constitutional Rights</h3>
          
          {rightsInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                    <div className="flex items-center space-x-4 w-full">
                      <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="pl-14">
                      <p className="text-gray-700 leading-relaxed">{item.content}</p>
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
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-900">If Approached by Authorities</h3>
          </div>
          
          <div className="space-y-3">
            {quickTips.map((tip, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 text-sm font-medium">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back to Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={() => navigate("/map")}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-2xl shadow-lg"
          >
            Back to Safety Map
          </Button>
        </motion.div>
      </div>

      {/* Bottom Safe Area */}
      <div className="h-8"></div>
    </div>
  );
};

export default KnowYourRights;
