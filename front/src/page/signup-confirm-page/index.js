import "./index.css";

import Page from "../../component/page";
import Grid from "../../component/grid";
import Heading from "../../component/heading";

import Header from "../../container/header";
import SignupConfirm from "../../container/signup-confirm";

export default function Component() {
  return (
    <Page>
      <Grid>
        <Header />
        <Heading
          title="Confirm account"
          description="Write the code you received"
        />
        <SignupConfirm />
      </Grid>
    </Page>
  );
}
