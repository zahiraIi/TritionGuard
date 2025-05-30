
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Real UCSD campus safe zones with exact coordinates
const safeZones = [
  { id: 1, name: "Student Health Center", lat: 32.8801, lng: -117.2340, type: "medical" },
  { id: 2, name: "Campus Police Station", lat: 32.8823, lng: -117.2348, type: "police" },
  { id: 3, name: "International Center", lat: 32.8850, lng: -117.2380, type: "support" },
  { id: 4, name: "Geisel Library", lat: 32.8747, lng: -117.2377, type: "public" },
  { id: 5, name: "Student Services Center", lat: 32.8798, lng: -117.2345, type: "support" },
  { id: 6, name: "CAPS (Counseling)", lat: 32.8805, lng: -117.2355, type: "medical" }
];

const incidents = [
  { id: 1, lat: 32.8790, lng: -117.2350, type: "police", severity: "medium", time: "5m ago" },
  { id: 2, lat: 32.8820, lng: -117.2400, type: "ice", severity: "high", time: "15m ago" }
];

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = (token: string) => {
    if (!mapRef.current) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-117.2340, 32.8801], // UCSD campus center
      zoom: 15
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Add safe zones
      safeZones.forEach((zone) => {
        // Create a green marker for safe zones
        const el = document.createElement('div');
        el.className = 'safe-zone-marker';
        el.style.cssText = `
          width: 20px;
          height: 20px;
          background-color: #10b981;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="color: black; font-weight: bold;">${zone.name}</div>
           <div style="color: #666; font-size: 12px;">Safe Zone - ${zone.type}</div>`
        );

        new mapboxgl.Marker(el)
          .setLngLat([zone.lng, zone.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Add incident markers
      incidents.forEach((incident) => {
        const el = document.createElement('div');
        el.className = 'incident-marker';
        const color = incident.type === 'ice' ? '#dc2626' : '#f59e0b';
        el.style.cssText = `
          width: 24px;
          height: 24px;
          background-color: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          cursor: pointer;
          animation: pulse 2s infinite;
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="color: black; font-weight: bold;">${incident.type.toUpperCase()} Activity</div>
           <div style="color: #666; font-size: 12px;">Reported ${incident.time}</div>
           <div style="color: #666; font-size: 12px;">Severity: ${incident.severity}</div>`
        );

        new mapboxgl.Marker(el)
          .setLngLat([incident.lng, incident.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      setShowTokenInput(false);
      initializeMap(savedToken);
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full mx-4"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Setup Map</h2>
            <p className="text-gray-400 text-sm">
              Enter your Mapbox public token to display the detailed campus map
            </p>
          </div>
          
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <Button 
              onClick={handleTokenSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!mapboxToken.trim()}
            >
              Load Map
            </Button>
          </div>

          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-300">
              Get your free token at{' '}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                mapbox.com
              </a>
              <br />
              Look for "Access tokens" in your account dashboard.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur p-4 rounded-lg shadow-lg text-sm space-y-3 z-20">
        <div className="text-gray-800 font-bold text-lg mb-2">UCSD Campus</div>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
          <span className="text-gray-700">Safe Zones</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow"></div>
          <span className="text-gray-700">Police Activity</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow"></div>
          <span className="text-gray-700">ICE Activity</span>
        </div>
      </div>

      {/* Reset Token Button */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          onClick={() => {
            localStorage.removeItem('mapbox_token');
            setShowTokenInput(true);
            map.current?.remove();
          }}
          variant="secondary"
          size="sm"
          className="bg-white/90 text-gray-800 hover:bg-white"
        >
          Change Token
        </Button>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default MapComponent;
