// компонент включает все: серый круг с иконкой, 2 строки текста и children по правому краю
import "./index.css";

import Sum from "../sum";

export default function Component({
  // иконка в круге, значения: warning, announcement, send-money, coinbase, stripe
  image = "",
  // size={"icon--big"} для страницы balance
  size = "",
  title = "",
  // subtitleClass={"on"} включает
  subtitleClass = "",
  subtitleTime = "",
  subtitleType = "",
  // rightbox={"rightbox--on"} включает
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
