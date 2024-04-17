import { useState, useRef } from "react";
import { GameboyProps } from "../interfaces/types";

const Gameboy: React.FC<GameboyProps> = ({ imageSrc }) => {
  const [isOn, setIsOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(
    new Audio("/assets/gameboy-sound.mp3")
  );

  const handleSwitchClick = () => {
    setIsOn((prevIsOn) => {
      const newState = !prevIsOn;
      if (newState) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return newState;
    });
  };

  return (
    <div className={`gameboy ${isOn ? "gameboy-on" : ""}`}>
      <div
        className={`switch ${isOn ? "switch-on" : ""}`}
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
              className={`indicator-light ${isOn ? "indicator-light-on" : ""}`}
            ></div>
          </div>

          <div
            className={`glass-screen-matrix ${isOn ? "glass-screen-matrix-on" : ""}`}
          >
            <div
              className={`falling-title-L ${isOn ? "animate-fall-left" : "hidden"}`}
              key={`fall-left-${isOn}`}
            >
              RE
            </div>
            <div
              className={`falling-title-R ${isOn ? "animate-fall-right" : "hidden"}`}
              key={`fall-right-${isOn}`}
            >
              ACT
            </div>
            <div
              className={`rising-title ${isOn ? "animate-rise" : "hidden"}`}
              key={`rise-${isOn}`}
            >
              pixel
            </div>
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
          <div className="speaker-line"></div>
          <div className="speaker-corner"></div>
        </div>
      </div>
    </div>
  );
};

export default Gameboy;
