import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Users, Phone, Heart, BookOpen, Building, AlertTriangle, Navigation, MapPin, Route, Timer, Footprints, Compass, ArrowUp, ArrowRight, ArrowLeft, RotateCcw, Eye, Navigation2, X } from 'lucide-react';

// Enhanced safe zones with detailed information - ALL GREEN COLORS
const safeZones = [
  { 
    id: 1, 
    name: "Student Health Center", 
    lat: 32.8801, 
    lng: -117.2340, 
    type: "medical",
    emoji: "🏥",
    description: "24/7 medical services and mental health support",
    hours: "24/7",
    capacity: "High",
    services: ["Medical Care", "Mental Health", "Emergency Response"],
    phone: "(858) 534-3300",
    safetyLevel: "Very High",
    color: "#059669" // Green for medical
  },
  { 
    id: 3, 
    name: "International Center", 
    lat: 32.8850, 
    lng: -117.2380, 
    type: "support",
    emoji: "🌍",
    description: "Support services for international students and immigration assistance",
    hours: "8:00 AM - 5:00 PM",
    capacity: "Medium",
    services: ["Immigration Support", "Legal Resources", "Counseling"],
    phone: "(858) 534-3730",
    safetyLevel: "High",
    color: "#10b981" // Medium green for support
  },
  { 
    id: 4, 
    name: "Geisel Library", 
    lat: 32.8747, 
    lng: -117.2377, 
    type: "public",
    emoji: "📚",
    description: "Large public space with security and study areas",
    hours: "24/7 (varies by floor)",
    capacity: "Very High",
    services: ["Study Space", "Security", "Public Access"],
    phone: "(858) 534-3336",
    safetyLevel: "High",
    color: "#34d399" // Light green for public
  },
  { 
    id: 5, 
    name: "Student Services Center", 
    lat: 32.8798, 
    lng: -117.2345, 
    type: "support",
    emoji: "🎓",
    description: "Academic and financial support services",
    hours: "8:00 AM - 5:00 PM",
    capacity: "High",
    services: ["Academic Support", "Financial Aid", "Student Advocacy"],
    phone: "(858) 534-4831",
    safetyLevel: "High",
    color: "#10b981" // Medium green for support
  },
  { 
    id: 6, 
    name: "CAPS (Counseling)", 
    lat: 32.8805, 
    lng: -117.2355, 
    type: "medical",
    emoji: "💚",
    description: "Confidential mental health and crisis intervention services",
    hours: "8:00 AM - 5:00 PM",
    capacity: "Medium",
    services: ["Crisis Counseling", "Mental Health", "Emergency Support"],
    phone: "(858) 534-3755",
    safetyLevel: "Very High",
    color: "#059669" // Green for medical
  },
  {
    id: 7,
    name: "SPACES @ UCSD",
    lat: 32.8799,
    lng: -117.2362,
    type: "support",
    emoji: "🏢",
    description: "Undocumented student services, resources, and safe space support",
    hours: "9:00 AM - 5:00 PM",
    capacity: "High",
    services: ["Undocumented Student Services", "Academic Support", "Community Resources", "Legal Resources"],
    phone: "(858) 534-4777",
    safetyLevel: "Very High",
    color: "#10b981" // Medium green for support
  },
  {
    id: 8,
    name: "Residence Hall Front Desk",
    lat: 32.8790,
    lng: -117.2320,
    type: "support",
    emoji: "🏠",
    description: "24/7 residential support with emergency assistance",
    hours: "24/7",
    capacity: "Medium",
    services: ["Residential Support", "Emergency Response", "Safety Check-ins"],
    phone: "(858) 534-4207",
    safetyLevel: "High",
    color: "#10b981" // Medium green for support
  }
];

