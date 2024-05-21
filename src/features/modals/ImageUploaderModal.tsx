import { useState, useRef, useEffect } from "react";
import type { ImageUploaderModalProps } from "../../interfaces/types";
import AsciiArtFilter from "../utils/filters/AsciiArtFilter";
import { TARGET_WIDTH, TARGET_HEIGHT } from "../../config/config";

/**
 * ImageUploaderModal est un composant React pour télécharger une image et appliquer un filtre ASCII art.
 * @param {ImageUploaderModalProps} props - Les propriétés du composant.
 * @param {boolean} props.isOpen - Indique si le modal est ouvert.
 * @param {() => void} props.onClose - Fonction pour fermer le modal.
 * @returns {JSX.Element | null} L'élément du modal.
 */
const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  isOpen,
  onClose
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [filteredImageUrl, setFilteredImageUrl] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
        setFilteredImageUrl(null); // Réinitialiser l'image filtrée
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("");
    }
    event.target.value = "";
  };

  const handleApplyFilter = () => {
    setFilteredImageUrl(imagePreviewUrl);
  };

  const handleModalClose = () => {
    setImagePreviewUrl(null);
    setFilteredImageUrl(null);
    setFileName("");
    onClose();
  };

  useEffect(() => {
    if (isOpen && labelRef.current) {
      labelRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (canvasRef.current && imagePreviewUrl && !filteredImageUrl) {
      const canvas = canvasRef.current!;
      const context = canvas.getContext("2d")!;
      const image = new Image();
      image.onload = () => {
        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;
        context.clearRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        context.drawImage(image, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);
      };
      image.src = imagePreviewUrl;
    }
  }, [imagePreviewUrl, filteredImageUrl]);

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
          <button className="upload-btn inline">mes images en ligne</button>
          <input
            type="file"
            id="file"
            accept="image/*"
            className="file-input"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <label className="upload-btn local" htmlFor="file" ref={labelRef}>
            mes images en local
          </label>
          <div className="whiteboard-container">
            <canvas
              className="whiteboard"
              width={1020}
              height={820}
              ref={canvasRef}
            ></canvas>
          </div>
          {filteredImageUrl && (
            <AsciiArtFilter imageSrc={filteredImageUrl} canvasRef={canvasRef} />
          )}
          <button onClick={handleApplyFilter} className="filter-btn">
            Filtrer
          </button>
          <button onClick={handleModalClose} className="close-btn">
            Menu
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageUploaderModal;
