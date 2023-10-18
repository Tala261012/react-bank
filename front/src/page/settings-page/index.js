import "./index.css";

import Page from "../../component/page";
import Grid from "../../component/grid";
import Form from "../../component/form";
import Line from "../../component/line";

import Header from "../../container/header";
import SettingsEmail from "../../container/settings-email";
import SettingsPassword from "../../container/settings-password";
import Logout from "../../container/logout";

export default function Component() {
  return (
    <Page>
      <Grid>
        <Header title={"Settings"} />
        <Form>
          <SettingsEmail />
          <Line />
          <SettingsPassword />
          <Line />
          <Logout />
        </Form>
      </Grid>
    </Page>
  );
}
