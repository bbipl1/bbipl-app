import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const DynamicMap = ({ role, trackedUsers = [] }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [defaultCenter, setDefaultCenter] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setDefaultCenter([latitude, longitude]);
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (role === "user") {
      // Get the current user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [role]);

  return (
    <>
      {defaultCenter && (
        <MapContainer
          center={userLocation || defaultCenter} // Default center if no location is available
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* User View */}

          {role === "user" && userLocation ? (
            <>
              <Marker position={userLocation}>
                <Popup>
                  Your Location <br /> Lat: {userLocation[0]}, Lng:{" "}
                  {userLocation[1]}.
                </Popup>
              </Marker>
            </>
          ) : (
            <>
              {defaultCenter && (
                <Marker position={defaultCenter}>
                  <Popup>
                    Your Location <br /> Lat: {defaultCenter[0]}, Lng:{" "}
                    {defaultCenter[1]}.
                  </Popup>
                </Marker>
              )}
            </>
          )}

          {/* Admin View */}
          {role === "admin" &&
            trackedUsers.map((user, index) => (
              <Marker key={index} position={[user.lat, user.lng]}>
                <Popup>
                  {user.name} <br /> Lat: {user.lat}, Lng: {user.lng}.
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      )}
    </>
  );
};

export default DynamicMap;
