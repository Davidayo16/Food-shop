import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationPicker = ({ onLocationSelect }) => {
  const [location, setLocation] = useState({
    lat: 6.458985, // Default latitude
    lng: 3.601521, // Default longitude
  });

  const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLocation({ lat, lng });
        onLocationSelect(lat, lng); // Send lat and lng to the parent form
      },
    });
    return null;
  };

  return (
    <div>
      <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: "300px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>Your location</Popup>
        </Marker>
        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
