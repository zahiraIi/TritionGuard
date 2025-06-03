
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const InternationalStudentNote = () => {
  return (
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
  );
};

export default InternationalStudentNote;
