
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ImportantNoticeCard from "@/components/ImportantNoticeCard";
import KeyStatementCard from "@/components/KeyStatementCard";
import RightsAccordion from "@/components/RightsAccordion";
import ConstitutionalRights from "@/components/ConstitutionalRights";
import LegalResourcesContacts from "@/components/LegalResourcesContacts";
import InternationalStudentNote from "@/components/InternationalStudentNote";

const KnowYourRights = () => {
  const navigate = useNavigate();

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
        <ImportantNoticeCard />
        <KeyStatementCard />
        <RightsAccordion delay={0.2} />
        <ConstitutionalRights />
        <LegalResourcesContacts delay={0.7} />
        <InternationalStudentNote />

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
