// кнопка "Назад"
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Component() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/settings");

  return (
    <div onClick={handleClick} className="settings-button">
      <img
        src="/svg/settings-button.svg"
        alt="settings"
        width="24px"
        height="24px"
      />
    </div>
  );
}
