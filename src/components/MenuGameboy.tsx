import { useSelector, useDispatch } from "react-redux";
import type { MenuGameboyProps } from "../interfaces/types";
import { memo, useEffect, useRef, useState } from "react";
import type { RootState } from "../features/reducers/stores/store";
import {
  nextOption,
  previousOption,
  selectOption,
  resetToFirstOption
} from "../features/reducers/menugameboy/menuGameboySlice";
import { defaultImage } from "../config/config";

const MenuItem = memo(
  ({
    name,
    onSelect,
    isSelected
  }: {
    name: string;
    onSelect: () => void;
    isSelected: boolean;
  }) => (
    <li className={isSelected ? "selected" : ""} onClick={onSelect}>
      <span>{name}</span>
    </li>
  )
);

const MenuGameboy: React.FC<MenuGameboyProps> = ({
  onUploadImage,
  onChooseFilter,
  onDisplaySettings,
  onDownloadImage
}) => {
  const imageUrl = useSelector((state: RootState) => state.imageProcessing.url);
  const selectedOptionIndex = useSelector(
    (state: RootState) => state.menuGameboy.selectedOptionIndex
  );

  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuOptions = [
    {
      name: "open file",
      action: onUploadImage
    },
    {
      name: "filters",
      action: onChooseFilter
    },
    {
      name: "settings",
      action: onDisplaySettings
    },
    {
      name: "download",
      action: onDownloadImage
    }
  ];

  const handleBackAction = () => {
    dispatch(resetToFirstOption());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowDown":
        dispatch(nextOption());
        break;
      case "ArrowUp":
        dispatch(previousOption());
        break;
      case "Enter":
        menuOptions[selectedOptionIndex]?.action();
        break;
      case "Escape":
      case "b": // Supposons que 'b' est pour le bouton B
        handleBackAction();
        break;
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.backgroundImage = `url(${defaultImage})`;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="glass-screen-matrix-on"
      onKeyDown={handleKeyDown}
      onBlur={() => containerRef.current?.focus()}
      tabIndex={0}
    >
      <div className="menu-title">Use Pad or </div>
      <ul>
        {menuOptions.map((option, index) => (
          <MenuItem
            key={index}
            name={option.name}
            onSelect={() => dispatch(selectOption(index))}
            isSelected={selectedOptionIndex === index}
          />
        ))}
      </ul>
      <div className="menu-footer">Press A or ↵</div>
    </div>
  );
};

export default MenuGameboy;
