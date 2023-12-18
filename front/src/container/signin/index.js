// вход на сайт
import "./index.css";
import "../../style/style.css";

import { SigninForm } from "../../utils/form";
import { setError } from "../../utils/scripts";
import { AuthContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import Button from "../../component/button";
import Form from "../../component/form";
import Alert from "../../component/alert";
import InputItem from "../../component/input-item";
import InputPassword from "../../component/input-password";

export default function Component() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // console.log("auth inside Signup:", auth);

  const submit = async () => {
    try {
      const res = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: SigninForm.convertData(),
      });

      const data = await res.json();

      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
        auth.dispatch({ type: "login", data: data.session });
        navigate(`/balance`);
      } else {
        setAlertClass({ status: "error", text: data.message });
      }
    } catch (error) {
      setAlertClass({ status: "error", text: error.message });
    }
  };

  const handleSubmit = () => {
    // дублирующая проверка перед отправкой
    SigninForm.validateAll();

    if (Object.keys(SigninForm.error).length !== 0) {
      // console.log("Error:", SignupForm.error);

      setIsDisabled(true);

      Object.entries(SigninForm.error).forEach(([name, value]) => {
        if (name === SigninForm.FIELD_NAME.EMAIL) {
          setError(
            SigninForm,
            SigninForm.FIELD_NAME.EMAIL,
            setEmailError,
            emailSpan
          );
        }

        if (name === SigninForm.FIELD_NAME.PASSWORD) {
          setError(
            SigninForm,
            SigninForm.FIELD_NAME.PASSWORD,
            setPasswordError,
            passwordSpan
          );
        }
      });
    } else {
      setAlertClass({ status: "progress", text: "Loading..." });

      // console.log("Result:", SignupForm.value);

      submit();
    }
  };

  const [alertClass, setAlertClass] = useState({
    status: "disabled",
    text: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const checkDisabled = () => {
    if (
      Object.keys(SigninForm.error).length === 0 &&
      email !== "" &&
      password !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const emailSpan = useRef(null);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailInput = (value) => {
    SigninForm.change(SigninForm.FIELD_NAME.EMAIL, value);

    setError(SigninForm, SigninForm.FIELD_NAME.EMAIL, setEmailError, emailSpan);

    setEmail(value);

    checkDisabled();
  };

  const passwordSpan = useRef(null);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordInput = (value) => {
    SigninForm.change(SigninForm.FIELD_NAME.PASSWORD, value);

    setError(
      SigninForm,
      SigninForm.FIELD_NAME.PASSWORD,
      setPasswordError,
      passwordSpan
    );

    setPassword(value);

    checkDisabled();
  };

  return (
    <Form>
      <div>
        <InputItem
          isError={emailError}
          name={"email"}
          type={"email"}
          label={"Email:"}
          placeholder={"Enter your email"}
          onInput={handleEmailInput}
          autoFocus={true}
        />
        <span ref={emailSpan} className="form__error">
          Error
        </span>
      </div>

      <div>
        <InputPassword
          isError={passwordError}
          name={"password"}
          label={"Password:"}
          placeholder={"Write your passowrd"}
          onInput={handlePasswordInput}
        />
        <span ref={passwordSpan} className="form__error">
          Error
        </span>
      </div>

      <div className="link__prefix">
        Forgot your password?{" "}
        <Link className="link" to="/recovery">
          Restore
        </Link>
      </div>

      <Button
        isDisabled={isDisabled}
        onClick={handleSubmit}
        className={"button-main"}
        text={"Continue"}
      />

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </Form>
  );
}
