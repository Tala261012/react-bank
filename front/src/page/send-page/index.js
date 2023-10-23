import "./index.css";

import Page from "../../component/page";
import Grid from "../../component/grid";

import Header from "../../container/header";
import Send from "../../container/balance-send";

export default function Component() {
  return (
    <Page>
      <Grid>
        <Header title={"Send"} />
        <Send />
      </Grid>
    </Page>
  );
}
