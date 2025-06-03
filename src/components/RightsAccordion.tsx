
import { motion } from "framer-motion";
import { Home, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface RightsAccordionProps {
  delay?: number;
}

const RightsAccordion = ({ delay = 0.2 }: RightsAccordionProps) => {
  const homeRights = [
    "You do not have to open your door unless an officer has certain kinds of warrants",
    "Ask the officer to slip the warrant under the door or window",
    "A search warrant allows police to enter the address listed on the warrant only",
    "An arrest warrant allows police to enter if they believe the person is inside"
  ];

  const questioningRights = [
    "You have the right to remain silent and do not have to discuss your immigration or citizenship status",
    "You do not have to answer questions about where you were born, whether you are a U.S. citizen, or how or when you entered the country",
    "Stay calm and be polite. Do not lie about your citizenship status or provide fake documents",
    "You do not have to sign anything. If you sign, you may be giving up your opportunity to stay in the U.S."
  ];

  return (
    <>
      {/* Rights at Home */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="home-rights" className="border-none">
            <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-gray-50">
              <div className="flex items-center space-x-3 w-full">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Home className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-gray-900">Your Rights at Home</h4>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="pl-11 space-y-2">
                {homeRights.map((right, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{right}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* Rights When Questioned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.05 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="questioning-rights" className="border-none">
            <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-gray-50">
              <div className="flex items-center space-x-3 w-full">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-gray-900">Your Rights When Questioned</h4>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="pl-11 space-y-2">
                {questioningRights.map((right, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{right}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </>
  );
};

export default RightsAccordion;
