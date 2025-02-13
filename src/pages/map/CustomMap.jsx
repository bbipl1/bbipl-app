import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";

// Prevent Leaflet missing icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const serverURL = process.env.REACT_APP_SERVER_URL;
const socket = io(serverURL, { transports: ["websocket"] });

const DynamicMap = ({ role, userId, userName }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [trackedUsers, setTrackedUsers] = useState({});
  const [defaultCenter, setDefaultCenter] = useState([20.5937, 78.9629]); // Default to India

  useEffect(() => {
    // Start watching the user's location
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setDefaultCenter([latitude, longitude]); // Update the center position
        const location = { lat: latitude, lng: longitude };

        // Send user location update to the server
        socket.emit("updateLocation", { userId, name: userName, location });
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      { enableHighAccuracy: true }
    );

    // Listen for updates from other users
    socket.on("usersLocation", (updatedUsers) => {
      setTrackedUsers(
        updatedUsers.reduce(
          (acc, user) => ({ ...acc, [user.userId]: user }), // Store users in an object for fast lookup
          {}
        )
      );
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [userId, userName]);

  return (
    <>
      {userLocation && defaultCenter && (
        <MapContainer center={userLocation} zoom={13} style={{ height: "100vh", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User Marker */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>
                Your Location <br /> Lat: {userLocation[0]}, Lng: {userLocation[1]}.
              </Popup>
            </Marker>
          )}

          {/* Tracked Users (Admin or User View) */}
          {Object.values(trackedUsers).map((user) => (
            <Marker key={user.userId} position={[user.location.lat, user.location.lng]}>
              <Popup>
                {user.name} <br /> Lat: {user.location.lat}, Lng: {user.location.lng}.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
};

export default DynamicMap;
