"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Custom marker icon (optional)
const markerIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapComponentProps {
  onSelect: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onSelect }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);

  // Fetch user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]); // Set map center to user location
          setMarkerPosition([latitude, longitude]); // Drop marker at user location
          onSelect(latitude, longitude); // Pass user location to parent component
        },
        (error) => {
          console.error("Geolocation error:", error);
          setUserLocation([37.7749, -122.4194]); // Default to San Francisco if denied
        },
        { enableHighAccuracy: true }
      );
    }
  }, [onSelect]);

  // Handle map click to select a new location
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        onSelect(lat, lng);
      },
    });
    return markerPosition ? <Marker position={markerPosition} icon={markerIcon} /> : null;
  }

  return userLocation ? (
    <MapContainer
      center={userLocation}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
      className="rounded-md shadow-md"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  ) : (
    <div className="text-center p-4 bg-gray-100 rounded-md">Loading map...</div>
  );
};

export default MapComponent;
