// Войти
import "./index.css";
import { useState } from "react";
import Button from "../../component/button";
import Form from "../../component/form";
import Alert from "../../component/alert";
import InputItem from "../../component/input-item";

export default function Component() {
  const handleSubmit = () => {
    alert(email);
  };

  const [email, setEmail] = useState("");

  const handleEmailChange = (value) => {
    setEmail(value);
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
