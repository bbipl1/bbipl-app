// MapComponent.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const CustomMap = () => {
  const position = [51.505, -0.09]; // Latitude and Longitude for the center of the map
  const [center, setCenter] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setCenter([lat, lng]);
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  }, []);

  return (
    <>
      {center && (
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={center}>
            <Popup>
              Prince pandey
              <br /> {center[0]},{center[1]}
            </Popup>
          </Marker>
        </MapContainer>
      )}
      <div>
        Lat:{center && center[0]}
        Lng:{center && center[1]}
      </div>
    </>
  );
};

export default CustomMap;
