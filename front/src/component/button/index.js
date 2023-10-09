// кнопка
import "./index.css";

export default function Component({
  text,
  className,
  onClick,
  isDisabled = true,
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`button ${className}`}
    >
      {text}
    </button>
  );
}
