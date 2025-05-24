import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";


const MapView = ({ lat, lng }) => {
  return (
    <div style={{ height: "300px", width: "100%", marginTop: "1rem" }}>
      <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={L.icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
          <Popup>{`Location for profile`}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
