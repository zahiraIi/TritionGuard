
import { motion } from "framer-motion";

const KeyStatementCard = () => {
  return (
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
  );
};

export default KeyStatementCard;
