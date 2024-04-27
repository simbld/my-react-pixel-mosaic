import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../features/reducers/stores/store";
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
import { GameboyProps } from "../interfaces/types";
import { toggleFilter } from "../features/reducers/imageprocessing/imageProcessingSlice";
import ImageUploaderModal from "../modals/ImageUploaderModal";

const Gameboy: React.FC<GameboyProps> = ({ onGameboyHome }) => {
  const dispatch = useDispatch();
  const { poweredOn, titlesShown, menuVisible, soundPlaying } = useSelector(
    (state: RootState) => state.gameboy
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleUploadImage = () => {
    setIsModalOpen(true);
  };

  const handleChooseFilter = () => {
    // Implémentez cette fonction selon vos besoins
  };

  const handleDisplayOptions = () => {
    // Implémentez cette fonction selon vos besoins
  };

  const handleDownloadImage = () => {
    // Implémentez cette fonction selon vos besoins
  };

  const handleSwitchClick = () => {
    dispatch(togglePower(!poweredOn));

    if (!poweredOn) {
      dispatch(playSound());
      dispatch(showTitles());
      setTimeout(() => {
        dispatch(showMenu());
      }, 4500);
    } else {
      dispatch(stopSound());
      dispatch(hideTitles());
      dispatch(hideMenu());
    }
  };

  const handleAnimationEnd = () => {
    dispatch(hideTitles());
    dispatch(showMenu());
    onGameboyHome();
  };

  return (
    <div className={`gameboy ${poweredOn ? "gameboy-on" : ""}`}>
      <ImageUploaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={(file) => console.log(file)}
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
        <div className="glass-screen">
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
            className={`glass-screen-matrix ${menuVisible ? "glass-screen-matrix-on" : ""}`}
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
                onUploadImage={handleUploadImage}
                onChooseFilter={handleChooseFilter}
                onDisplayOptions={handleDisplayOptions}
                onDownloadImage={handleDownloadImage}
              />
            )}
          </div>
        </div>

        <div className="brand">
          <div className="nintendo">Nintendo</div>
          <div className="GAME_BOY">GAME BOY</div>
          <div className="TM">TM</div>
        </div>

        <div className="pad">
          <div className="pad-up">▲</div>
          <div className="pad-down">▼</div>
          <div className="pad-left">◀</div>
          <div className="pad-right">▶</div>
          <div className="pad-v"></div>
          <div className="pad-h"></div>
          <div className="pad-v-btn">
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-grips"></div>
            <div className="pad-v-btn-grips"></div>
          </div>
          <div className="pad-h-btn">
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-grips"></div>
            <div className="pad-h-btn-grips"></div>
          </div>
          <div className="pad-center">
            <div className="pad-center-cir"></div>
          </div>
        </div>

        <div className="BA-btn-container">
          <div className="pink-btn">
            <div className="pink-btn-B"></div>
            <div className="pink-btn-A"></div>
          </div>
          <div className="BA-btn-container-label">
            <div className="b">B</div>
            <div className="a">A</div>
          </div>
        </div>

        <div className="menu">
          <div className="menu-select">
            <div className="menu-container">
              <div className="menu-container-btn"></div>
            </div>
            <div className="select">SELECT</div>
          </div>
          <div className="menu-start">
            <div className="menu-container">
              <div className="menu-container-btn"></div>
            </div>
            <div className="start">START</div>
          </div>
        </div>
        <div className="phones">
          <div className="phones-sound">ΩPHONES</div>
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
          <div className="speaker-corner"></div>
        </div>
      </div>
    </div>
  );
};

export default Gameboy;
