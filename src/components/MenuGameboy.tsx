import { useSelector, useDispatch } from "react-redux";
import type { MenuGameboyProps } from "../interfaces/types";
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
  const dispatch = useDispatch();
  const { selectedOptionIndex, optionCount } = useSelector(
    (state: RootState) => ({
      selectedOptionIndex: state.menuGameboy.selectedOptionIndex,
      optionCount: state.menuGameboy.optionCount
    })
  );

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

  return (
    <div
      className="glass-screen-matrix-on"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <ul>
        {menuOptions.map((option, index) => (
          <li
            key={index}
            className={selectedOptionIndex === index ? "selected" : ""}
            onClick={() => handleOptionSelect(index)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuGameboy;