// Enhanced incidents with more detail
const incidents = [
  { 
    id: 1, 
    lat: 32.8790, 
    lng: -117.2350, 
    type: "police", 
    severity: "medium", 
    time: "5m ago",
    description: "Routine patrol activity reported",
    verified: true,
    reports: 3
  },
  { 
    id: 2, 
    lat: 32.8820, 
    lng: -117.2400, 
    type: "ice", 
    severity: "high", 
    time: "15m ago",
    description: "Unconfirmed immigration enforcement activity",
    verified: false,
    reports: 7
  }
];

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken] = useState('pk.eyJ1IjoiemFsaTEiLCJhIjoiY21iYTdmMzQzMHlyaDJtb2RxM3hobGdvYSJ9.ps3ojvR2-xQopxq6NwRt4A');
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [showZoneDetails, setShowZoneDetails] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [routeData, setRouteData] = useState<any>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [dynamicIncidents, setDynamicIncidents] = useState<any[]>([]);

  const incidentMarkers = useRef<mapboxgl.Marker[]>([]);

  // Load stored incidents from localStorage
  const loadStoredIncidents = () => {
    try {
      const storedIncidents = JSON.parse(localStorage.getItem('trition_incidents') || '[]');
      console.log('Loading stored incidents:', storedIncidents);
      setDynamicIncidents(storedIncidents);
      return storedIncidents;
    } catch (error) {
      console.error('Error loading stored incidents:', error);
      return [];
    }
  };

  // Add incident marker to map
  const addIncidentMarker = (incident: any) => {
    if (!map.current) return;

    console.log('Adding incident marker:', incident);

    const el = document.createElement('div');
    el.className = 'incident-marker enhanced';
    
    // Map severity to colors and display info
    const getSeverityInfo = (severity: string, type: string) => {
      switch (severity) {
        case 'ice':
          return { color: '#dc2626', emoji: '🚨', displayName: 'ICE Activity - Critical' };
        case 'police':
          return { color: '#f59e0b', emoji: '👮‍♂️', displayName: 'Police Activity' };
        case 'emergency':
          return { color: '#ef4444', emoji: '🚨', displayName: 'Emergency Situation' };
        case 'general':
          return { color: '#6366f1', emoji: '⚠️', displayName: 'General Safety Concern' };
        default:
          // Fallback for legacy severity values or incident type
          if (type === 'ice') return { color: '#dc2626', emoji: '🚨', displayName: 'ICE Activity' };
          if (type === 'police') return { color: '#f59e0b', emoji: '👮‍♂️', displayName: 'Police Activity' };
          return { color: '#6366f1', emoji: '⚠️', displayName: 'Safety Incident' };
      }
    };

    const severityInfo = getSeverityInfo(incident.severity, incident.type);
    
    el.innerHTML = `
      <div style="position: relative;">
        <div style="
          width: 24px;
          height: 24px;
          background-color: ${severityInfo.color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          cursor: pointer;
          transition: transform 0.2s;
          z-index: 10;
        " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
          <div style="
            position: absolute;
            width: 48px;
            height: 48px;
            background-color: ${severityInfo.color}30;
            border-radius: 50%;
            top: -12px;
            left: -12px;
            animation: incidentPulse 2s infinite;
            z-index: -1;
          "></div>
        </div>
      </div>
    `;

    // Create popup for incident details
    const popup = new mapboxgl.Popup({ 
      offset: 25,
      closeButton: false,
      className: 'incident-popup'
    }).setHTML(
      `<div style="color: black; padding: 10px; min-width: 200px;">
         <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
           <span style="font-size: 18px;">${severityInfo.emoji}</span>
           <div style="font-weight: bold; font-size: 14px; color: ${severityInfo.color};">
             ${severityInfo.displayName}
           </div>
         </div>
         <div style="color: #666; font-size: 12px; margin-bottom: 6px;">
           ${incident.description || 'No description provided'}
         </div>
         <div style="display: flex; justify-content: space-between; font-size: 11px;">
           <span style="color: #666;">⏰ ${incident.time}</span>
           <span style="color: #666;">📊 ${incident.reports || 1} report${(incident.reports || 1) > 1 ? 's' : ''}</span>
         </div>
         ${incident.verified ? '<div style="margin-top: 4px; color: #10b981; font-size: 10px;">✅ Verified</div>' : ''}
       </div>`
    );

    const marker = new mapboxgl.Marker(el)
      .setLngLat([incident.lng, incident.lat])
      .setPopup(popup)
      .addTo(map.current);

    // Store marker reference for cleanup
    incidentMarkers.current.push(marker);
  };

  // Clear all incident markers
  const clearIncidentMarkers = () => {
    incidentMarkers.current.forEach(marker => marker.remove());
    incidentMarkers.current = [];
  };

  // Add all incidents to map
  const addAllIncidentsToMap = () => {
    if (!map.current) return;
    
    console.log('Adding all incidents to map. Dynamic incidents:', dynamicIncidents.length, 'Static incidents:', incidents.length);
    
    clearIncidentMarkers();
    
    // Add default incidents
    incidents.forEach((incident) => {
      addIncidentMarker(incident);
    });

    // Add dynamic incidents from reports
    dynamicIncidents.forEach((incident) => {
      addIncidentMarker(incident);
    });
  };

  const getZoneTypeIcon = (type: string) => {
    switch (type) {
      case 'medical': return Heart;
      case 'police': return Shield;
      case 'support': return Users;
      case 'public': return Building;
      default: return Shield;
    }
  };

  const getSafetyLevelColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'text-green-600';
      case 'High': return 'text-blue-600';
      case 'Medium': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  // Get user's current location (one-time only, no tracking)
  const getCurrentLocation = (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.longitude,
            position.coords.latitude
          ];
          setCurrentLocation(coords);
          resolve(coords);
        },
        (error) => {
          // Fallback to UCSD campus center if location access denied
          const fallbackCoords: [number, number] = [-117.2340, 32.8801];
          setCurrentLocation(fallbackCoords);
          resolve(fallbackCoords);
        },
        {
          enableHighAccuracy: false, // Reduced accuracy for privacy
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  // Add static route to map (no real-time updates)
  const displayRoute = (route: any) => {
    if (!map.current) return;

    // Remove existing route layers
    if (map.current.getSource('route')) {
      map.current.removeLayer('route-main');
      map.current.removeSource('route');
    }

    // Add route source
    map.current.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: route.geometry
      }
    });

    // Add static route layer
    map.current.addLayer({
      id: 'route-main',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#059669',
        'line-width': 6,
        'line-opacity': 1
      }
    });

    // Fit map to route
    const coordinates = route.geometry.coordinates;
    const bounds = coordinates.reduce((bounds: any, coord: any) => {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    map.current.fitBounds(bounds, {
      padding: 50,
      duration: 1000
    });
  };

  // Calculate route using Mapbox Directions API
  const calculateRoute = async (destination: [number, number]) => {
    try {
      const origin = currentLocation || await getCurrentLocation();
      
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?steps=true&geometries=geojson&access_token=${mapboxToken}`
      );
      
      const data = await query.json();
      
      if (data.routes && data.routes.length > 0) {
        setRouteData(data.routes[0]);
        return data.routes[0];
      }
      throw new Error('No route found');
    } catch (error) {
      console.error('Route calculation failed:', error);
      throw error;
    }
  };

  // Show static route and directions
  const showRoute = async (zone: any) => {
    try {
      setIsNavigating(true);
      const route = await calculateRoute([zone.lng, zone.lat]);
      displayRoute(route);
      setShowDirections(true);
      setShowZoneDetails(false);
    } catch (error) {
      console.error('Route calculation failed:', error);
      setIsNavigating(false);
    }
  };

  // Clear route from map
  const clearRoute = () => {
    setShowDirections(false);
    setIsNavigating(false);
    setRouteData(null);
    
    // Remove route from map
    if (map.current && map.current.getSource('route')) {
      map.current.removeLayer('route-main');
      map.current.removeSource('route');
    }
  };

  // Format duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Format distance
  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
  };

  const createEnhancedMarker = (zone: any) => {
    const el = document.createElement('div');
    el.className = 'safe-zone-marker enhanced';
    el.innerHTML = `
      <div class="marker-container" style="position: relative;">
        <div class="marker-pulse" style="
          position: absolute;
          width: 40px;
          height: 40px;
          background-color: ${zone.color}40;
          border-radius: 50%;
          animation: markerPulse 2s infinite;
          top: -10px;
          left: -10px;
        "></div>
        <div class="marker-main" style="
          position: relative;
          width: 20px;
          height: 20px;
          background-color: ${zone.color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        ">
        </div>
        <div class="marker-emoji" style="
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
          background: white;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          z-index: 3;
        ">${zone.emoji}</div>
      </div>
    `;

    el.addEventListener('click', () => {
      setSelectedZone(zone);
      setShowZoneDetails(true);
    });

    return el;
  };

  const initializeMap = (token: string) => {
    if (!mapRef.current) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-117.2340, 32.8801], // UCSD campus center
      zoom: 15
    });

    // Add navigation controls with custom positioning to avoid overlap
    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, 'top-right');

    map.current.on('load', () => {
      console.log('Map loaded, adding markers...');
      
      // Add enhanced safe zones
      safeZones.forEach((zone) => {
        const el = createEnhancedMarker(zone);

        const popup = new mapboxgl.Popup({ 
          offset: 25,
          closeButton: false,
          className: 'custom-popup'
        }).setHTML(
          `<div style="color: black; padding: 8px;">
             <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
               <span style="font-size: 20px;">${zone.emoji}</span>
               <div style="font-weight: bold; font-size: 14px;">${zone.name}</div>
             </div>
             <div style="color: #666; font-size: 12px; margin-bottom: 6px;">${zone.description}</div>
             <div style="display: flex; justify-content: space-between; font-size: 11px;">
               <span style="color: #10b981;">📞 ${zone.phone}</span>
               <span style="color: #3b82f6;">🕒 ${zone.hours}</span>
             </div>
             <div style="margin-top: 6px; font-size: 11px; color: #666;">
               Click for more details
             </div>
           </div>`
        );

        new mapboxgl.Marker(el)
          .setLngLat([zone.lng, zone.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Load and add stored incidents after map is ready
      const storedIncidents = loadStoredIncidents();
      
      // Add enhanced incident markers
      addAllIncidentsToMap();
      
      console.log('Map initialization complete. Stored incidents loaded:', storedIncidents.length);
    });
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
      // Initialize user location
      getCurrentLocation().catch(console.error);
    }

    // Listen for new incident reports
    const handleNewIncident = (event: CustomEvent) => {
      const newIncident = event.detail;
      console.log('New incident reported:', newIncident);
      
      setDynamicIncidents(prev => {
        const updated = [...prev, newIncident];
        console.log('Updated dynamic incidents:', updated);
        return updated;
      });
      
      // If map is ready, add the marker immediately
      if (map.current && map.current.loaded()) {
        console.log('Adding new incident marker immediately');
        addIncidentMarker(newIncident);
      }
    };

    window.addEventListener('newIncidentReported', handleNewIncident as EventListener);

    return () => {
      map.current?.remove();
      window.removeEventListener('newIncidentReported', handleNewIncident as EventListener);
    };
  }, [mapboxToken]);

  // Re-render incidents when dynamicIncidents changes
  useEffect(() => {
    if (map.current && map.current.loaded()) {
      console.log('Dynamic incidents changed, re-rendering map');
      addAllIncidentsToMap();
    }
  }, [dynamicIncidents]);

  // Add current location marker to map
  useEffect(() => {
    if (currentLocation && map.current) {
      // Remove existing location marker
      const existingMarker = document.querySelector('.current-location-marker');
      if (existingMarker) {
        existingMarker.remove();
      }

      // Add new current location marker
      const el = document.createElement('div');
      el.className = 'current-location-marker';
      el.innerHTML = `
        <div style="
          width: 16px;
          height: 16px;
          background-color: #3b82f6;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          position: relative;
        ">
          <div style="
            position: absolute;
            width: 32px;
            height: 32px;
            background-color: rgba(59, 130, 246, 0.2);
            border-radius: 50%;
            top: -8px;
            left: -8px;
            animation: locationPulse 2s infinite;
          "></div>
        </div>
      `;

      new mapboxgl.Marker(el)
        .setLngLat(currentLocation)
        .addTo(map.current);
    }
  }, [currentLocation]);

  return (
    <div className="absolute inset-0">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Enhanced Zone Details Modal */}
      <AnimatePresence>
        {showZoneDetails && selectedZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-4"
            onClick={() => setShowZoneDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{selectedZone.emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedZone.name}</h3>
                      <div className={`text-sm font-medium ${getSafetyLevelColor(selectedZone.safetyLevel)}`}>
                        🛡️ Safety Level: {selectedZone.safetyLevel}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowZoneDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </Button>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4">{selectedZone.description}</p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-600 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">Hours</span>
                    </div>
                    <p className="text-sm text-blue-800">{selectedZone.hours}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-600 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">Capacity</span>
                    </div>
                    <p className="text-sm text-green-800">{selectedZone.capacity}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Emergency Contact</span>
                  </div>
                  <p className="text-lg font-mono text-gray-900">{selectedZone.phone}</p>
                  <p className="text-xs text-gray-500 mt-1">Available {selectedZone.hours}</p>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                    {(() => {
                      const IconComponent = getZoneTypeIcon(selectedZone.type);
                      return <IconComponent className="w-4 h-4 mr-2" />;
                    })()}
                    Available Services
                  </h4>
                  <div className="space-y-2">
                    {selectedZone.services.map((service: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      window.open(`tel:${selectedZone.phone}`, '_self');
                    }}
                  >
                    📞 Call Now
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-center space-x-1 h-10 text-sm border-gray-300 hover:bg-gray-50"
                      onClick={() => {
                        if (map.current) {
                          map.current.flyTo({
                            center: [selectedZone.lng, selectedZone.lat],
                            zoom: 18,
                            speed: 1.5
                          });
                          setShowZoneDetails(false);
                        }
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-gray-700">View</span>
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700 flex items-center justify-center space-x-1 h-10 text-sm"
                      onClick={() => showRoute(selectedZone)}
                      disabled={isNavigating}
                    >
                      <Navigation className="w-4 h-4" />
                      <span>{isNavigating ? 'Loading...' : 'Route'}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Enhanced Directions Panel */}
      <AnimatePresence>
        {showDirections && routeData && selectedZone && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="absolute top-20 left-2 sm:left-4 z-25 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-200 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto max-w-sm"
          >
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-gray-200">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-green-100 p-1.5 sm:p-2 rounded-lg">
                    <Route className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold sm:font-bold text-gray-900 text-sm sm:text-base">Route to {selectedZone.name}</h3>
                    <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Timer className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{formatDuration(routeData.duration)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Footprints className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{formatDistance(routeData.distance)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearRoute();
                  }}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center cursor-pointer relative z-30"
                  type="button"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
                </Button>
              </div>

              {/* Route Information */}
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700 mb-1 sm:mb-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base font-medium">Static Route Display</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                  This shows a walking route to your destination. For privacy, no location tracking is enabled.
                </p>
              </div>

              {/* Emergency Contact */}
              <div className="p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                    <span className="text-sm sm:text-base font-medium text-red-800">Emergency Contact</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md sm:rounded-lg"
                    onClick={() => window.open(`tel:${selectedZone.phone}`, '_self')}
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                    {selectedZone.phone}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Enhanced Map Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`absolute bottom-28 left-2 sm:left-4 bg-white/95 backdrop-blur p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-xl text-xs sm:text-sm space-y-2 sm:space-y-3 z-20 max-w-[180px] sm:max-w-xs ${isNavigating ? 'hidden' : ''}`}
      >
        <div className="text-gray-800 font-semibold sm:font-bold text-sm sm:text-lg mb-1 sm:mb-3 flex items-center">
          <Building className="w-4 h-4 sm:w-5 sm:h-5 mr-2 opacity-75" /> UCSD Safe Campus
        </div>
        
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              <div className="relative">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
                <div className="absolute -top-1 -right-1 text-[9px] sm:text-xs">🏥</div>
              </div>
              <span className="text-gray-700 text-[11px] sm:text-sm">Medical Zones</span>
            </div>
            <span className="text-[10px] sm:text-xs text-green-600 font-medium">24/7</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              <div className="relative">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full border-2 border-white shadow"></div>
                <div className="absolute -top-1 -right-1 text-[9px] sm:text-xs">🛡️</div>
              </div>
              <span className="text-gray-700 text-[11px] sm:text-sm">Police & Security</span>
            </div>
            <span className="text-[10px] sm:text-xs text-green-600 font-medium">24/7</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              <div className="relative">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white shadow"></div>
                <div className="absolute -top-1 -right-1 text-[9px] sm:text-xs">📚</div>
              </div>
              <span className="text-gray-700 text-[11px] sm:text-sm">Public Spaces</span>
            </div>
            <span className="text-[10px] sm:text-xs text-green-600 font-medium">Varies</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              <div className="relative">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
                <div className="absolute -top-1 -right-1 text-[9px] sm:text-xs">🌍</div>
              </div>
              <span className="text-gray-700 text-[11px] sm:text-sm">Support Services</span>
            </div>
            <span className="text-[10px] sm:text-xs text-green-600 font-medium">8-5</span>
          </div>
        </div>

        <hr className="border-gray-200 my-1.5 sm:my-2" />

        <div className="space-y-1.5 sm:space-y-2">
          <div className="text-gray-600 font-medium text-[10px] sm:text-xs mb-1 sm:mb-2">🚨 CURRENT ALERTS</div>
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            <div className="relative">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full border-2 border-white shadow animate-pulse"></div>
              <div className="absolute -top-1 -right-1 text-[9px] sm:text-xs">👮‍♂️</div>
            </div>
            <span className="text-gray-700 text-[11px] sm:text-sm">Police Activity</span>
          </div>
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            <div className="relative">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full border-2 border-white shadow animate-pulse"></div>
              <div className="absolute -top-1 -right-1 text-[9px] sm:text-xs">🚨</div>
            </div>
            <span className="text-gray-700 text-[11px] sm:text-sm">ICE Activity</span>
          </div>
        </div>

        <div className="text-[10px] sm:text-xs text-gray-500 pt-1.5 sm:pt-2 border-t border-gray-200">
          💡 Tap any zone for detailed info
        </div>
      </motion.div>

      {/* Zone Stats Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute top-44 sm:top-48 right-2 sm:right-4 bg-white/95 backdrop-blur p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg text-[10px] sm:text-xs z-20 max-w-[150px] sm:max-w-xs"
      >
        <div className="text-gray-800 font-semibold sm:font-bold mb-1 sm:mb-2 text-xs sm:text-sm">📊 Live Stats</div>
        <div className="space-y-0.5 sm:space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">Safe Zones:</span>
            <span className="text-green-600 font-medium">{safeZones.length} Active</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">24/7 Zones:</span>
            <span className="text-blue-600 font-medium">
              {safeZones.filter(z => z.hours === "24/7").length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Incidents:</span>
            <span className="text-red-600 font-medium">{incidents.length + dynamicIncidents.length} Reported</span>
          </div>
        </div>
      </motion.div>

      <style>{`
        /* Custom positioning for Mapbox navigation controls */
        .mapboxgl-ctrl-top-right {
          top: 80px !important;
          right: 10px !important;
        }
        
        .mapboxgl-ctrl-top-right .mapboxgl-ctrl {
          margin: 0 0 10px 0 !important;
        }

        @keyframes markerPulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes incidentPulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.4;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }

        @keyframes locationPulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
        }

        @keyframes turnPulse {
          0% {
            transform: scale(1);
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(5, 150, 105, 0.6);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
          }
        }

        @keyframes routeFlow {
          0% {
            stroke-dasharray: 0 10;
          }
          50% {
            stroke-dasharray: 5 5;
          }
          100% {
            stroke-dasharray: 10 0;
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }

        .custom-popup .mapboxgl-popup-content {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
          border-top-color: white;
        }

        /* Enhanced scrollbar for directions */
        .space-y-3::-webkit-scrollbar {
          width: 4px;
        }

        .space-y-3::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        .space-y-3::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 4px;
        }

        .space-y-3::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }

        /* Navigation mode styles */
        .turn-indicator:hover {
          transform: scale(1.1);
          transition: transform 0.2s ease;
        }

        /* Route animation */
        #route-main {
          animation: routeFlow 3s infinite linear;
        }

        /* AR Mode compass styles */
        .compass-needle {
          transition: transform 0.3s ease-out;
        }

        /* Progress bar animation */
        .progress-fill {
          transition: width 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MapComponent;
