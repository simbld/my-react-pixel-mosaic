import React, { useState } from "react";

function ImageUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const response = await fetch("https://your-backend-url.com/upload", {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle successful upload here, e.g. by updating state or navigating to another page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={uploadImage} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default ImageUpload;
