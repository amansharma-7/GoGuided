import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";

// ✅ Green Marker Icon (Default)
const greenIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// ✅ start and end Marker Icon (For Day 1 / Day 7)
const startIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png", // Use blue (close to teal)
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// ✅ Function to Calculate Midpoint & Correct Bearing
const calculateMidpointAndBearing = (pos1, pos2) => {
  const [lat1, lon1] = pos1;
  const [lat2, lon2] = pos2;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const toDeg = (rad) => (rad * 180) / Math.PI;

  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const λ1 = toRad(lon1);
  const λ2 = toRad(lon2);

  // Midpoint calculation
  const midLat = (lat1 + lat2) / 2;
  const midLon = (lon1 + lon2) / 2;

  // Vincenty's bearing calculation
  const Δλ = λ2 - λ1;
  const X = Math.cos(φ2) * Math.sin(Δλ);
  const Y =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  let bearing = toDeg(Math.atan2(X, Y));

  // Normalize bearing to be within 0 - 360 degrees
  bearing = (bearing + 360) % 360;
  bearing = (bearing - 90 + 360) % 360;

  return { midpoint: [midLat, midLon], bearing };
};

// ✅ Component to Handle Marker Click (Zoom) & Show Popup on Hover
function ZoomToMarker({ position, label, day, isSpecial }) {
  const map = useMap();
  const markerRef = useRef(null);

  const handleClick = () => {
    map.setView(position, 14);
  };

  const handleMouseOver = () => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  };

  const handleMouseOut = () => {
    if (markerRef.current) {
      markerRef.current.closePopup();
    }
  };

  return (
    <Marker
      ref={markerRef}
      position={position}
      eventHandlers={{
        click: handleClick,
        mouseover: handleMouseOver,
        mouseout: handleMouseOut,
      }}
      icon={isSpecial ? startIcon : greenIcon} // 🔴 Red for Day 1 / Day 7, 🟢 Green for others
    >
      <Popup autoClose={true}>
        <span className="font-bold text-black">
          {day} - {label}
        </span>
      </Popup>
    </Marker>
  );
}

// ✅ Main Map Component
function Map() {
  const locations = [
    {
      day: "Day 1 / Day 7",
      task: "Airport Pick Up / Return Home",
      position: [33.9877, 74.7749],
      isSpecial: true, // 🔴 Red Marker
    },
    {
      day: "Day 2",
      task: "Visit Shankaracharya Temple & Dal Lake Cruise",
      position: [34.0837, 74.7973],
      isSpecial: false,
    },
    {
      day: "Day 3",
      task: "Massage & Explore Mughal Gardens",
      position: [34.0912, 74.8398],
      isSpecial: false,
    },
    {
      day: "Day 4",
      task: "Excursion to Gulmarg",
      position: [34.0486, 74.3805],
      isSpecial: false,
    },
    {
      day: "Day 5",
      task: "Travel to Pahalgam",
      position: [34.015, 75.315],
      isSpecial: false,
    },
    {
      day: "Day 6",
      task: "Explore Betaab Valley & Lidder River",
      position: [34.0595, 75.3206],
      isSpecial: false,
    },
  ];

  return (
    <div className="relative p-2 w-[70%] z-0">
      <MapContainer
        center={[34.0837, 74.7973]}
        zoom={10}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* ✅ Green & Red Markers with Popups on Hover */}
        {locations.map((loc, index) => (
          <ZoomToMarker
            key={index}
            position={loc.position}
            label={loc.task}
            day={loc.day}
            isSpecial={loc.isSpecial}
          />
        ))}

        {/* ✅ Dotted Polyline with Correct Arrow Direction */}
        {[...locations, locations[0]].slice(0, -1).map((loc, index) => {
          const nextLoc = locations[index + 1] || locations[0]; // Loop back to first location
          const { midpoint, bearing } = calculateMidpointAndBearing(
            loc.position,
            nextLoc.position
          );

          return (
            <div key={index}>
              {/* ✅ Green Dotted Path */}
              <Polyline
                positions={[loc.position, nextLoc.position]}
                pathOptions={{
                  color: "#22c55e",
                  weight: 2,
                  dashArray: "5, 10",
                }} // Green Dotted Line
              />

              {/* ✅ Arrow at Midpoint with Correct Rotation */}
              <Marker
                position={midpoint}
                icon={L.divIcon({
                  className: "custom-arrow",
                  html: `<div style="font-size: 24px; color: #22c55e; transform: rotate(${bearing}deg);">➤</div>`,
                  iconSize: [15, 15],
                  iconAnchor: [7, 18],
                })}
              />
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
