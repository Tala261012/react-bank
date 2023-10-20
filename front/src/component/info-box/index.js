// белая плашка со скругленными углами
import "./index.css";

import Sum from "../sum";

export default function Component({
  image = "",
  size = "",
  title = "",
  subtitleClass = "",
  subtitleTime = "",
  subtitleType = "",
  rightbox = "",
  children,
}) {
  return (
    <div className="infobox">
      <div className="leftbox">
        <div className={`icon ${size} ${image}`}></div>

        <div className="info">
          <div className="info__title">{title}</div>

          <div className={`info__subtitle-block--${subtitleClass}`}>
            <span className="info__subtitle">{subtitleTime}</span>
            <span className="info__subtitle--decor"></span>
            <span className="info__subtitle">{subtitleType}</span>
          </div>
        </div>
      </div>

      <div className={`rightbox ${rightbox}`}>{children}</div>
    </div>
  );
}
