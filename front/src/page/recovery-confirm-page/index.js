import "./index.css";

import Page from "../../component/page";
import Grid from "../../component/grid";
import Heading from "../../component/heading";

import Header from "../../container/header";
import RecoveryConfirmPage from "../../container/recovery-confirm";

export default function Component() {
  return (
    <Page>
      <Grid>
        <Header />
        <Heading
          title="Recover password"
          description="Write the code you received"
        />
        <RecoveryConfirmPage />
      </Grid>
    </Page>
  );
}
