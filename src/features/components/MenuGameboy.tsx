import { useSelector, useDispatch } from "react-redux";
import type { MenuGameboyProps } from "../../interfaces/types";
import { memo, useEffect, useRef, useState } from "react";
import type { RootStateProps } from "../reducers/stores/store";
import {
  nextOption,
  previousOption,
  selectOption,
  resetToFirstOption
} from "../reducers/menugameboy/menuGameboySlice";
import { defaultImage } from "../../config/config";

const MenuItem = memo(
  ({
    name,
    onClick,
    onDoubleClick,
    isSelected
  }: {
    name: string;
    onClick: () => void;
    onDoubleClick: () => void;
    isSelected: boolean;
  }) => (
    <li
      className={isSelected ? "selected" : ""}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      style={{ userSelect: "none" }}
      draggable="false"
    >
      <span>{name}</span>
    </li>
  )
);

const MenuGameboy: React.FC<MenuGameboyProps> = ({ menuOptions }) => {
  const selectedOptionIndex = useSelector(
    (state: RootStateProps) => state.menuGameboy.selectedOptionIndex
  );

  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleConfirmSelection = () => {
    const selectedAction = menuOptions[selectedOptionIndex]?.action;
    selectedAction?.();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
        handleConfirmSelection();
        break;
      case "Escape":
        dispatch(resetToFirstOption());
        break;
      case "ArrowDown":
        dispatch(nextOption());
        break;
      case "ArrowUp":
        dispatch(previousOption());
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOptionIndex]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.backgroundImage = `url(${defaultImage})`;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="glass-screen-matrix-on"
      onClick={handleConfirmSelection}
      onKeyDown={() => {
        handleKeyDown;
      }}
      tabIndex={0}
    >
      <div className="menu-title">Use Pad or </div>
      <ul>
        {menuOptions.map((option, index) => (
          <MenuItem
            key={index}
            name={option.name}
            onClick={() => dispatch(selectOption(index))}
            onDoubleClick={() => handleConfirmSelection()}
            isSelected={selectedOptionIndex === index}
          />
        ))}
      </ul>
      <div className="menu-footer">Press A or ↵</div>
    </div>
  );
};

export default MenuGameboy;
