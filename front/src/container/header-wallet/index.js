// хедер с кнопкой "назад"
import "./index.css";
import Settings from "../../component/settings-button";
import Notifications from "../../component/notifications-button";

export default function Component({ title = "" }) {
  return (
    <header className="wallet-header">
      <Settings />
      <div className="wallet-header-title">{title}</div>
      <Notifications />
    </header>
  );
}
