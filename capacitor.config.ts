import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tritionguard.app',
  appName: 'TritionGuard',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    },
    Geolocation: {
      permissions: ['location']
    },
    PushNotifications: {
      presentationOptions: ['alert', 'badge', 'sound']
    }
  }
};

export default config;
