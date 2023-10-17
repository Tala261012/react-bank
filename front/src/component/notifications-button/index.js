// кнопка "Назад"
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Component() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/notifications");

  return (
    <div onClick={handleClick} className="notifications-button">
      <img
        src="/svg/notifications-button.svg"
        alt="notifications"
        width="24px"
        height="24px"
      />
    </div>
  );
}
