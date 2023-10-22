// компонент Skeleton включает все: серый круг, 2 строки текста и три точки по правому краю
import "./index.css";

import Sum from "../sum";

export default function Component({
  // size={"icon--big"} для страницы balance
  size = "",
  // subtitleClass={"on"} включает
  subtitleClass = "",
  // rightbox={"rightbox--on"} включает
  rightbox = "",
}) {
  return (
    <div className="infobox">
      <div className="leftbox">
        <div className={`icon-skeleton ${size} skeleton-animation`}></div>

        <div className="info">
          <div className="info__title-skeleton skeleton-animation"></div>

          <div className={`info__subtitle-block--${subtitleClass}`}>
            <span className="info__subtitle-skeleton skeleton-animation"></span>
            <span className="info__subtitle--decor"></span>
            <span className="info__subtitle-skeleton skeleton-animation"></span>
          </div>
        </div>
      </div>

      <div className={`rightbox ${rightbox}`}>
        <span className="info__subtitle--decor skeleton-animation"></span>
        <span className="info__subtitle--decor skeleton-animation"></span>
        <span className="info__subtitle--decor skeleton-animation"></span>
      </div>
    </div>
  );
}
