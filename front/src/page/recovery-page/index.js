import "./index.css";

import Page from "../../component/page";
import Grid from "../../component/grid";
import Heading from "../../component/heading";

import Header from "../../container/header";
import RecoveryPage from "../../container/recovery";

export default function Component() {
  return (
    <Page>
      <Grid>
        <Header />
        <Heading
          title="Recover password"
          description="Enter email to send recovery code"
        />
        <RecoveryPage />
      </Grid>
    </Page>
  );
}
