
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
  const [mapboxToken] = useState('pk.eyJ1IjoiemFsaTEiLCJhIjoiY21iYTdmMzQzMHlyaDJtb2RxM3hobGdvYSJ9.ps3ojvR2-xQopxq6NwRt4A');

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

  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

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

      <style>{`
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
