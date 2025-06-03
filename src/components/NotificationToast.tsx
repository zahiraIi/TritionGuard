import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationService, { AlertNotification } from '@/services/NotificationService';

const NotificationToast = () => {
  const [notifications, setNotifications] = useState<AlertNotification[]>([]);
  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    // Listen for community notifications
    const handleCommunityNotified = (event: CustomEvent) => {
      // This is triggered when our own report notifies the community
      console.log('Community notified:', event.detail);
    };

    // Listen for local notifications (when other users report)
    const handleLocalNotification = (event: CustomEvent) => {
      const alert: AlertNotification = event.detail;
      console.log('Received local notification:', alert);
      
      // Add to notifications list
      setNotifications(prev => [alert, ...prev].slice(0, 3)); // Keep only latest 3
      
      // Auto-remove after 10 seconds for non-critical alerts
      if (alert.severity !== 'critical' && alert.severity !== 'ice' && alert.severity !== 'emergency') {
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== alert.id));
        }, 10000);
      }
    };

    // Add notification listener to service
    const serviceListener = (notification: AlertNotification) => {
      console.log('Service notification received:', notification);
      setNotifications(prev => [notification, ...prev].slice(0, 3));
    };
    
    notificationService.addNotificationListener(serviceListener);

    window.addEventListener('communityNotified', handleCommunityNotified);
    window.addEventListener('localNotification', handleLocalNotification);

    return () => {
      notificationService.removeNotificationListener(serviceListener);
      window.removeEventListener('communityNotified', handleCommunityNotified);
      window.removeEventListener('localNotification', handleLocalNotification);
    };
  }, [notificationService]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'police':
        return <Shield className="w-5 h-5 text-orange-500" />;
      case 'ice':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'emergency':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Heart className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'ice':
        return 'border-red-600 bg-red-50 text-red-900';
      case 'emergency':
        return 'border-red-500 bg-red-50 text-red-900';
      case 'police':
        return 'border-orange-500 bg-orange-50 text-orange-900';
      case 'high':
        return 'border-yellow-500 bg-yellow-50 text-yellow-900';
      default:
        return 'border-blue-500 bg-blue-50 text-blue-900';
    }
  };

  const handleNotificationClick = (notification: AlertNotification) => {
    if (notification.type === 'emergency') {
      window.location.href = '/emergency';
    } else {
      window.location.href = '/map';
    }
    removeNotification(notification.id);
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`p-4 rounded-lg border-l-4 shadow-lg backdrop-blur-sm cursor-pointer ${getSeverityColor(notification.severity)}`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">
                    {notification.title}
                  </h4>
                  <p className="text-sm mt-1 opacity-90">
                    {notification.body}
                  </p>
                  {notification.location && (
                    <p className="text-xs mt-2 opacity-75">
                      📍 {notification.location.address}
                    </p>
                  )}
                  <p className="text-xs mt-1 opacity-60">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 h-6 w-6 opacity-60 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast; 