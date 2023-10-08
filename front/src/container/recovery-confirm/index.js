// Войти
import "./index.css";
import { useState } from "react";
import Button from "../../component/button";
import Form from "../../component/form";
import Alert from "../../component/alert";
import InputItem from "../../component/input-item";

export default function Component() {
  const handleSubmit = () => {
    alert(code);
  };

  const [code, setCode] = useState("");

  const handleEmailChange = (value) => {
    setCode(value);
  };

  return (
    <Form>
      <div>
        <InputItem
          name={"code"}
          type={"text"}
          label={"Code:"}
          placeholder={"Enter your code from email"}
          onChange={handleEmailChange}
        />
        <span name="code" className="form__error">
          Error
        </span>
      </div>

      <Button
        // isDisabled={isDisabled}
        onClick={handleSubmit}
        className={"button-main"}
        text={"Restore password"}
      />
      <Alert className={"success"} message="This user already exists" />
    </Form>
  );
}
