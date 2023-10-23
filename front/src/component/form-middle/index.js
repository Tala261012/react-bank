// отступы между контейнерами 16px
import "./index.css";

export default function Component({ children }) {
  // return <form className="form">{children}</form>;
  return <div className="form-middle">{children}</div>;
}
