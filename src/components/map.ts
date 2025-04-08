import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  reconnection: true,
});

const Map = ({ role }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [bikerMarker, setBikerMarker] = useState(null);
  const [customerMarker, setCustomerMarker] = useState(null);

  // Initialize Google Maps
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyCsHTOq3khjfbKGU4_KYuzZSVViaqjdiMQ',
      version: 'weekly',
    });

    loader.load().then(() => {
      const googleMap = new google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 12,
      });

      const biker = new google.maps.Marker({
        map: googleMap,
        title: 'Biker',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      });

      const customer = new google.maps.Marker({
        map: googleMap,
        title: 'Customer',
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      });

      setMap(googleMap);
      setBikerMarker(biker);
      setCustomerMarker(customer);
    });
  }, []);

  // Handle Socket.IO and Geolocation
  useEffect(() => {
    if (!role) return;

    socket.emit('join', role);
    socket.emit('setRole', role);

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            socket.emit('updateLocation', location);
            if (map) map.setCenter(location);
          },
          (error) => {
            console.error('Geolocation error:', error);
          }
        );
      }
    };

    socket.on('bikerLocation', (location) => {
      if (location && bikerMarker) {
        bikerMarker.setPosition(location);
        console.log('Biker location updated:', location);
      }
    });

    socket.on('customerLocation', (location) => {
      if (location && customerMarker) {
        customerMarker.setPosition(location);
        console.log('Customer location updated:', location);
      }
    });

    const interval = setInterval(updateLocation, 5000);

    return () => {
      clearInterval(interval);
      socket.off('bikerLocation');
      socket.off('customerLocation');
    };
  }, [role, map, bikerMarker, customerMarker]);

  return (
    <div>
      <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
    </div>
  );
};

export default Map;
