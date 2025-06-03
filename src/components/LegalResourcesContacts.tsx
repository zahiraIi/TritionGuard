
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface LegalResourcesContactsProps {
  delay?: number;
}

const LegalResourcesContacts = ({ delay = 0.7 }: LegalResourcesContactsProps) => {
  const emergencyContacts = [
    {
      name: "UC Immigrant Legal Services Center",
      contact: "ucimm@law.ucdavis.edu",
      phone: "(530) 752-7996",
      color: "bg-blue-500"
    },
    {
      name: "United We Dream National Hotline",
      contact: "Report incidents and abuses",
      phone: "(844) 363-1423",
      color: "bg-purple-500"
    },
    {
      name: "Legal Aid Society of San Diego",
      contact: "Free legal services",
      phone: "(877) 534-2524",
      color: "bg-green-500"
    },
    {
      name: "ACLU Immigrants' Rights Hotline",
      contact: "Know your rights information",
      phone: "(877) 752-8824",
      color: "bg-red-500"
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900 text-center">UCSD Legal Resources</h3>
      
      <div className="flex flex-col items-center space-y-3">
        {emergencyContacts.map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + index * 0.1 }}
            className="w-full max-w-md"
          >
            <Button
              onClick={() => {
                if (contact.phone) {
                  window.open(`tel:${contact.phone}`, '_self');
                }
              }}
              className="w-full bg-white hover:bg-gray-50 text-left p-4 rounded-2xl border border-gray-100 shadow-sm h-auto"
              variant="ghost"
            >
              <div className="flex items-center space-x-4 w-full">
                <div className={`w-10 h-10 ${contact.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-left">{contact.name}</div>
                  <div className="text-sm text-gray-600 text-left">{contact.contact}</div>
                  {contact.phone && (
                    <div className="text-sm text-gray-500 text-left">{contact.phone}</div>
                  )}
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LegalResourcesContacts;
