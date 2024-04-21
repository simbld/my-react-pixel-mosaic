import { useSelector, useDispatch } from "react-redux";
import type { MenuGameboyProps } from "../interfaces/types";
import menuGameboySlice, {
  nextOption,
  previousOption,
  selectOption
} from "../features/reducers/menugameboy/menuGameboySlice";
import { useEffect, useRef } from "react";
import type { RootState } from "../features/reducers/stores/store";

const MenuGameboy: React.FC<MenuGameboyProps> = ({
  onUploadImage,
  onChooseFilter,
  onDisplayOptions,
  onDownloadImage
}) => {
  const dispatch = useDispatch();

  const selectedOptionIndex = useSelector(
    (state: RootState) => state.menuGameboy.selectedOptionIndex
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  const menuOptions = [
    { name: "upload my image", action: onUploadImage },
    { name: "choose my filter", action: onChooseFilter },
    { name: "display options", action: onDisplayOptions },
    { name: "download my image", action: onDownloadImage }
  ];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowDown":
        dispatch(nextOption());
        break;
      case "ArrowUp":
        dispatch(previousOption());
        break;
      case "Enter":
        menuOptions[selectedOptionIndex].action();
        break;
    }
  };

  const handleOptionSelect = (index: number) => {
    dispatch(selectOption(index));
    menuOptions[index].action();
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="glass-screen-matrix-on"
      onKeyDown={handleKeyDown}
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

      <div className="menu-footer">Use arrows and </div>
      <div></div>
    </div>
  );
};

export default MenuGameboy;
