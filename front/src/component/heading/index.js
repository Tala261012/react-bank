// заголовок и описание страницы
import "./index.css";

export default function Component({ title = "", description = "" }) {
  return (
    <div className="heading">
      <h1 className="heading-title">{title}</h1>
      <div className="heading-description">{description}</div>
    </div>
  );
}
