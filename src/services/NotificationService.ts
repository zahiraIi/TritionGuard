import { PushNotifications } from '@capacitor/push-notifications';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export interface AlertNotification {
  id: string;
  type: 'police' | 'ice' | 'emergency' | 'safe_zone';
  title: string;
  body: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: number;
}

class NotificationService {
  private static instance: NotificationService;
  private isInitialized = false;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Request permission to use push notifications
      const permStatus = await PushNotifications.requestPermissions();
      
      if (permStatus.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        await PushNotifications.register();
        
        // Handle registration success
        PushNotifications.addListener('registration', (token) => {
          console.log('Push registration success, token: ' + token.value);
        });
        
        // Handle registration errors
        PushNotifications.addListener('registrationError', (error) => {
          console.error('Registration error: ', error);
        });
        
        // Handle received notifications
        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          this.handleReceivedNotification(notification);
        });
        
        // Handle notification actions
        PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
          this.handleNotificationAction(notification);
        });
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  }

  async sendCommunityAlert(alert: AlertNotification) {
    // Trigger haptic feedback for urgent alerts
    if (alert.severity === 'high' || alert.severity === 'critical') {
      await this.triggerHapticFeedback();
    }

    // Store alert locally
    this.storeLocalAlert(alert);

    // In a real app, this would send to a backend service
    // For demo purposes, we'll simulate a local notification
    await this.scheduleLocalNotification(alert);
  }

  async triggerHapticFeedback() {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (error) {
      console.log('Haptic feedback not available:', error);
    }
  }

  private async scheduleLocalNotification(alert: AlertNotification) {
    try {
      // This would typically be handled by the backend
      // For demo, we simulate notification delivery
      setTimeout(() => {
        const event = new CustomEvent('communityAlert', { detail: alert });
        window.dispatchEvent(event);
      }, 1000);
    } catch (error) {
      console.error('Failed to schedule notification:', error);
    }
  }

  private handleReceivedNotification(notification: any) {
    console.log('Push notification received: ', notification);
    
    // Trigger haptic feedback
    this.triggerHapticFeedback();
    
    // Handle different notification types
    if (notification.data?.type === 'emergency') {
      // Route to emergency page if app is open
      window.location.href = '/emergency';
    }
  }

  private handleNotificationAction(notification: any) {
    console.log('Push notification action performed: ', notification);
    
    // Handle notification tap actions
    if (notification.notification?.data?.route) {
      window.location.href = notification.notification.data.route;
    }
  }

  private storeLocalAlert(alert: AlertNotification) {
    try {
      const alerts = this.getStoredAlerts();
      alerts.push(alert);
      
      // Keep only last 50 alerts
      const recentAlerts = alerts.slice(-50);
      localStorage.setItem('trition_alerts', JSON.stringify(recentAlerts));
    } catch (error) {
      console.error('Failed to store alert:', error);
    }
  }

  getStoredAlerts(): AlertNotification[] {
    try {
      const stored = localStorage.getItem('trition_alerts');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get stored alerts:', error);
      return [];
    }
  }

  clearAlerts() {
    localStorage.removeItem('trition_alerts');
  }
}

export default NotificationService; 