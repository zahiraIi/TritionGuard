
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, AlertTriangle, Users, Phone, Home, FileText, Scale } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const KnowYourRights = () => {
  const navigate = useNavigate();

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
              <p className="text-sm text-gray-600">Immigration Enforcement</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-6 py-6 space-y-6 max-w-2xl mx-auto">
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
                I am exercising my 5th Amendment right under the U.S. Constitution to remain silent. I do not wish to speak with you, answer your questions, or sign or give you any documents without a lawyer present.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Statement Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-4"
        >
          <div className="text-center">
            <h3 className="font-bold text-red-900 mb-2">TO IMMIGRATION OR OTHER OFFICER:</h3>
            <p className="text-sm text-red-800 italic leading-relaxed">
              "I do not give you permission to enter my home or search my person or belongings based on my 4th Amendment rights under the U.S. Constitution, unless you have a warrant to enter, signed by a judge or magistrate with my name and correct address on it that you slide under the door."
            </p>
          </div>
        </motion.div>

        {/* Rights at Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
          transition={{ delay: 0.25 }}
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

        {/* Constitutional Rights */}
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

        {/* UCSD Legal Resources */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 text-center">UCSD Legal Resources</h3>
          
          <div className="flex flex-col items-center space-y-3">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
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
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 ${contact.color} rounded-full flex items-center justify-center`}>
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 text-center">
                      <div className="font-medium text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-600">{contact.contact}</div>
                      {contact.phone && (
                        <div className="text-sm text-gray-500">{contact.phone}</div>
                      )}
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Important Note for International Students */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-4"
        >
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">For International Students</h3>
              <p className="text-sm text-gray-700 mb-2">
                You are required by law to register and have documents at all times. If an immigration agent requests your immigration papers you should present them if you have them with you.
              </p>
              <p className="text-sm text-gray-700">
                <strong>If you are stopped by an immigration enforcement officer:</strong> If you choose to remain silent, tear off this portion of the card and hand it to the officer.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back to Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
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
