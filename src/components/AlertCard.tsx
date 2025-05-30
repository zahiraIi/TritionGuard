import { motion } from "framer-motion";
import { AlertTriangle, Clock, MapPin } from "lucide-react";
import { AlertNotification } from "@/services/NotificationService";

interface AlertCardProps {
  alert: AlertNotification;
}

const AlertCard = ({ alert }: AlertCardProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 border-red-500';
      case 'high': return 'bg-orange-600 border-orange-500';
      case 'medium': return 'bg-yellow-600 border-yellow-500';
      case 'low': return 'bg-blue-600 border-blue-500';
      default: return 'bg-gray-600 border-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    return <AlertTriangle className="w-4 h-4" />;
  };

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getTypeDisplay = (type: string) => {
    switch (type) {
      case 'ice': return 'ICE Activity';
      case 'police': return 'Police Activity';
      case 'emergency': return 'Emergency Alert';
      case 'safe_zone': return 'Safe Zone Update';
      default: return 'Community Alert';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`relative p-3 rounded-lg border backdrop-blur-lg ${getSeverityColor(alert.severity)} text-white shadow-lg`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getTypeIcon(alert.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide">
              {getTypeDisplay(alert.type)}
            </p>
            <div className="flex items-center space-x-1 text-xs opacity-80">
              <Clock className="w-3 h-3" />
              <span>{getTimeAgo(alert.timestamp)}</span>
            </div>
          </div>
          
          {alert.location && (
            <div className="flex items-center space-x-1 text-xs opacity-90 mt-1">
              <MapPin className="w-3 h-3" />
              <span>{alert.location.address}</span>
            </div>
          )}
          
          <p className="text-xs opacity-90 mt-1 line-clamp-2">{alert.body}</p>
          
          {alert.severity === 'critical' && (
            <div className="mt-2 text-xs font-bold bg-red-700/50 px-2 py-1 rounded">
              ⚠️ CRITICAL - AVOID AREA
            </div>
          )}
        </div>
      </div>
      
      {alert.severity === 'critical' && (
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 border-2 border-red-300 rounded-lg pointer-events-none"
        />
      )}
    </motion.div>
  );
};

export default AlertCard;

