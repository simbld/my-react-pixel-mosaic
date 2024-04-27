import { useSelector, useDispatch } from "react-redux";
import type { MenuGameboyProps } from "../interfaces/types";
import { memo, useEffect, useRef, useState } from "react";
import type { RootState } from "../features/reducers/stores/store";
import {
  nextOption,
  previousOption,
  selectOption
} from "../features/reducers/menugameboy/menuGameboySlice";

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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="glass-screen-matrix-on"
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
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
        }
      }}
      tabIndex={0}
    >
      <div className="menu-title">Select an Option</div>
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
