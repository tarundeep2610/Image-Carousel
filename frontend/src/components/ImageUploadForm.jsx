import axios from "axios";
import React, { useRef, useState } from "react";

function ImageUploadForm({ setIsOpen, fetchImages }) {
  const [title, setTitle] = useState(""); // State for the image title
  const [desc, setDesc] = useState(""); // State for the image description
  const [image, setImage] = useState(null); // State for the image file
  const uploadInput = useRef(); // Reference to the file input element

  const baseUrl = "http://127.0.0.1:3000";

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Update title state on input change
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Update image state on file input change
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value); // Update description state on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("desc", desc);

    setIsOpen(false);
    try {
      const response = await axios.post(`${baseUrl}/api/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setTitle("");
        setDesc("");
        setImage(null);
        fetchImages(); // Fetch updated list of images
        uploadInput.current.value = null; // Reset file input
      } else {
        console.error("Error uploading image:", data.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          value={desc}
          onChange={handleDescChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          ref={uploadInput}
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Upload
      </button>
    </form>
  );
}

export default ImageUploadForm;
