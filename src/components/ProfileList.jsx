// src/components/ProfileList.jsx
import React, { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import Modal from "./Modal";
import ProfileDetails from "./ProfileDetails";
import MapView from "./MapView";
import "../styles/profile_list.css";

const ProfileList = () => {
  const { filteredProfiles, loading } = useContext(ProfileContext);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("details");
  const [coords, setCoords] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [geoError, setGeoError] = useState(false);

  const handleDetailsClick = (profile) => {
    setSelectedProfile(profile);
    setViewMode("details");
    setIsModalOpen(true);
  };

  const handleSummaryClick = async (profile) => {
    setSelectedProfile(profile);
    setViewMode("map");
    setIsFetching(true);
    setGeoError(false);
    setIsModalOpen(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(profile.address)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setCoords({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
      } else {
        setGeoError(true);
        setCoords(null);
      }
    } catch (err) {
      console.error("Geocoding failed:", err);
      setGeoError(true);
      setCoords(null);
    } finally {
      setIsFetching(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profiles...</div>;
  }

  return (
    <div className="profile-list-container">
      {filteredProfiles.length === 0 ? (
        <p className="no-profiles">No profiles found.</p>
      ) : (
        filteredProfiles.map((profile) => (
          <div key={profile.id} className="profile-card enhanced-card">
            <img src={profile.photo} alt={profile.name} className="profile-photo" />
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
            <div className="button-group">
              <button className="btn details-btn" onClick={() => handleDetailsClick(profile)}>
                View Details
              </button>
              <button className="btn summary-btn" onClick={() => handleSummaryClick(profile)}>
                Summary
              </button>
            </div>
          </div>
        ))
      )}

      {/* Modal for details or map */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedProfile && viewMode === "details" && (
          <ProfileDetails profile={selectedProfile} />
        )}

        {selectedProfile && viewMode === "map" && (
          <>
            {isFetching ? (
              <p className="loading-text">Fetching location...</p>
            ) : geoError ? (
              <p className="error-text">Location not found for the given address.</p>
            ) : (
              coords && (
                <MapView
                  lat={coords.lat}
                  lng={coords.lng}
                  name={selectedProfile.name}
                />
              )
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default ProfileList;
