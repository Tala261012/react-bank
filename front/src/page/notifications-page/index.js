import "./index.css";

import Page from "../../component/page";
import Grid from "../../component/grid";

import Header from "../../container/header";
import Notifications from "../../container/notifications";

export default function Component() {
  return (
    <Page>
      <Grid>
        <Header title={"Notifications"} />
        <Notifications />
      </Grid>
    </Page>
  );
}
