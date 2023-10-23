import "./index.css";

import Page from "../../component/page";
import Grid from "../../component/grid";

import Header from "../../container/header";
import Transaction from "../../container/transaction";

export default function Component() {
  return (
    <Page>
      <Grid>
        <Header title={"Transaction"} />
        <Transaction />
      </Grid>
    </Page>
  );
}
