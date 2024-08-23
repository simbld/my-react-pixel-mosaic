import { useSelector } from "react-redux";
import { selectFilter } from "./filterSelector";

const FiltersStatus = () => {
  const isStipplingEnabled = useSelector(selectFilter("stippling"));
  const isRopeEnabled = useSelector(selectFilter("rope"));
  const isSignEnabled = useSelector(selectFilter("sign"));
  const isStringEnabled = useSelector(selectFilter("string"));
  const isAsciiEnabled = useSelector(selectFilter("ascii"));

  return (
    <div>
      <p>Stippling: {isStipplingEnabled ? "Enabled" : "Disabled"}</p>
      <p>Rope: {isRopeEnabled ? "Enabled" : "Disabled"}</p>
      <p>Sign: {isSignEnabled ? "Enabled" : "Disabled"}</p>
      <p>String: {isStringEnabled ? "Enabled" : "Disabled"}</p>
      <p>ASCII: {isAsciiEnabled ? "Enabled" : "Disabled"}</p>
    </div>
  );
};

export default FiltersStatus;
