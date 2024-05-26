import { useState, useRef, useEffect } from "react";
import type { ImageUploaderModalProps } from "../../interfaces/types";
import AsciiArtFilter from "../utils/filters/AsciiArtFilter";
import {
  TARGET_WIDTH,
  TARGET_HEIGHT,
  densityExtended,
  densitySimple,
  densityDot
} from "../../config/config";
import Loader from "../common/Loader";
import "./loader.less"; // Assure-toi d'importer le fichier LESS

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
  const [density, setDensity] = useState<string>(densityExtended);
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Gère le changement de l'image sélectionnée.
   * @param {React.ChangeEvent<HTMLInputElement>} event - L'événement de changement de l'input file.
   */
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setIsLoading(true);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImagePreviewUrl(reader.result as string);
        setFilteredImageUrl(null); // Réinitialiser l'image filtrée
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("");
    }
    event.target.value = "";
  };

  /**
   * Applique le filtre ASCII à l'image sélectionnée.
   */
  const handleApplyFilter = () => {
    setIsLoading(true);
    setFilteredImageUrl(imagePreviewUrl);
  };

  /**
   * Change la densité utilisée pour le filtre ASCII.
   * @param {string} newDensity - La nouvelle densité à appliquer.
   */
  const handleDensityChange = (newDensity: string) => {
    setDensity(newDensity);
    setFilteredImageUrl(imagePreviewUrl); // Réappliquer le filtre avec la nouvelle densité
  };

  /**
   * Ferme la modal et réinitialise l'état.
   */
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
        const imgWidth = image.width;
        const imgHeight = image.height;
        const aspectRatio = imgWidth / imgHeight;

        let drawWidth = TARGET_WIDTH;
        let drawHeight = TARGET_HEIGHT;

        if (TARGET_WIDTH / TARGET_HEIGHT > aspectRatio) {
          drawWidth = TARGET_HEIGHT * aspectRatio;
        } else {
          drawHeight = TARGET_WIDTH / aspectRatio;
        }

        const offsetX = (TARGET_WIDTH - drawWidth) / 2;
        const offsetY = (TARGET_HEIGHT - drawHeight) / 2;

        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;

        context.clearRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      };
      image.src = imagePreviewUrl;
    }
  }, [imagePreviewUrl, filteredImageUrl]);

  useEffect(() => {
    if (filteredImageUrl) {
      setIsLoading(false);
    }
  }, [filteredImageUrl]);

  return isOpen ? (
    <div className="overlay" role="dialog" ref={modalRef} tabIndex={0}>
      {isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
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
            <>
              <AsciiArtFilter
                imageSrc={filteredImageUrl}
                canvasRef={canvasRef}
                density={density}
                onFilterComplete={() => setIsLoading(false)} // Callback pour terminer le chargement
              />
              <div className="density-buttons">
                <button onClick={() => handleDensityChange(densityExtended)}>
                  Extended
                </button>
                <button onClick={() => handleDensityChange(densitySimple)}>
                  Simple
                </button>
                <button onClick={() => handleDensityChange(densityDot)}>
                  Dot
                </button>
              </div>
            </>
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
