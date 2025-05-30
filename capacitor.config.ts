
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.46d96b464f0045a7a37b802ed208dff8',
  appName: 'TritionGuard',
  webDir: 'dist',
  server: {
    url: 'https://46d96b46-4f00-45a7-a37b-802ed208dff8.lovableproject.com?forceHideBadge=true',
    cleartext: true
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
