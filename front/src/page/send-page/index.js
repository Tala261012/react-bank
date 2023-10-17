import "./index.css";

import Page from "../../component/page";
import Grid from "../../component/grid";

import Header from "../../container/header";

export default function Component() {
  return (
    <Page>
      <Grid>
        <Header title={"Send"} />
      </Grid>
    </Page>
  );
}
