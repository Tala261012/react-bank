// кнопка "Назад"
import "./index.css";

export default function Component() {
  const handleClick = () => window.history.back();

  return (
    <div onClick={handleClick} className="back-button">
      <img src="/svg/back-button.svg" alt="<" width="24px" height="24px" />
    </div>
  );
}
