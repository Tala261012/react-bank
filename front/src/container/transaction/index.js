import "./index.css";
import "../../style/style.css";

import { getDate, getTypeShort, getSignFromType } from "../../utils/scripts";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import FormBig from "../../component/form-big";
import Alert from "../../component/alert";
import Details from "../../component/details";
import Sum from "../../component/sum";

export default function Component() {
  const { transactionId } = useParams();

  const [details, setDetails] = useState({});

  const getDetails = async () => {
    setAlertClass({ status: "progress", text: "Loading..." });

    try {
      const res = await fetch(
        `http://localhost:4000/transaction?id=${transactionId}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
        setDetails(data.transaction);
      } else {
        setAlertClass({ status: "error", text: data.message });
      }
    } catch (error) {
      setAlertClass({ status: "error", text: error.message });
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const [alertClass, setAlertClass] = useState({
    status: "disabled",
    text: "",
  });

  const item = {
    date: getDate(details.date),
    address: details.address,
    type: getTypeShort(details.type),
    cash: details.cash,
    sign: getSignFromType(details.type).sign,
    class: getSignFromType(details.type).class,
  };

  return (
    <FormBig>
      <Sum
        value={item.cash}
        sign={item.sign}
        className={item.class}
        classSize={"sum--big"}
      />

      <Details date={item.date} address={item.address} type={item.type} />

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </FormBig>
  );
}
