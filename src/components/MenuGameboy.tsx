import { useState } from "react";
import type { MenuGameboyProps } from "../interfaces/types";

const MenuGameboy: React.FC<MenuGameboyProps> = ({
  onUploadImage,
  onChooseFilter,
  onDisplayOptions,
  onDownloadImage
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  const menuOptions = [
    { name: "upload my image", action: onUploadImage },
    { name: "choose my filter", action: onChooseFilter },
    { name: "display options", action: onDisplayOptions },
    { name: "download my filtered image", action: onDownloadImage }
  ];

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      setSelectedOptionIndex(
        (prevIndex) => (prevIndex + 1) % menuOptions.length
      );
    } else if (event.key === "ArrowUp") {
      setSelectedOptionIndex(
        (prevIndex) => (prevIndex - 1 + menuOptions.length) % menuOptions.length
      );
    } else if (event.key === "Enter") {
      menuOptions[selectedOptionIndex].action();
    }
  };

  return (
    <div className="glass-screen-matrix" tabIndex={0} onKeyDown={handleKeyDown}>
      <ul>
        {menuOptions.map((option, index) => (
          <li
            key={index}
            className={selectedOptionIndex === index ? "selected" : ""}
            onClick={option.action}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuGameboy;
