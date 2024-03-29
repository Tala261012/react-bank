// регистрация пользователя
import "./index.css";
import "../../style/style.css";

import { SignupForm } from "../../utils/form";
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
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: SignupForm.convertData(),
      });

      const data = await res.json();

      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
        // saveSession(data.session);
        auth.dispatch({ type: "login", data: data.session });
        alert(data.code);
        navigate(`/signup-confirm`);
      } else {
        setAlertClass({ status: "error", text: data.message });
      }
    } catch (error) {
      setAlertClass({ status: "error", text: error.message });
    }
  };

  const handleSubmit = () => {
    // дублирующая проверка перед отправкой
    SignupForm.validateAll();

    if (Object.keys(SignupForm.error).length !== 0) {
      // console.log("Error:", SignupForm.error);

      setIsDisabled(true);

      Object.entries(SignupForm.error).forEach(([name, value]) => {
        if (name === SignupForm.FIELD_NAME.NAME) {
          setError(
            SignupForm,
            SignupForm.FIELD_NAME.NAME,
            setNameError,
            nameSpan
          );
        }

        if (name === SignupForm.FIELD_NAME.EMAIL) {
          setError(
            SignupForm,
            SignupForm.FIELD_NAME.EMAIL,
            setEmailError,
            emailSpan
          );
        }

        if (name === SignupForm.FIELD_NAME.PASSWORD) {
          setError(
            SignupForm,
            SignupForm.FIELD_NAME.PASSWORD,
            setPasswordError,
            passwordSpan
          );
        }

        if (name === SignupForm.FIELD_NAME.PASSWORD_CONFIRM) {
          setError(
            SignupForm,
            SignupForm.FIELD_NAME.PASSWORD_CONFIRM,
            setPasswordConfirmError,
            passwordConfirmSpan
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
      Object.keys(SignupForm.error).length === 0 &&
      name !== "" &&
      email !== "" &&
      password !== "" &&
      passwordConfirm !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const nameSpan = useRef(null);
  const [nameError, setNameError] = useState(false);
  const [name, setName] = useState("");

  const handleNameInput = (value) => {
    SignupForm.change(SignupForm.FIELD_NAME.NAME, value);

    setError(SignupForm, SignupForm.FIELD_NAME.NAME, setNameError, nameSpan);

    setName(value);

    checkDisabled();
  };

  const emailSpan = useRef(null);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailInput = (value) => {
    SignupForm.change(SignupForm.FIELD_NAME.EMAIL, value);

    setError(SignupForm, SignupForm.FIELD_NAME.EMAIL, setEmailError, emailSpan);

    setEmail(value);

    checkDisabled();
  };

  const passwordSpan = useRef(null);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordInput = (value) => {
    SignupForm.change(SignupForm.FIELD_NAME.PASSWORD, value);

    setError(
      SignupForm,
      SignupForm.FIELD_NAME.PASSWORD,
      setPasswordError,
      passwordSpan
    );

    setPassword(value);

    checkDisabled();
  };

  const passwordConfirmSpan = useRef(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handlePasswordConfirmInput = (value) => {
    SignupForm.change(SignupForm.FIELD_NAME.PASSWORD_CONFIRM, value);

    setError(
      SignupForm,
      SignupForm.FIELD_NAME.PASSWORD_CONFIRM,
      setPasswordConfirmError,
      passwordConfirmSpan
    );

    setPasswordConfirm(value);

    checkDisabled();
  };

  return (
    <Form onKeyDown={handleSubmit}>
      <div>
        <InputItem
          isError={nameError}
          name={"name"}
          type={"text"}
          label={"Name:"}
          placeholder={"Enter your name"}
          onInput={handleNameInput}
          autoFocus={true}
        />
        <span ref={nameSpan} className="form__error">
          Error
        </span>
      </div>

      <div>
        <InputItem
          isError={emailError}
          name={"email"}
          type={"email"}
          label={"Email:"}
          placeholder={"Enter your email"}
          onInput={handleEmailInput}
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
          placeholder={"Create your passowrd"}
          onInput={handlePasswordInput}
        />
        <span ref={passwordSpan} className="form__error">
          Error
        </span>
      </div>

      <div>
        <InputPassword
          isError={passwordConfirmError}
          name={"passwordconfirm"}
          label={"Confirm password:"}
          placeholder={"Write your passowrd again"}
          onInput={handlePasswordConfirmInput}
        />
        <span ref={passwordConfirmSpan} className="form__error">
          Error
        </span>
      </div>

      <div className="link__prefix">
        Already have an account?{" "}
        <Link className="link" to="/signin">
          Sign In
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
