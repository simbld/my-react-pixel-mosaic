import { useState, useRef } from "react";
import type { ImageUploaderModalProps } from "../interfaces/types";

const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  isOpen,
  onClose,
  onUpload
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onUpload(file); // Assuming onUpload might be used to handle the file outside the modal.
    }
  };

  const handleModalClose = () => {
    setImagePreviewUrl(null); // Clear the preview when closing the modal.
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Upload Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "block", margin: "20px 0" }}
        />
        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Preview"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
        <button onClick={onClose} className="closeButton">
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageUploaderModal;
