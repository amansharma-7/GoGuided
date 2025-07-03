import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
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

  function handleAddSpot(e) {
    const { lat, lng } = e.latlng;
    setPendingSpot({ lat, lng });
    setTempDescription("");
    setLocationName("Fetching...");
    fetchLocationName(lat, lng);
    setShowModal(true);
  }

  async function fetchLocationName(lat, lng) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      const address = data.address;

      const primaryName =
        address?.city ||
        address?.town ||
        address?.village ||
        address?.hamlet ||
        address?.municipality ||
        address?.county ||
        address?.suburb ||
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
    // console.log("first");
    if (!pendingSpot) return;

    const newSpot = {
      ...pendingSpot,
      name: locationName,
      description: tempDescription.trim(),
      day: 1, // only one spot, so always day 1
    };

    setSpots([newSpot]); // Replace any existing spots

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

  function MapClickHandler() {
    useMapEvents({
      click: handleAddSpot,
    });
    return null;
  }

  function handleClose() {
    if (onConfirm) {
      onConfirm(spots);
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-0">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[75vh] flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Select Location</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
            title="Close"
          >
            <IoClose />
          </button>
        </div>

        {/* Map */}
        <div className="flex-1 relative min-h-[300px]">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="h-full w-full z-0"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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

      {/* Modal for Description Input */}
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
