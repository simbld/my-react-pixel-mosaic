import type { RangeSliderProps } from "@interfaces/types";

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  min,
  max,
  step,
  value,
  className,
  onChange,
  onMouseUp,
  onTouchEnd
}) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
      />
      <span className="value">{value}</span>
    </div>
  );
};

export default RangeSlider;
