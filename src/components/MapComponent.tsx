
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Mock map data for UCSD campus
const safeZones = [
  { id: 1, name: "Student Health Center", lat: 32.8801, lng: -117.2340, type: "medical" },
  { id: 2, name: "Campus Police Station", lat: 32.8823, lng: -117.2348, type: "police" },
  { id: 3, name: "International Center", lat: 32.8850, lng: -117.2380, type: "support" },
  { id: 4, name: "Library", lat: 32.8747, lng: -117.2377, type: "public" }
];

const incidents = [
  { id: 1, lat: 32.8790, lng: -117.2350, type: "police", severity: "medium", time: "5m ago" },
  { id: 2, lat: 32.8820, lng: -117.2400, type: "ice", severity: "high", time: "15m ago" }
];

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute inset-0 bg-gray-800">
      <div ref={mapRef} className="w-full h-full relative">
        {/* Demo Map Interface */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900">
          {/* UCSD Campus Mock Layout */}
          <div className="absolute inset-0 p-8">
            {/* Safe Zones */}
            {safeZones.map((zone) => (
              <motion.div
                key={zone.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: Math.random() * 0.5 }}
                className="absolute w-4 h-4 bg-green-500 rounded-full shadow-lg cursor-pointer"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                title={`Safe Zone: ${zone.name}`}
              >
                <div className="w-8 h-8 bg-green-500/30 rounded-full absolute -inset-2 animate-pulse" />
              </motion.div>
            ))}

            {/* Incident Markers */}
            {incidents.map((incident) => (
              <motion.div
                key={incident.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: Math.random() * 0.5 }}
                className={`absolute w-5 h-5 rounded-full shadow-lg cursor-pointer ${
                  incident.type === 'ice' ? 'bg-red-600' : 'bg-orange-500'
                }`}
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`,
                }}
                title={`${incident.type.toUpperCase()} Activity - ${incident.time}`}
              >
                <div className={`w-10 h-10 rounded-full absolute -inset-2.5 animate-ping ${
                  incident.type === 'ice' ? 'bg-red-600/40' : 'bg-orange-500/40'
                }`} />
              </motion.div>
            ))}

            {/* Campus Buildings (Mock) */}
            <div className="absolute left-1/3 top-1/3 w-16 h-12 bg-gray-600 rounded shadow-lg">
              <div className="text-xs text-white p-1 text-center">Library</div>
            </div>
            <div className="absolute left-1/2 top-1/4 w-20 h-16 bg-gray-600 rounded shadow-lg">
              <div className="text-xs text-white p-1 text-center">Student Center</div>
            </div>
            <div className="absolute left-2/3 top-1/2 w-14 h-10 bg-gray-600 rounded shadow-lg">
              <div className="text-xs text-white p-1 text-center">Health</div>
            </div>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur p-3 rounded-lg text-white text-xs space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Safe Zones</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Police Activity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span>ICE Activity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
