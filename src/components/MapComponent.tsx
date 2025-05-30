
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Real UCSD campus safe zones with approximate coordinates
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

// UCSD campus buildings for reference
const campusBuildings = [
  { name: "Geisel Library", x: 45, y: 40 },
  { name: "Student Center", x: 35, y: 30 },
  { name: "Health Center", x: 60, y: 50 },
  { name: "Warren College", x: 25, y: 60 },
  { name: "Sixth College", x: 70, y: 25 },
  { name: "Price Center", x: 40, y: 55 },
  { name: "CSE Building", x: 55, y: 35 },
  { name: "Pepper Canyon", x: 50, y: 70 }
];

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute inset-0 bg-gray-800">
      <div ref={mapRef} className="w-full h-full relative">
        {/* UCSD Campus Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900">
          
          {/* Campus boundary outline */}
          <div className="absolute inset-8 border-2 border-gray-600/30 rounded-lg">
            
            {/* Campus roads/paths */}
            <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-600/40"></div>
            <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-600/40"></div>
            <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-gray-600/40"></div>
            <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-gray-600/40"></div>

            {/* Campus Buildings */}
            {campusBuildings.map((building, index) => (
              <div
                key={index}
                className="absolute bg-gray-600 rounded shadow-lg text-xs text-white p-1 text-center"
                style={{
                  left: `${building.x}%`,
                  top: `${building.y}%`,
                  width: building.name.includes('Library') || building.name.includes('Center') ? '60px' : '45px',
                  height: building.name.includes('Library') || building.name.includes('Center') ? '40px' : '30px',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="text-[8px] leading-tight">{building.name}</div>
              </div>
            ))}

            {/* Safe Zones */}
            {safeZones.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="absolute w-4 h-4 bg-green-500 rounded-full shadow-lg cursor-pointer z-10"
                style={{
                  left: `${15 + (index % 3) * 25 + Math.random() * 10}%`,
                  top: `${20 + Math.floor(index / 3) * 30 + Math.random() * 10}%`,
                }}
                title={`Safe Zone: ${zone.name}`}
              >
                <div className="w-8 h-8 bg-green-500/30 rounded-full absolute -inset-2 animate-pulse" />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-green-400 whitespace-nowrap">
                  {zone.name}
                </div>
              </motion.div>
            ))}

            {/* Incident Markers */}
            {incidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.3 }}
                className={`absolute w-5 h-5 rounded-full shadow-lg cursor-pointer z-10 ${
                  incident.type === 'ice' ? 'bg-red-600' : 'bg-orange-500'
                }`}
                style={{
                  left: `${40 + index * 20}%`,
                  top: `${45 + index * 10}%`,
                }}
                title={`${incident.type.toUpperCase()} Activity - ${incident.time}`}
              >
                <div className={`w-10 h-10 rounded-full absolute -inset-2.5 animate-ping ${
                  incident.type === 'ice' ? 'bg-red-600/40' : 'bg-orange-500/40'
                }`} />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-red-400 whitespace-nowrap">
                  {incident.type.toUpperCase()} - {incident.time}
                </div>
              </motion.div>
            ))}

            {/* Campus landmarks */}
            <div className="absolute left-1/2 top-1/4 transform -translate-x-1/2 text-blue-400 text-xs font-bold">
              ⭐ Geisel Library
            </div>
            <div className="absolute left-1/3 top-1/2 transform -translate-x-1/2 text-blue-400 text-xs font-bold">
              🏥 Health Center
            </div>
            <div className="absolute right-1/4 bottom-1/3 transform translate-x-1/2 text-blue-400 text-xs font-bold">
              🏫 Price Center
            </div>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur p-4 rounded-lg text-white text-sm space-y-3 z-20">
            <div className="text-blue-400 font-bold text-lg mb-2">UCSD Campus</div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Safe Zones</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span>Police Activity</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span>ICE Activity</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
              <span>Campus Buildings</span>
            </div>
          </div>

          {/* Campus Info */}
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur p-3 rounded-lg text-white text-sm z-20">
            <div className="text-blue-400 font-bold">UC San Diego</div>
            <div className="text-xs text-gray-300">La Jolla Campus</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
