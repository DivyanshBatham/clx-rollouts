import HamIcon from "../Assets/Hamburger_icon.svg.png";
import { container } from "./Hamburger.module.css";
export default function Hamburger({ hamStyle, onHamClick }) {
  return (
    <div onClick={onHamClick}>
      <img src={HamIcon} className={container} />
    </div>
  );
}
