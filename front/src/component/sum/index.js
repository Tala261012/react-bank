// Сумма, крупный шрифт, мелкий, цвета
import "./index.css";

export default function Component({
  sign = "$",
  value = "0.00",
  // установить цвет className={"sum--white"}
  className = "",
  // установить крупный шрифт classSize={"sum--big"}
  classSize = "",
}) {
  let sumStr = String(value);

  if (!sumStr.includes(".")) {
    sumStr = sumStr + ".00";
  }

  const sumArr = sumStr.split(".");

  return (
    <div className="sum__block">
      <div className={`sum__bold ${className} ${classSize}`}>{sign}</div>
      <div>
        <span className={`sum__bold ${className} ${classSize}`}>
          {sumArr[0]}
        </span>
        <span className={`sum__thin ${className} ${classSize}`}>
          .{sumArr[1]}
        </span>
      </div>
    </div>
  );
}
