// вход на сайт
import "./index.css";
import "../../style/style.css";

import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import Button from "../../component/button";
import Alert from "../../component/alert";

export default function Component() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // console.log("auth inside Signup:", auth);

  const submit = async () => {
    const state = Object.entries(auth)[0][1];

    console.log("state:", state.token);

    try {
      const res = await fetch("http://localhost:4000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: state.token }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
        auth.dispatch({ type: "logout" });
        navigate(`/`);
      } else {
        setAlertClass({ status: "error", text: data.message });
      }
    } catch (error) {
      setAlertClass({ status: "error", text: error.message });
    }
  };

  const handleSubmit = () => {
    setAlertClass({ status: "progress", text: "Loading..." });

    submit();
  };

  const [alertClass, setAlertClass] = useState({
    status: "disabled",
    text: "",
  });

  return (
    <React.Fragment>
      <Button
        isDisabled={false}
        onClick={handleSubmit}
        className={"button-red"}
        text={"Log out"}
      />

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </React.Fragment>
  );
}
