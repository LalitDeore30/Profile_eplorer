import React, { useState, useContext, useEffect } from "react";
import { ProfileContext } from "../context/ProfileContext";
import "../styles/search.css"

const SearchFilter = () => {
  const { profiles, setFilteredProfiles } = useContext(ProfileContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm.trim()) {
      // No search term — show all profiles
      setFilteredProfiles(profiles);
      return;
    }

    // Filter profiles by name or location (case-insensitive)
    const filtered = profiles.filter((profile) => {
      const nameMatch = profile.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const locationMatch = profile.address
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return nameMatch || locationMatch;
    });

    setFilteredProfiles(filtered);
  }, [searchTerm, profiles, setFilteredProfiles]);

  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Search by name or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchFilter;
