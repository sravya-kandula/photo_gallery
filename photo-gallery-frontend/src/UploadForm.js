import React, { useState } from "react";
import axios from "axios";

function UploadForm({ setPhotos }) {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    if (!imageUrl || !title || !description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/photos/upload", {
        imageUrl,
        title,
        description,
      });
      setPhotos((prev) => [res.data, ...prev]);
      setImageUrl("");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{ width: "200px", marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "150px", marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "200px", marginRight: "10px" }}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadForm;
