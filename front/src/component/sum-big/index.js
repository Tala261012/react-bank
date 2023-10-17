// Сумма, крупный шрифт
import "./index.css";

export default function Component({
  sign = "$",
  value = "0.00",
  className = "",
}) {
  const sumArr = String(value).split(".");

  return (
    <div className="sum__block">
      <div className={`sum__bold ${className}`}>{sign}</div>
      <div>
        <span className={`sum__bold ${className}`}>{sumArr[0]}</span>
        <span className={`sum__thin ${className}`}>.{sumArr[1]}</span>
      </div>
    </div>
  );
}
