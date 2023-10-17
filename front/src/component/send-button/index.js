// кнопка "Send"
import { useNavigate } from "react-router-dom";
import "./index.css";
import "../../style/style.css";

export default function Component() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/send");

  return (
    <div onClick={handleClick} className="round-button__block">
      <div className="round-button">
        <img
          src="/svg/send-button.svg"
          alt="settings"
          width="28px"
          height="28px"
        />
      </div>
      <div className="round-button__text">Send</div>
    </div>
  );
}
