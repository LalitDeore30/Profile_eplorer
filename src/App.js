import React, { useState } from "react";
import { ProfileProvider } from "./context/ProfileContext";
import ProfileList from "./components/ProfileList";
import ProfileDetails from "./components/ProfileDetails";
import MapView from "./components/MapView";
import AdminPanel from "./components/AdminPanel";
import SearchFilter from "./components/SearchFilter";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

function App() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [mapAddress, setMapAddress] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Handler when "Summary" button clicked in profile card
  const handleShowMap = (address) => {
    setMapAddress(address);
    setShowMap(true);
  };

  // Handler when profile card clicked for details
  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    setShowMap(false); // hide map if open
  };

  return (
    <ProfileProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Profile Explorer</h1>
          <nav>
            <button
              onClick={() => {
                setShowAdmin(false);
                setSelectedProfile(null);
                setShowMap(false);
              }}
              className={!showAdmin ? "active" : ""}
            >
              Profiles
            </button>
            <button
              onClick={() => {
                setShowAdmin(true);
                setSelectedProfile(null);
                setShowMap(false);
              }}
              className={showAdmin ? "active" : ""}
            >
              Admin Panel
            </button>
          </nav>
        </header>

        <main>
          {loading && <LoadingSpinner />}

          {!showAdmin && (
            <>
              <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <ProfileList
                onProfileClick={handleSelectProfile}
                onSummaryClick={handleShowMap}
                searchTerm={searchTerm}
              />
              {selectedProfile && <ProfileDetails />}
              {showMap && mapAddress && <MapView address={mapAddress} />}
            </>
          )}

          {showAdmin && <AdminPanel />}
        </main>

        <footer className="app-footer">
          <p>© 2025 Profile Explorer App</p>
        </footer>
      </div>
    </ProfileProvider>
  );
}

export default App;
