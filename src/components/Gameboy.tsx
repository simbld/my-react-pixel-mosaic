import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../features/reducers/stores/store";
import {
  togglePower,
  playSound,
  stopSound,
  hideTitles,
  showMenu,
  hideMenu,
  showTitles
} from "../features/reducers/gameboy/gameboySlice";
import MenuGameboy from "./MenuGameboy";
import {
  GameboyProps,
  type MenuOption,
  type PadStyle
} from "../interfaces/types";
import ImageUploaderModal from "../modals/ImageUploaderModal";
import {
  nextOption,
  previousOption,
  resetToFirstOption
} from "../features/reducers/menugameboy/menuGameboySlice";

const Gameboy: React.FC<GameboyProps> = ({ onGameboyHome }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [startAnimation, setStartAnimation] = useState<string>("");

  const [vPadStyle, setVPadStyle] = useState<PadStyle>({
    transform: "perspective(600px) rotateX(0deg)",
    transformOrigin: "center",
    transition: "transform 0.3s ease"
  });

  const [hPadStyle, setHPadStyle] = useState<PadStyle>({
    transform: "perspective(600px) rotateY(0deg)",
    transformOrigin: "center",
    transition: "transform 0.3s ease"
  });

  const handlePress = (direction: "up" | "down" | "left" | "right") => {
    switch (direction) {
      case "up":
        dispatch(previousOption());
        setVPadStyle((prevState) => ({
          ...prevState,
          transform: "perspective(1000px) rotateX(20deg)",
          transformOrigin: "center",
          transition: "transform 0.2s ease"
        }));
        setHPadStyle((prevState) => ({
          ...prevState,
          transform: "perspective(600px) rotateX(20deg)",
          transformOrigin: "center",
          transition: "transform 0.2s ease"
        }));
        break;

      case "down":
        dispatch(nextOption());
        setVPadStyle({
          transform: "perspective(600px) rotateX(-20deg)",
          transformOrigin: "center",
          transition: "transform 0.2s ease"
        });
        setHPadStyle((prevState) => ({
          ...prevState,
          transform: "perspective(600px) rotateX(-20deg)",
          transformOrigin: "center",
          transition: "transform 0.2s ease"
        }));
        break;

      case "left":
        dispatch(previousOption());
        setHPadStyle({
          transform: "perspective(600px) rotateY(-20deg)",
          transformOrigin: "center",
          transition: "transform 0.2s ease"
        });
        setVPadStyle((prevState) => ({
          ...prevState,
          transform: "perspective(600px) rotateY(-20deg)",
          transformOrigin: "center",
          transition: "transform 0.2s ease"
        }));
        break;

      case "right":
        dispatch(nextOption());
        setHPadStyle({
          transform: "perspective(600px) rotateY(20deg)",
          transformOrigin: "center",
          transition: "transform 0.2s ease"
        });
        setVPadStyle((prevState) => ({
          ...prevState,
          transform: "perspective(600px) rotateY(20deg)",
          transformOrigin: "center",
          transition: "transform 0.2s ease"
        }));
        break;
    }
  };

  const handleRelease = () => {
    setVPadStyle({
      transform: "rotateX(0deg)",
      transformOrigin: "center",
      transition: "transform 0.3s ease"
    });
    setHPadStyle({
      transform: "rotateY(0deg)",
      transformOrigin: "center",
      transition: "transform 0.3s ease"
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        handlePress("up");
        dispatch(previousOption());
        break;
      case "ArrowDown":
        handlePress("down");
        dispatch(nextOption());
        break;
      case "ArrowLeft":
        handlePress("left");
        dispatch(previousOption());
        break;
      case "ArrowRight":
        handlePress("right");
        dispatch(nextOption());
        break;
      case "Enter":
        handleConfirmSelection();
        break;
      case "Escape":
        dispatch(resetToFirstOption());
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
        handleRelease();
        break;
      default:
        break;
    }
  };

  const { poweredOn, titlesShown, menuVisible, soundPlaying } = useSelector(
    (state: RootState) => state.gameboy
  );
  const selectedOptionIndex = useSelector(
    (state: RootState) => state.menuGameboy.selectedOptionIndex
  );

  const handleUploadImage = () => {
    setIsModalOpen(true);
  };

  const handleChooseFilter = () => {
    // TODO
  };

  const handleDisplaySettings = () => {
    // TODO
  };

  const handleDownloadImage = () => {
    // TODO
  };

  const menuOptions: MenuOption[] = [
    { name: "open file", action: handleUploadImage },
    { name: "filters", action: handleChooseFilter },
    { name: "settings", action: handleDisplaySettings },
    { name: "download", action: handleDownloadImage }
  ];

  const handleSwitchClick = () => {
    dispatch(togglePower(!poweredOn));

    if (!poweredOn) {
      dispatch(playSound());
      setStartAnimation("no-reflection");

      document.body.offsetHeight;

      setTimeout(() => {
        setStartAnimation("flash");
        setTimeout(() => {
          setStartAnimation("start-screen");
          dispatch(showTitles());
          setTimeout(() => {
            dispatch(showMenu());
          }, 6000);
        }, 100);
      }, 10);
    } else {
      dispatch(stopSound());
      dispatch(hideTitles());
      dispatch(hideMenu());
      setStartAnimation("");
    }
  };

  const handleAnimationEnd = () => {
    dispatch(hideTitles());
    dispatch(showMenu());
    onGameboyHome();
  };

  const handleImageDisplay = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmSelection = () => {
    if (!poweredOn) return;
    const selectedAction = menuOptions[selectedOptionIndex]?.action;
    selectedAction?.();
  };

  const handleReset = () => {
    dispatch(resetToFirstOption());
  };

  useEffect(() => {
    if (poweredOn && soundPlaying) {
      audioRef.current = new Audio("/src/assets/gameboy-sound.mp3");
      audioRef.current
        .play()
        .catch((err) => console.error("Error playing audio:", err));
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current = null;
        }
      };
    }
  }, [poweredOn, soundPlaying]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className={`gameboy ${poweredOn ? "gameboy-on" : ""}`}>
      <ImageUploaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleImageDisplay}
      />
      <div
        className={`switch ${poweredOn ? "switch-on" : ""}`}
        onClick={handleSwitchClick}
      ></div>
      <div className="console">
        <div className="off-on">
          <div className="off-on-container" onClick={handleSwitchClick}>
            ◀OFF●ON▶
          </div>
          <div className="line-container-top">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <div className="small-R-vertical-line"></div>
        <div className="small-L-vertical-line"></div>
        <div className="big-horizontal-line"></div>
        <div className="big-horizontal-line-bottom"></div>
        <div className="notch"></div>
        <div className={`glass-screen ${startAnimation}`}>
          <div className="glass-screen-line">
            <div className="glass-screen-line-l"></div>
            <div className="glass-screen-line-l"></div>
          </div>

          <div className="text-indication">
            <div className="dot-matrix">DOT MATRIX WITH STEREO SOUND</div>
            <div className="battery-text">BATTERY</div>
            <div
              className={`indicator-light ${poweredOn ? "indicator-light-on" : ""}`}
            ></div>
          </div>

          <div
            className={`glass-screen-matrix ${startAnimation} ${menuVisible ? "glass-screen-matrix-on" : ""}`}
          >
            {titlesShown && (
              <div className="titles" onAnimationEnd={handleAnimationEnd}>
                <div
                  className={`falling-title-L ${poweredOn ? "animate-fall-left" : "hidden"}`}
                  onAnimationEnd={handleAnimationEnd}
                >
                  RE
                </div>
                <div
                  className={`falling-title-R ${poweredOn ? "animate-fall-right" : "hidden"}`}
                  onAnimationEnd={handleAnimationEnd}
                >
                  ACT
                </div>
                <div
                  className={`rising-title ${poweredOn ? "animate-rise" : "hidden"}`}
                  onAnimationEnd={handleAnimationEnd}
                >
                  pixel
                </div>
              </div>
            )}
            {menuVisible && (
              <MenuGameboy
                menuOptions={menuOptions}
                onSelectOption={handleConfirmSelection}
                onUploadImage={handleUploadImage}
                onChooseFilter={handleChooseFilter}
                onDisplaySettings={handleDisplaySettings}
                onDownloadImage={handleDownloadImage}
              />
            )}
          </div>
        </div>

        <div className="brand">
          <div className="nintendo">Simon</div>
          <div className="GAME_BOY">BULLADO</div>
          <div className="TM">TM</div>
        </div>

        <div className="pad">
          <div className="pad-up">▲</div>
          <div className="pad-down">▼</div>
          <div className="pad-left">◀</div>
          <div className="pad-right">▶</div>
          <div className="pad-v"></div>
          <div className="pad-h"></div>
          <div className="pad-v-btn" style={vPadStyle as React.CSSProperties}>
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-center"></div>
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-grips"></div>
          </div>
          <div className="pad-h-btn" style={hPadStyle as React.CSSProperties}>
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-center"></div>
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-grips"></div>
          </div>
          <div className="pad-center">
            <div className="pad-center-cir"></div>
          </div>
          <div className="control-area">
            <div
              className="controlP up"
              onMouseDown={() => handlePress("up")}
              onMouseUp={handleRelease}
              onMouseLeave={handleRelease}
            ></div>
            <div
              className="controlP down"
              onMouseDown={() => handlePress("down")}
              onMouseUp={handleRelease}
              onMouseLeave={handleRelease}
            ></div>
            <div
              className="controlP left"
              onMouseDown={() => handlePress("left")}
              onMouseUp={handleRelease}
              onMouseLeave={handleRelease}
            ></div>
            <div
              className="controlP right"
              onMouseDown={() => handlePress("right")}
              onMouseUp={handleRelease}
              onMouseLeave={handleRelease}
            ></div>
          </div>
        </div>

        <div className="BA-btn-text-container">
          <div className="BA-btn-container">
            <div className="BA-btn-container-B" onClick={handleReset}></div>
            <div
              className="BA-btn-container-A"
              onClick={handleConfirmSelection}
            ></div>
          </div>
          <div className="BA-btn-container-text">
            <div className="BA-btn-container-text-B">B</div>
            <div className="BA-btn-container-text-A">A</div>
          </div>
        </div>

        <div className="menu">
          <div className="menu-select">
            <div className="menu-container" onClick={handleReset}>
              <div className="menu-container-btn"></div>
            </div>
            <div className="select">SELECT</div>
          </div>
          <div className="menu-start">
            <div className="menu-container" onClick={handleConfirmSelection}>
              <div className="menu-container-btn"></div>
            </div>
            <div className="start">START</div>
          </div>
        </div>
        <div className="phones">
          <div className="phones-sound">🎧PHONES</div>
          <div className="line-container-bottom">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <div className="speaker">
          <div className="speaker-line"></div>
          <div className="speaker-line"></div>
          <div className="speaker-line"></div>
          <div className="speaker-line"></div>
          <div className="speaker-line"></div>
          <div className="speaker-line"></div>
          <div className="speaker-corner"></div>
        </div>
      </div>
    </div>
  );
};

export default Gameboy;
