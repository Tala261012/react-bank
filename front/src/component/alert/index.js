// alert сообщение от формы внизу
import "./index.css";

export default function Component({
  className = "",
  alertText = "",
  style = {},
}) {
  return (
    <div style={style} className={`alert alert--${className}`}>
      <div className={`alert--${className}-img`}></div>
      <div>{alertText}</div>
    </div>
  );
}
