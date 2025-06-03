
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ImportantNoticeCard = () => {
  return (
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
  );
};

export default ImportantNoticeCard;
