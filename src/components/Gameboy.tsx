import { GameboyProps } from "../interfaces/types";

const Gameboy: React.FC<GameboyProps> = ({ imageSrc }) => {
  return (
    <div className="gameboy">
      <div className="switch"></div>
      <div className="console">
        <div className="on-off">
          <div className="on-off-btn">◀OFF●ON▶</div>
          <div className="on-off-line"></div>
          <div className="on-off-line"></div>
          <div className="on-off-line"></div>
        </div>
        <div className="small-R-vertical-line"></div>
        <div className="small-L-vertical-line"></div>
        <div className="big-horizontal-line"></div>
        <div className="glass-screen">
          <div className="glass-screen-line">
            <div className="glass-screen-line-l"></div>
            <div className="glass-screen-line-l"></div>
          </div>

          <div className="dot-matrix">DOT MATRIX WITH STEREO SOUND</div>

          <div className="battery"></div>

          <div className="glass-screen-inner">
            <div className="falling-title-L">RE</div>
            <div className="falling-title-R">ACT</div>
            <div className="rising-title"> pixel </div>
          </div>
        </div>

        <div className="nintendo">
          Nintendo
          <span className="name">
            GAME BOY<span className="tm">TM</span>
          </span>
        </div>

        <div className="cross">
          <div className="cross-v"></div>
          <div className="cross-h"></div>
          <div className="cross-v-inner">
            <div className="cross-v-inner-grips"></div>
            <div className="cross-v-inner-grips"></div>
            <div className="cross-v-inner-grips"></div>
            <div className="cross-v-inner-grips"></div>
            <div className="cross-v-inner-grips"></div>
            <div className="cross-v-inner-grips"></div>
            <div className="cross-v-inner-grips"></div>
            <div className="cross-v-inner-grips"></div>
            <div className="cross-v-inner-grips"></div>
          </div>
          <div className="cross-h-inner">
            <div className="cross-h-inner-grips"></div>
            <div className="cross-h-inner-grips"></div>
            <div className="cross-h-inner-grips"></div>
            <div className="cross-h-inner-grips"></div>
            <div className="cross-h-inner-grips"></div>
            <div className="cross-h-inner-grips"></div>
            <div className="cross-h-inner-grips"></div>
            <div className="cross-h-inner-grips"></div>
            <div className="cross-h-inner-grips"></div>
          </div>
          <div className="cross-center">
            <div className="cross-center-cir"></div>
          </div>
        </div>

        <div className="right-key">
          <div className="right-key-btn">
            <div className="right-key-btn-R"></div>
            <div className="right-key-btn-L"></div>
          </div>
          <div className="right-key-label">
            <div className="b">B</div>
            <div className="a">A</div>
          </div>
        </div>

        <div className="selectStart">
          <div className="selectStart-select">
            <div className="selectStart-btn">
              <div className="selectStart-btn-inner"></div>
            </div>
            <div className="select">SELECT</div>
          </div>
          <div className="selectStart-start">
            <div className="selectStart-btn">
              <div className="selectStart-btn-inner"></div>
            </div>
            <div className="start">START</div>
          </div>
        </div>
        <div className="phones">
          <div className="phones-top">ΩPHONES</div>
          <div className="phones-line">
            <div className="phones-line-inner"></div>
            <div className="phones-line-inner"></div>
          </div>
        </div>
        <div className="speaker">
          <div className="speaker-Light"></div>
          <div className="speaker-line"></div>
          <div className="speaker-line"></div>
          <div className="speaker-line"></div>
          <div className="speaker-line"></div>
          <div className="speaker-line"></div>
          <div className="speaker-line"></div>
        </div>
      </div>
    </div>
  );
};

export default Gameboy;
