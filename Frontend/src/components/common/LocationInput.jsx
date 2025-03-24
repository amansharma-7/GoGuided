import React, { useState } from "react";

export default function LocationInput({ value, onChange }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    onChange(inputValue);

    if (inputValue.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&addressdetails=1&limit=5`
        );
        const data = await response.json();
        setSuggestions(data.map((item) => item.display_name));
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Enter Location"
        className="w-full p-2 border border-green-400 rounded-md"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-green-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
