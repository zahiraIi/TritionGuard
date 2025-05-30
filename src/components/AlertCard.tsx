
import { motion } from "framer-motion";
import { AlertTriangle, Clock } from "lucide-react";

interface Alert {
  id: number;
  type: string;
  location: string;
  time: string;
  severity: string;
  description: string;
}

interface AlertCardProps {
  alert: Alert;
}

const AlertCard = ({ alert }: AlertCardProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 border-red-500';
      case 'high': return 'bg-orange-600 border-orange-500';
      case 'medium': return 'bg-yellow-600 border-yellow-500';
      default: return 'bg-gray-600 border-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    return <AlertTriangle className="w-4 h-4" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-3 rounded-lg border backdrop-blur-lg ${getSeverityColor(alert.severity)} text-white shadow-lg`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getTypeIcon(alert.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide">
              {alert.type === 'ice' ? 'ICE Activity' : 'Police Activity'}
            </p>
            <div className="flex items-center space-x-1 text-xs opacity-80">
              <Clock className="w-3 h-3" />
              <span>{alert.time}</span>
            </div>
          </div>
          <p className="text-sm font-medium mt-1">{alert.location}</p>
          <p className="text-xs opacity-90 mt-1">{alert.description}</p>
        </div>
      </div>
      
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 border-2 border-white/30 rounded-lg pointer-events-none"
      />
    </motion.div>
  );
};

export default AlertCard;
