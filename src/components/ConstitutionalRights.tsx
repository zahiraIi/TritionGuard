
import { motion } from "framer-motion";
import { Shield, Home, FileText, Scale } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ConstitutionalRights = () => {
  const rightsInfo = [
    {
      title: "Right to Remain Silent",
      icon: Shield,
      color: "bg-blue-500",
      content: "You have the right to a lawyer, but the government does not have to provide one for you. If you do not have a lawyer, see resources listed in this guide or ask for a list of free or low-cost legal services. You can tell the ICE agent you wish to remain silent and discuss your immigration status only with your lawyer."
    },
    {
      title: "Do Not Open Your Door",
      icon: Home,
      color: "bg-green-500",
      content: "You do not have to open your door unless an officer has certain kinds of warrants. Ask the officer to slip the warrant under the door or hold it up to the window so you can inspect it. A search warrant allows police to enter the address listed on the warrant, but officers can only search the areas and for the items listed."
    },
    {
      title: "Right to an Attorney",
      icon: Scale,
      color: "bg-purple-500",
      content: "You have the right to contact your consulate. If your visa is out of status consult with an immigration attorney. You have the right to remain silent, even if an officer has a warrant authorizing their entry. You do not have to sign anything without taking to a lawyer."
    },
    {
      title: "Don't Sign Anything",
      icon: FileText,
      color: "bg-orange-500",
      content: "You do not have to sign anything without talking to a lawyer. If you sign, you may be giving up your opportunity to try to stay in the U.S. Stay calm and be polite. Do not lie about your citizenship status or provide fake documents."
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900 px-1">Your Constitutional Rights</h3>
      
      {rightsInfo.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
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
  );
};

export default ConstitutionalRights;
