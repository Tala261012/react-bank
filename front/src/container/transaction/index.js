import "./index.css";
import "../../style/style.css";

import { setError } from "../../utils/scripts";
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

    // try {
    //   const res = await fetch(
    //     `http://localhost:4000/balance?token=${state.token}`,
    //     {
    //       method: "GET",
    //     }
    //   );

    //   const data = await res.json();

    //   if (res.ok) {
    //     setAlertClass({ status: "success", text: data.message });
    //     setDetails(data.sum);
    //   } else {
    //     setAlertClass({ status: "error", text: data.message });
    //   }
    // } catch (error) {
    //   setAlertClass({ status: "error", text: error.message });
    // }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const [alertClass, setAlertClass] = useState({
    status: "disabled",
    text: "",
  });

  return (
    <FormBig>
      <Sum
        value={100}
        sign={"+$"}
        className={"sum--green"}
        classSize={"sum--big"}
      />

      <Details date={"today"} address={"get@money.com"} type={"receive"} />

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </FormBig>
  );
}
