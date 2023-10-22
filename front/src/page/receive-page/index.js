import "./index.css";

import Page from "../../component/page";
import Grid from "../../component/grid";

import Header from "../../container/header";
import Receive from "../../container/balance-recieve";

export default function Component() {
  return (
    <Page>
      <Grid>
        <Header title={"Receive"} />
        <Receive />
      </Grid>
    </Page>
  );
}
