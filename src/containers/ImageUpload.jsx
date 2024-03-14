import { useState } from "react";

function ImageUpload({ onImageReady }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError("No file selected.");
      return;
    }

    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setLoading(false);
      onImageReady(event.target.result);
    };
    reader.onerror = (error) => {
      setLoading(false);
      setError("Failed to read file.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default ImageUpload;
