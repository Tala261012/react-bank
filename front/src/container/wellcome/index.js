// две форовые картинки на странице приветствия
import "./index.css";

export default function Component({ title = "", description = "" }) {
  return (
    <>
      <div className="back"></div>
      <div className="back-photo"></div>

      <div className="wellcome">
        <div className="wellcome-title">{title}</div>
        <div className="wellcome-description">{description}</div>
      </div>
    </>
  );
}
