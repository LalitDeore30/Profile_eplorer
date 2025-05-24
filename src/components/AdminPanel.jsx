import React, { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import Modal from "./Modal";
import "../styles/admin.css"

const AdminPanel = () => {
  const { profiles, addProfile, updateProfile, deleteProfile } = useContext(ProfileContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProfile, setEditProfile] = useState(null); // null = add new, else edit mode

  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    description: "",
    address: "",
    contact: "",
    interests: "",
  });

  const openAddModal = () => {
    setEditProfile(null);
    setFormData({
      name: "",
      photo: "",
      description: "",
      address: "",
      contact: "",
      interests: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (profile) => {
    setEditProfile(profile);
    setFormData({
      name: profile.name || "",
      photo: profile.photo || "",
      description: profile.description || "",
      address: profile.address || "",
      contact: profile.contact || "",
      interests: profile.interests || "",
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      alert("Please provide at least a name and address.");
      return;
    }

    if (editProfile) {
      updateProfile({ ...editProfile, ...formData });
    } else {
      addProfile(formData);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="admin-panel-container">
      <h2>Admin Panel - Manage Profiles</h2>
      <button className="btn-add" onClick={openAddModal}>
        + Add Profile
      </button>

      <div className="profiles-list">
        {profiles.map((profile) => (
          <div key={profile.id} className="profile-card-admin">
            <img src={profile.photo} alt={profile.name} className="profile-photo-admin" />
            <div>
              <h3>{profile.name}</h3>
              <p>{profile.description}</p>
              <div className="admin-buttons">
                <button onClick={() => openEditModal(profile)} className="btn-edit">
                  Edit
                </button>
                <button onClick={() => deleteProfile(profile.id)} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editProfile ? "Edit Profile" : "Add Profile"}
      >
        <form onSubmit={handleSubmit} className="admin-form">
          <label>
            Name *
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
          </label>

          <label>
            Photo URL
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="Enter photo URL"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description"
            />
          </label>

          <label>
            Address *
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Full address"
            />
          </label>

          <label>
            Contact
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Phone, email, etc."
            />
          </label>

          <label>
            Interests
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="Hobbies, skills, etc."
            />
          </label>

          <button type="submit" className="btn-submit">
            {editProfile ? "Update Profile" : "Add Profile"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPanel;
