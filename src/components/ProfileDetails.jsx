import React, { useEffect, useState } from "react";
import MapView from "./MapView";
import "../styles/profile_details.css";

const ProfileDetails = ({ profile }) => {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geoError, setGeoError] = useState(false);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(profile.address)}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setCoords({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
        } else {
          setGeoError(true);
        }
      } catch (error) {
        console.error("Geocoding failed:", error);
        setGeoError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [profile.address]);

  return (
    <div className="profile-details">
      <h2>{profile.name}</h2>
      <img src={profile.photo} alt={profile.name} className="profile-details-photo" />
      <p><strong>Description:</strong> {profile.description}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      <p><strong>Contact:</strong> {profile.contact}</p>
      <p><strong>Interests:</strong> {profile.interests.join(", ")}</p>

      {loading ? (
        <p className="loading-text">Locating address on map...</p>
      ) : geoError ? (
        <p className="error-text">Unable to find location for this address.</p>
      ) : (
        coords && <MapView lat={coords.lat} lng={coords.lng} />
      )}
    </div>
  );
};

export default ProfileDetails;
