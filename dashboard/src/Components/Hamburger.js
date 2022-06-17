import HamIcon from "../Assets/Hamburger_icon.svg.png";

export default function Hamburger({ hamStyle, onHamClick }) {
  return (
    <div onClick={onHamClick}>
      <img src={HamIcon} style={hamStyle}/>
    </div>
  );
}
