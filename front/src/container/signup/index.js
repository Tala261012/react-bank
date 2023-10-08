// хедер с кнопкой "назад"
import "./index.css";
import { useState } from "react";
import Button from "../../component/button";
import Form from "../../component/form";
import Alert from "../../component/alert";
import InputItem from "../../component/input-item";
import InputPassword from "../../component/input-password";

class SignupForm {
  static value = {};

  static validate = (name, value) => {
    return true;
  };

  static change = (name, value) => {
    if (this.validate(name, value)) this.value[name] = value;
    console.log("Object:", this.value);
  };

  static submit = () => {
    //отправка на сервер - нажатие кнопки
    alert("Object:", this.value);
  };
}

export default function Component() {
  const handleSubmit = () => {
    SignupForm.submit();
  };

  const [email, setEmail] = useState("");

  const handleEmailChange = (value) => {
    setEmail(value);
    SignupForm.change("email", value);
  };

  const [password, setPassword] = useState("");

  const handlePasswordChange = (value) => {
    setPassword(value);
    SignupForm.change("password", value);
  };

  return (
    <Form>
      <div>
        <InputItem
          name={"email"}
          type={"email"}
          label={"Email:"}
          placeholder={"Enter your email"}
          onChange={handleEmailChange}
        />
        <span name="email" className="form__error">
          Error
        </span>
      </div>

      <div>
        <InputPassword
          name={"password"}
          label={"Password:"}
          placeholder={"Create your passowrd"}
          onChange={handlePasswordChange}
        />
        <span name="password" className="form__error">
          Error
        </span>
      </div>

      <Button
        // isDisabled={isDisabled}
        onClick={handleSubmit}
        className={"button-main"}
        text={"Continue"}
      />
      <Alert className={"success"} message="This user already exists" />
    </Form>
  );
}
