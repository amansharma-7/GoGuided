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

function MapPicker({ initialSpots = [], onClose, onConfirm }) {
  const [spots, setSpots] = useState(initialSpots);
  const [pendingSpot, setPendingSpot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tempDescription, setTempDescription] = useState("");
  const [locationName, setLocationName] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // Handle map click
  function handleAddSpot(e) {
    const { lat, lng } = e.latlng;
    setPendingSpot({ lat, lng });
    setTempDescription("");
    setLocationName("Fetching...");
    fetchLocationName(lat, lng);
    setShowModal(true);
  }

  // Reverse geocoding
  async function fetchLocationName(lat, lng) {
    try {
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

      const placeName = secondaryName
        ? `${primaryName}, ${secondaryName}`
        : primaryName;

      setLocationName(placeName);
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Unknown Location");
    }
  }

  function confirmAddSpot() {
    if (!pendingSpot) return;
    const newSpot = {
      ...pendingSpot,
      name: locationName,
      description: tempDescription.trim(),
      day: 1,
    };
    setSpots([newSpot]);
    resetModalState();
  }

  function cancelAddSpot() {
    resetModalState();
  }

  function resetModalState() {
    setShowModal(false);
    setPendingSpot(null);
    setLocationName("");
    setTempDescription("");
  }

  function handleDeleteSpot() {
    setSpots([]);
  }

  function handleClose() {
    if (onConfirm) {
      onConfirm(spots);
    }
    onClose();
  }

  function MapClickHandler() {
    useMapEvents({
      click: handleAddSpot,
    });
    return null;
  }

  // ✅ Pans map when search result updates
  function MapSearchHandler({ searchResult }) {
    const map = useMap();

    useEffect(() => {
      if (searchResult) {
        map.setView([searchResult.lat, searchResult.lng], 9);
      }
    }, [searchResult, map]);

    return null;
  }

  // ✅ SearchBox in Header (not inside map)
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
            onClick={handleClose}
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
            {spots.length === 1 && (
              <Marker position={[spots[0].lat, spots[0].lng]}>
                <Popup>
                  <div>
                    <strong>{spots[0].name}</strong>
                    <p className="text-sm mb-1">{spots[0].description}</p>
                    <button
                      onClick={handleDeleteSpot}
                      className="text-red-500 hover:underline mt-2 block"
                    >
                      Delete
                    </button>
                  </div>
                </Popup>
              </Marker>
            )}
            <MapClickHandler />
          </MapContainer>
        </div>
      </div>

      {/* Description Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg space-y-4 w-full max-w-xs sm:max-w-md">
            <h2 className="text-lg font-semibold">Add Location</h2>
            <p className="text-sm text-gray-600">{locationName}</p>
            <textarea
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full px-3 py-2 border border-gray-300 rounded resize-none"
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelAddSpot}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddSpot}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapPicker;
