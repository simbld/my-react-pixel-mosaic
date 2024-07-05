import type { RangeSliderProps } from "@interfaces/types";

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
  className
}) => {
  return (
    <div className={`range-slider ${className}`}>
      <label>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default RangeSlider;
