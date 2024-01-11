// отступы между контейнерами 12px
import "./index.css";

export default function Component({ onKeyDown, children }) {
  const handleKeyDown = (event) => {
    if (onKeyDown && event.code === "Enter") {
      onKeyDown();
    }
  };

  // return <form className="form">{children}</form>;
  return (
    <div className="form" onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
}
