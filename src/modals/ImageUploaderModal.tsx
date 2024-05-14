import { useState, useRef, useEffect } from "react";
import type { ImageUploaderModalProps } from "../interfaces/types";

const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  isOpen,
  onClose,
  onUpload
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("");
    }
    event.target.value = "";
  };

  const handleModalClose = () => {
    setImagePreviewUrl(null);
    setFileName("");
    onClose();
  };

  useEffect(() => {
    if (isOpen && labelRef.current) {
      labelRef.current.focus();
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="overlay" role="dialog" ref={modalRef} tabIndex={0}>
      <div className="glass-screen-modal">
        <div className="glass-screen-modal-line">
          <div className="glass-screen-modal-line-l"></div>
          <div className="glass-screen-modal-line-l"></div>
        </div>
        <div className="text-indication-modal">
          <div className="dot-matrix-modal">DOT MATRIX WITH STEREO SOUND</div>
          <div className="battery-text-modal">BATTERY</div>
          <div className="indicator-light-modal"></div>
        </div>
        <div className="glass-screen-matrix-modal">
          <div className="title-modal">{fileName || "Aucune image"}</div>
          <button className="upload-button inline">mes images en ligne</button>
          <input
            type="file"
            id="file"
            accept="image/*"
            className="file-input"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <label className="upload-button local" htmlFor="file" ref={labelRef}>
            mes images en local
          </label>
          {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" />}
          <button onClick={handleModalClose} className="close-button">
            Menu
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageUploaderModal;
