// отступы между контейнерами 20px
import "./index.css";

export default function Component({ children }) {
  // return <form className="form">{children}</form>;
  return <div className="form-small">{children}</div>;
}