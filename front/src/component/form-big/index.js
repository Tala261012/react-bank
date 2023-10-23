// отступы между контейнерами 32px
import "./index.css";

export default function Component({ children }) {
  // return <form className="form">{children}</form>;
  return <div className="form-big">{children}</div>;
}
