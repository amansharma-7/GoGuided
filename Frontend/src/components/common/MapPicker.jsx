import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { IoClose } from "react-icons/io5";

// Fix marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapPicker({ initialSpots = [], onClose, onConfirm, description }) {
  const [spots, setSpots] = useState(initialSpots);
  const [searchResult, setSearchResult] = useState(null);

  // Handle map click: fetch location and confirm immediately
  async function handleAddSpot(e) {
    const { lat, lng } = e.latlng;

    try {
      // const name = await fetchLocationName(lat, lng);
      const spot = {
        lat,
        lng,
        name: `${lat},${lng}`,
        description,
      };
      setSpots([spot]);
      if (onConfirm) onConfirm([spot]);
      onClose();
    } catch (error) {
      console.error("Error selecting location:", error);
    }
  }

  async function fetchLocationName(lat, lng) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    const address = data.address;

    const primaryName =
      address?.neighbourhood ||
      address?.residential ||
      address?.locality ||
      address?.quarter ||
      address?.suburb ||
      address?.hamlet ||
      address?.village ||
      address?.town ||
      address?.city ||
      address?.municipality ||
      address?.county ||
      "Unknown Location";

    const secondaryName =
      address?.state ||
      address?.state_district ||
      address?.region ||
      address?.country ||
      "";

    return secondaryName ? `${primaryName}, ${secondaryName}` : primaryName;
  }

  function MapClickHandler() {
    useMapEvents({
      click: handleAddSpot,
    });
    return null;
  }

  function MapSearchHandler({ searchResult }) {
    const map = useMap();

    useEffect(() => {
      if (searchResult) {
        map.setView([searchResult.lat, searchResult.lng], 9);
      }
    }, [searchResult, map]);

    return null;
  }

  function SearchBox({ onResult }) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSearch(e) {
      e.preventDefault();
      if (!query) return;

      setLoading(true);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&limit=1`
        );
        const results = await response.json();
        if (results.length > 0) {
          const { lat, lon } = results[0];
          const latNum = parseFloat(lat);
          const lonNum = parseFloat(lon);

          onResult({ lat: latNum, lng: lonNum });
        } else {
          alert("No results found.");
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }

    return (
      <form onSubmit={handleSearch} className="flex gap-2 items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search location..."
          className="px-2 py-1 border border-gray-300 rounded text-sm w-64"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "..." : "Go"}
        </button>
      </form>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-0">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[75vh] flex flex-col relative overflow-hidden">
        {/* Header with Search */}
        <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
            <h2 className="text-xl font-bold whitespace-nowrap">
              Select Location
            </h2>
            <SearchBox
              onResult={({ lat, lng }) => {
                setSearchResult({ lat, lng });
              }}
            />
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer self-start sm:self-center"
            title="Close"
          >
            <IoClose />
          </button>
        </div>

        {/* Map Section */}
        <div className="flex-1 relative min-h-[300px]">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="h-full w-full z-0 relative"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapSearchHandler searchResult={searchResult} />
            <MapClickHandler />
            {spots.length === 1 && (
              <Marker position={[spots[0].lat, spots[0].lng]}>
                <Popup>
                  <strong>{spots[0].name}</strong>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default MapPicker;
