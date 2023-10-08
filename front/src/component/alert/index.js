// alert сообщение от формы внизу
import "./index.css";

export default function Component({
  className = "",
  message = "",
  style = {},
}) {
  return (
    <div style={style} className={`alert alert--${className}`}>
      <div className={`alert--${className}-img`}></div>
      <div>{message}</div>
    </div>
  );
}
