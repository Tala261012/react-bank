// хедер с кнопкой "назад"
import "./index.css";
import Back from "../../component/back-button";

export default function Component({ title = "" }) {
  return (
    <header className="header">
      <Back />
      <div className="header-title">{title}</div>
    </header>
  );
}
