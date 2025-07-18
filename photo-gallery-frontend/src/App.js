import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadForm from "./UploadForm";
import "./index.css"; // Make sure to create this and include styles

function App() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5001/api/photos")
      .then((res) => setPhotos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/photos/${id}`);
      setPhotos((prev) => prev.filter((photo) => photo._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>PHOTO GALLERY</h1>
      <h2>Store your liked images over here...</h2>

      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <UploadForm setPhotos={setPhotos} />

      <div className="photo-grid">
        {filteredPhotos.map((photo) => (
          <div className="photo-card" key={photo._id}>
            <img
              src={photo.imageUrl}
              alt={photo.title}
              onClick={() => setSelectedPhoto(photo)}
            />
            <h3>{photo.title}</h3>
            <p>{photo.description}</p>
            <p className="upload-time">
              Uploaded at: {new Date(photo.uploadedAt).toLocaleString()}
            </p>
            <button className="delete-btn" onClick={() => handleDelete(photo._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="modal" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto.imageUrl} alt={selectedPhoto.title} />
            <h2>{selectedPhoto.title}</h2>
            <p>{selectedPhoto.description}</p>
            <button className="close-btn" onClick={() => setSelectedPhoto(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;