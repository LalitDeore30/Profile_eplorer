// src/context/ProfileContext.jsx
import React, { createContext, useState, useEffect } from "react";
import mockProfiles from "../data/mockProfiles";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    // Simulate fetch delay
    setTimeout(() => {
      setProfiles(mockProfiles);
      setFilteredProfiles(mockProfiles);
      setLoading(false);
    }, 0);
  }, []);

  // Add a new profile
  const addProfile = (newProfile) => {
    const newEntry = { ...newProfile, id: Date.now() };
    setProfiles((prev) => [...prev, newEntry]);
    setFilteredProfiles((prev) => [...prev, newEntry]);
  };

  // Edit a profile
  const editProfile = (updatedProfile) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
    );
    setFilteredProfiles((prev) =>
      prev.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
    );
  };

  // Delete a profile
  const deleteProfile = (id) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    setFilteredProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        filteredProfiles,
        setFilteredProfiles,
        loading,
        selectedProfile,
        setSelectedProfile,
        addProfile,
        editProfile,
        updateProfile: editProfile, 
        deleteProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
