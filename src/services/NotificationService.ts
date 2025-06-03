import { PushNotifications, Token, ActionPerformed, PushNotificationSchema } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

export interface AlertNotification {
  id: string;
  type: 'police' | 'ice' | 'emergency' | 'safe_zone' | 'general';
  title: string;
  body: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  severity: 'low' | 'medium' | 'high' | 'critical' | 'general' | 'police' | 'ice' | 'emergency';
  timestamp: number;
}

class NotificationService {
  private static instance: NotificationService;
  private isInitialized = false;
  private registrationToken: string | null = null;
  private notificationListeners: Array<(notification: AlertNotification) => void> = [];

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      console.log('Initializing NotificationService...');
      
      // Only initialize push notifications on native platforms
      if (Capacitor.isNativePlatform()) {
        await this.initializePushNotifications();
        await this.initializeLocalNotifications();
      } else {
        console.log('Running in web mode, push notifications limited to local notifications');
        await this.initializeWebNotifications();
      }
      
      this.isInitialized = true;
      console.log('NotificationService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
      // Still mark as initialized to prevent repeated attempts
      this.isInitialized = true;
    }
  }

  private async initializePushNotifications() {
    // Check if push notifications are available
    const permissionStatus = await PushNotifications.checkPermissions();
    console.log('Current push notification permissions:', permissionStatus);

    if (permissionStatus.receive === 'prompt') {
      // Request permission
      const requestResult = await PushNotifications.requestPermissions();
      console.log('Push notification permission request result:', requestResult);
      
      if (requestResult.receive !== 'granted') {
        console.warn('Push notification permission denied');
        return;
      }
    }

    if (permissionStatus.receive === 'granted' || permissionStatus.receive === 'prompt-with-rationale') {
      try {
        // Register with Apple / Google to receive push via APNS/FCM
        await PushNotifications.register();
        console.log('Push notifications registered successfully');
        
        // Handle registration success
        PushNotifications.addListener('registration', (token: Token) => {
          console.log('Push registration success, token: ' + token.value);
          this.registrationToken = token.value;
          // In a real app, send this token to your backend
          this.sendTokenToBackend(token.value);
        });
        
        // Handle registration errors
        PushNotifications.addListener('registrationError', (error: any) => {
          console.error('Registration error: ', error);
        });
        
        // Handle received notifications when app is in foreground
        PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
          console.log('Push notification received: ', notification);
          this.handleReceivedNotification(notification);
        });
        
        // Handle notification actions (when user taps notification)
        PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
          console.log('Push notification action performed: ', notification);
          this.handleNotificationAction(notification);
        });
        
      } catch (error) {
        console.error('Failed to register for push notifications:', error);
      }
    }
  }

  private async initializeWebNotifications() {
    // Request notification permission for web
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      console.log('Web notification permission:', permission);
    }
  }

  private async initializeLocalNotifications() {
    try {
      // Request permissions for local notifications
      const permissions = await LocalNotifications.requestPermissions();
      console.log('Local notification permissions:', permissions);

      // Listen for local notification actions
      LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        console.log('Local notification action performed:', notification);
        this.handleLocalNotificationAction(notification);
      });

    } catch (error) {
      console.error('Failed to initialize local notifications:', error);
    }
  }

  private async sendTokenToBackend(token: string) {
    // In a real implementation, send the token to your backend server
    // This would be used to send push notifications from your server
    console.log('Would send token to backend:', token);
    
    // Store token locally for reference
    localStorage.setItem('push_token', token);
  }

  async sendCommunityAlert(alert: AlertNotification) {
    console.log('Sending community alert:', alert);

    // Trigger haptic feedback for urgent alerts
    if (alert.severity === 'high' || alert.severity === 'critical' || alert.severity === 'ice' || alert.severity === 'emergency') {
      await this.triggerHapticFeedback();
    }

    // Store alert locally
    this.storeLocalAlert(alert);

    // Notify listeners immediately
    this.notifyListeners(alert);

    // Send immediate local notification
    await this.sendLocalNotification(alert);

    // In a real app, this would send to a backend service to notify other users
    // For demo purposes, we'll simulate community notification
    await this.simulateCommunityNotification(alert);
  }

  private notifyListeners(alert: AlertNotification) {
    this.notificationListeners.forEach(listener => {
      try {
        listener(alert);
      } catch (error) {
        console.error('Error in notification listener:', error);
      }
    });
  }

  addNotificationListener(listener: (notification: AlertNotification) => void) {
    this.notificationListeners.push(listener);
  }

  removeNotificationListener(listener: (notification: AlertNotification) => void) {
    const index = this.notificationListeners.indexOf(listener);
    if (index > -1) {
      this.notificationListeners.splice(index, 1);
    }
  }

  private async sendLocalNotification(alert: AlertNotification) {
    try {
      if (Capacitor.isNativePlatform()) {
        // Use Capacitor's local notifications for native platforms
        await this.scheduleLocalNotification(alert);
      } else if ('Notification' in window && Notification.permission === 'granted') {
        // Use web notifications for web platform
        const notification = new Notification(alert.title, {
          body: alert.body,
          icon: '/icon-192x192.png',
          badge: '/icon-72x72.png',
          tag: alert.id,
          requireInteraction: alert.severity === 'critical' || alert.severity === 'ice' || alert.severity === 'emergency',
          silent: false,
          data: {
            type: alert.type,
            severity: alert.severity,
            location: alert.location,
            timestamp: alert.timestamp
          }
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
          // Navigate to relevant page based on alert type
          if (alert.type === 'emergency') {
            window.location.href = '/emergency';
          } else {
            window.location.href = '/map';
          }
        };

        // Auto-close after 10 seconds for non-critical alerts
        if (alert.severity !== 'critical' && alert.severity !== 'ice' && alert.severity !== 'emergency') {
          setTimeout(() => notification.close(), 10000);
        }
      }
    } catch (error) {
      console.error('Failed to send local notification:', error);
    }
  }

  private async simulateCommunityNotification(alert: AlertNotification) {
    // Simulate sending notification to other community members
    // In a real app, this would be handled by your backend
    setTimeout(() => {
      console.log('Community notified about:', alert.title);
      
      // Dispatch an event that the UI can listen to
      const event = new CustomEvent('communityNotified', { 
        detail: { 
          message: `Community alert sent: ${alert.title}`,
          alertId: alert.id,
          timestamp: Date.now()
        } 
      });
      window.dispatchEvent(event);
    }, 500);
  }

  async triggerHapticFeedback() {
    try {
      if (Capacitor.isNativePlatform()) {
        await Haptics.impact({ style: ImpactStyle.Heavy });
      } else {
        // Fallback vibration for web
        if ('vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);
        }
      }
    } catch (error) {
      console.log('Haptic feedback not available:', error);
    }
  }

  private async scheduleLocalNotification(alert: AlertNotification) {
    try {
      if (Capacitor.isNativePlatform()) {
        // Use Capacitor's local notifications for native platforms
        const notificationId = parseInt(alert.id.replace(/\D/g, '')) || Date.now();
        
        // Schedule immediate local notification
        await LocalNotifications.schedule({
          notifications: [
            {
              title: alert.title,
              body: alert.body,
              id: notificationId,
              schedule: { at: new Date(Date.now() + 1000) }, // 1 second delay for immediate delivery
              sound: alert.severity === 'critical' || alert.severity === 'ice' || alert.severity === 'emergency' ? 'default' : undefined,
              attachments: undefined,
              actionTypeId: 'COMMUNITY_ALERT',
              extra: {
                type: alert.type,
                severity: alert.severity,
                alertId: alert.id,
                route: alert.type === 'emergency' ? '/emergency' : '/map',
                location: alert.location ? JSON.stringify(alert.location) : undefined
              }
            }
          ]
        });
        
        console.log(`Local notification scheduled with ID ${notificationId}`);
      } else {
        // Fallback for web - dispatch custom event
        const event = new CustomEvent('localNotification', { detail: alert });
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error('Failed to schedule local notification:', error);
      // Fallback to custom event
      const event = new CustomEvent('localNotification', { detail: alert });
      window.dispatchEvent(event);
    }
  }

  private handleReceivedNotification(notification: PushNotificationSchema) {
    console.log('Push notification received in foreground: ', notification);
    
    // Trigger haptic feedback
    this.triggerHapticFeedback();
    
    // Create local alert object
    const alert: AlertNotification = {
      id: notification.id || `notification_${Date.now()}`,
      type: (notification.data?.type as any) || 'general',
      title: notification.title || 'TritionGuard Alert',
      body: notification.body || 'New safety alert in your area',
      severity: (notification.data?.severity as any) || 'medium',
      timestamp: Date.now(),
      location: notification.data?.location ? JSON.parse(notification.data.location) : undefined
    };

    // Store and notify
    this.storeLocalAlert(alert);
    this.notifyListeners(alert);
    
    // Handle different notification types
    if (notification.data?.type === 'emergency') {
      // Route to emergency page if app is open
      setTimeout(() => {
        window.location.href = '/emergency';
      }, 1000);
    }
  }

  private handleNotificationAction(notification: ActionPerformed) {
    console.log('Push notification action performed: ', notification);
    
    // Handle notification tap actions
    const data = notification.notification?.data;
    if (data?.route) {
      window.location.href = data.route;
    } else if (data?.type === 'emergency') {
      window.location.href = '/emergency';
    } else {
      window.location.href = '/map';
    }
  }

  private handleLocalNotificationAction(notification: any) {
    const data = notification.notification?.extra;
    if (data?.route) {
      window.location.href = data.route;
    } else if (data?.type === 'emergency') {
      window.location.href = '/emergency';
    } else {
      window.location.href = '/map';
    }
  }

  private storeLocalAlert(alert: AlertNotification) {
    try {
      const alerts = this.getStoredAlerts();
      alerts.push(alert);
      
      // Keep only last 100 alerts
      const recentAlerts = alerts.slice(-100);
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

  getRegistrationToken(): string | null {
    return this.registrationToken || localStorage.getItem('push_token');
  }

  clearAlerts() {
    localStorage.removeItem('trition_alerts');
  }

  // Method to manually send a test notification (for development)
  async sendTestNotification() {
    const testAlert: AlertNotification = {
      id: `test_${Date.now()}`,
      type: 'general',
      title: 'TritionGuard Test',
      body: 'This is a test notification to verify the system is working.',
      severity: 'medium',
      timestamp: Date.now()
    };

    await this.sendCommunityAlert(testAlert);
  }
}

export default NotificationService; 