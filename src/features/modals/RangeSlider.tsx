import type { RangeSliderProps } from "@interfaces/types";

const RangeSlider = ({
  label,
  min,
  max,
  step,
  value,
  className,
  onChange,
  onMouseUp,
  onTouchEnd
}: RangeSliderProps) => {
  return (
    <div className={className}>
      <label htmlFor={label}>{label}</label>
      <input
        type="range"
        id={label}
        aria-label={label}
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
