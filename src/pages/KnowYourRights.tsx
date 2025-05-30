
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Info, AlertTriangle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const KnowYourRights = () => {
  const navigate = useNavigate();

  const rightsInfo = [
    {
      title: "Right to Remain Silent",
      content: "You have the constitutional right to remain silent. You are not required to answer questions about your immigration status, where you were born, or how you entered the United States. You may tell the officer that you are exercising your right to remain silent."
    },
    {
      title: "Do Not Open Your Door",
      content: "You do not have to open your door to ICE agents unless they have a valid warrant signed by a judge. Ask to see the warrant through the door or window. A warrant must have your correct name and address to be valid."
    },
    {
      title: "Right to an Attorney",
      content: "You have the right to speak to a lawyer. If you cannot afford one, ask for a list of free or low-cost legal services. Do not sign any documents without speaking to a lawyer first."
    },
    {
      title: "Do Not Run",
      content: "Stay calm and do not run, argue, resist, or obstruct the officers. Keep your hands where officers can see them. Remember that anything you say can be used against you later."
    },
    {
      title: "Emergency Contacts",
      content: "Always carry emergency contact information with you. Memorize important phone numbers. Let family members know your plans and check in regularly."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-6"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">Know Your Rights</h1>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-yellow-600 border border-yellow-500 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-200 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-100">Important</h3>
              <p className="text-yellow-200 text-sm">
                This information is for educational purposes. Always consult with a qualified immigration attorney for legal advice specific to your situation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rights Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {rightsInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="bg-white/10 backdrop-blur border border-white/20 rounded-lg px-4"
                >
                  <AccordionTrigger className="text-white hover:text-blue-200 text-left">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-blue-300" />
                      <span>{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-blue-100 leading-relaxed">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Emergency Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-red-800 border border-red-700 rounded-xl p-4"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Info className="w-6 h-6 text-red-300" />
            <h3 className="font-semibold text-red-200">In Case of Emergency</h3>
          </div>
          <p className="text-red-200 text-sm mb-4">
            If you are approached by ICE or police, remember these key points:
          </p>
          <ul className="text-red-200 text-sm space-y-1 list-disc list-inside">
            <li>Stay calm and don't run</li>
            <li>Ask "Am I free to leave?"</li>
            <li>Exercise your right to remain silent</li>
            <li>Don't sign anything without a lawyer</li>
            <li>Contact emergency contacts immediately</li>
          </ul>
        </motion.div>

        {/* Back to Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-6"
        >
          <Button
            onClick={() => navigate("/map")}
            className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 rounded-xl"
          >
            Back to Safety Map
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowYourRights;
