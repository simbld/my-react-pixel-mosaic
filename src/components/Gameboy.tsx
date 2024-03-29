import { GameboyProps } from "../interfaces/types";

const Gameboy: React.FC<GameboyProps> = ({ imageSrc }) => {
  return (
    <div className="gameboy">
      <div className="switch"></div>
      <div className="console">
        <div className="off-on">
          <div className="off-on-btn">◀OFF●ON▶</div>
          <div className="off-on-line-container">
            <div className="off-on-line"></div>
            <div className="off-on-line"></div>
            <div className="off-on-line"></div>
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

            <div className="indicator-light"></div>
          </div>

          <div className="glass-screen-matrix">
            <div className="falling-title-L">RE</div>
            <div className="falling-title-R">ACT</div>
            <div className="rising-title"> pixel </div>
          </div>
        </div>

        <div className="brand">
          <div className="nintendo">Nintendo</div>
          <div className="GAME_BOY">GAME BOY</div>
          <div className="TM">TM</div>
        </div>

        <div className="cross">
          <div className="cross-v"></div>
          <div className="cross-h"></div>
          <div className="cross-v-btn">
            <div className="cross-v-btn-grips"></div>
            <div className="cross-v-btn-grips"></div>
            <div className="cross-v-btn-grips"></div>
            <div className="cross-v-btn-grips"></div>
            <div className="cross-v-btn-grips"></div>
            <div className="cross-v-btn-grips"></div>
            <div className="cross-v-btn-grips"></div>
            <div className="cross-v-btn-grips"></div>
            <div className="cross-v-btn-grips"></div>
          </div>
          <div className="cross-h-btn">
            <div className="cross-h-btn-grips"></div>
            <div className="cross-h-btn-grips"></div>
            <div className="cross-h-btn-grips"></div>
            <div className="cross-h-btn-grips"></div>
            <div className="cross-h-btn-grips"></div>
            <div className="cross-h-btn-grips"></div>
            <div className="cross-h-btn-grips"></div>
            <div className="cross-h-btn-grips"></div>
            <div className="cross-h-btn-grips"></div>
          </div>
          <div className="cross-center">
            <div className="cross-center-cir"></div>
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
          <div className="phones-line-container">
            <div className="phones-line"></div>
            <div className="phones-line"></div>
            <div className="phones-line"></div>
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
