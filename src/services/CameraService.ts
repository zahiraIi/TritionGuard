import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

export interface IncidentPhoto {
  id: string;
  photo: Photo;
  location?: {
    lat: number;
    lng: number;
    accuracy: number;
    timestamp: number;
  };
  timestamp: number;
  type: 'police' | 'ice' | 'evidence' | 'safety';
}

class CameraService {
  private static instance: CameraService;

  static getInstance(): CameraService {
    if (!CameraService.instance) {
      CameraService.instance = new CameraService();
    }
    return CameraService.instance;
  }

  async takeIncidentPhoto(type: 'police' | 'ice' | 'evidence' | 'safety' = 'evidence'): Promise<IncidentPhoto | null> {
    try {
      // Check camera permissions
      const permissions = await Camera.checkPermissions();
      if (permissions.camera !== 'granted') {
        const newPermissions = await Camera.requestPermissions();
        if (newPermissions.camera !== 'granted') {
          throw new Error('Camera permission denied');
        }
      }

      // Take photo
      const photo = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: false, // Don't save to gallery for privacy
      });

      // Get current location
      let location;
      try {
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
        });
        
        location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };
      } catch (locationError) {
        console.warn('Could not get location for photo:', locationError);
      }

      const incidentPhoto: IncidentPhoto = {
        id: this.generateId(),
        photo,
        location,
        timestamp: Date.now(),
        type,
      };

      // Store photo metadata locally (actual photo storage would be handled by backend)
      this.storePhotoMetadata(incidentPhoto);

      return incidentPhoto;
    } catch (error) {
      console.error('Failed to take photo:', error);
      return null;
    }
  }

  async takeQuickEvidence(): Promise<IncidentPhoto | null> {
    return this.takeIncidentPhoto('evidence');
  }

  private generateId(): string {
    return `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private storePhotoMetadata(photo: IncidentPhoto) {
    try {
      const stored = this.getStoredPhotos();
      stored.push({
        ...photo,
        photo: { ...photo.photo, webPath: undefined }, // Don't store the actual image data
      });
      
      // Keep only last 20 photo metadata entries
      const recentPhotos = stored.slice(-20);
      localStorage.setItem('trition_photos', JSON.stringify(recentPhotos));
    } catch (error) {
      console.error('Failed to store photo metadata:', error);
    }
  }

  getStoredPhotos(): IncidentPhoto[] {
    try {
      const stored = localStorage.getItem('trition_photos');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get stored photos:', error);
      return [];
    }
  }

  clearStoredPhotos() {
    localStorage.removeItem('trition_photos');
  }

  async selectFromGallery(): Promise<IncidentPhoto | null> {
    try {
      const photo = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });

      const incidentPhoto: IncidentPhoto = {
        id: this.generateId(),
        photo,
        timestamp: Date.now(),
        type: 'evidence',
      };

      this.storePhotoMetadata(incidentPhoto);
      return incidentPhoto;
    } catch (error) {
      console.error('Failed to select photo from gallery:', error);
      return null;
    }
  }
}

export default CameraService; 