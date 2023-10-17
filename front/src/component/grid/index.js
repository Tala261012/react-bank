// отступы между контейнерами 32px от заголовка - к форме
import "./index.css";

export default function Component({ children }) {
  return <div className="grid">{children}</div>;
}
