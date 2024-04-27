import { useSelector, useDispatch } from "react-redux";
import type { MenuGameboyProps } from "../interfaces/types";
import { useEffect, useRef, useState } from "react";
import type { RootState } from "../features/reducers/stores/store";
import {
  nextOption,
  previousOption,
  selectOption
} from "../features/reducers/menugameboy/menuGameboySlice";

const MenuGameboy: React.FC<MenuGameboyProps> = ({
  onUploadImage,
  onChooseFilter,
  onDisplayOptions,
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
      name: "options",
      action: onDisplayOptions
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
          <li
            key={index}
            className={selectedOptionIndex === index ? "selected" : ""}
            onClick={() => dispatch(selectOption(index))}
          >
            <span>{option.name}</span>
          </li>
        ))}
      </ul>
      <div className="menu-footer">Use arrows and ↵</div>
    </div>
  );
};

export default MenuGameboy;
