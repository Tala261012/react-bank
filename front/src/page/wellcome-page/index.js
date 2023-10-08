import "./index.css";

import Page from "../../component/page";
import Button from "../../component/button";
import Wellcome from "../../container/wellcome";
import { useNavigate } from "react-router-dom";

export default function Component() {
  const navigate = useNavigate();

  const handleSignup = () => navigate("/signup");
  const handleSignin = () => navigate("/signin");
  return (
    <Page>
      <Wellcome title={"Hello!"} description={"Wellcome to bank app"} />

      <div className="button-block">
        <Button
          onClick={handleSignup}
          text={"Sign Up"}
          className={"button-main"}
        />
        <Button
          onClick={handleSignin}
          text={"Sign In"}
          className={"button-purple"}
        />
      </div>
    </Page>
  );
}
