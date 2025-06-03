# TritionGuard 🛡️

A mobile safety app designed specifically for undocumented students and students at risk of deportation built for my CCE 1 final project. TritionGuard provides anonymous community reporting, real-time alerts, and emergency resources to help keep vulnerable students safe.

## 🌟 Features

### Core Safety Features
- **Anonymous Authentication** - Complete privacy protection without personal data collection
- **Access Code Security** - Community-controlled access to ensure trusted membership
- **Real-time Community Map** - Interactive map centered on UCSD campus with live incident reports
- **Emergency Panic Button** - One-tap SOS system that alerts community members
- **Safe Zone Navigation** - Marked safe locations with directions when needed

### Incident Reporting
- **Quick Report Buttons** - Fast reporting for police and ICE activity
- **Photo Evidence** - Secure photo capture with automatic GPS location tagging
- **Severity Levels** - Multiple priority levels from low to critical
- **Community Alerts** - Automatic notifications to other community members

### Emergency Support
- **Know Your Rights** - Legal information and guidance
- **Emergency Contacts** - Quick access to lawyers, legal aid, and support services
- **Community Notifications** - Push notifications with haptic feedback for urgent alerts

## 🚀 Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Mobile Framework**: Capacitor (iOS/Android deployment)
- **UI Components**: Radix UI + Tailwind CSS
- **Animations**: Framer Motion
- **Maps**: Mapbox GL
- **State Management**: React Query + Local Storage
- **Mobile Features**: Camera, Geolocation, Push Notifications, Haptics

## 📱 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- iOS: Xcode 14+ (for iOS development)
- Android: Android Studio (for Android development)

### Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd TritionGuard
   npm install
   ```

2. **Environment Setup**
   - Get a Mapbox API token from [mapbox.com](https://www.mapbox.com)
   - Update the token in `src/components/MapComponent.tsx`

3. **Start Development Server**
   ```bash
   npm run dev
   ```

### Mobile Deployment

#### iOS Deployment
```bash
npm run build
npx cap add ios
npx cap copy ios
npx cap open ios
```

#### Android Deployment
```bash
npm run build
npx cap add android
npx cap copy android
npx cap open android
```

## 🗺️ App Flow

1. **Landing Page** - Introduction to TritionGuard with feature overview
2. **Anonymous Authentication** - Secure login without personal data
3. **Access Code Entry** - Community-controlled access (Demo codes: UCSD2024, TRITON, GUARDIAN, SAFETY)
4. **Interactive Map** - Main interface with UCSD campus view
5. **Incident Reporting** - Report police/ICE activity with photos
6. **Emergency Mode** - Panic button activates emergency protocols

## 🔧 Key Components

### Services
- **NotificationService** - Handles push notifications and community alerts
- **CameraService** - Manages photo capture with GPS tagging

### Core Pages
- **MapView** - Main interactive map with real-time alerts
- **ReportIncident** - Incident reporting with photo evidence
- **Emergency** - Emergency protocols and contact information
- **KnowYourRights** - Legal information and resources

### Security Features
- Anonymous user authentication
- No personal data storage
- Local-only data persistence
- End-to-end encrypted communications (in production)

## 🎯 Demo Access Codes

For testing purposes, use these access codes:
- `UCSD2024` - Standard access
- `TRITON` - Campus-specific access
- `GUARDIAN` - Community organizer access
- `SAFETY` - Emergency response access

## 🔒 Privacy & Security

- **Zero Personal Data Collection** - No names, emails, or identifying information
- **Anonymous Reporting** - All incident reports are completely anonymous
- **Local Storage** - Sensitive data stored only on device
- **Secure Communication** - All community alerts use secure channels
- **Auto-Delete** - Old alerts and photos automatically removed for privacy

## 🚨 Emergency Features

### Panic Button
- 3-second countdown with cancel option
- Automatic community alert to all members
- Direct access to emergency resources and contacts

### Emergency Contacts
- Legal aid hotlines
- Immigration lawyers
- Student support services
- Community organizers

## 🌍 Community Features

### Real-time Alerts
- Police activity notifications
- ICE enforcement alerts
- Safe zone updates
- Community safety messages

### Safe Zones
Pre-marked locations on campus:
- Student Health Center
- International Center
- Geisel Library
- Student Services Center
- CAPS (Counseling and Psychological Services)
- Price Center
- Residence Hall Front Desk

## 📋 Development Guidelines

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Tailwind CSS for styling
- Framer Motion for animations

### Mobile Best Practices
- Responsive design for all screen sizes
- Touch-friendly UI elements
- Haptic feedback for important actions
- Offline functionality where possible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Test on both iOS and Android
5. Submit a pull request

## 📄 License

This project is designed for educational and community safety purposes. Please ensure compliance with local laws and university policies when deploying.

## 🆘 Support

For technical support or community access codes, contact your local student organization or community safety coordinator.

---

**Disclaimer**: This app is designed for community safety and educational purposes. Users should always comply with local laws and university policies. The app does not replace professional legal advice or emergency services.
