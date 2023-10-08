import "./index.css";

import Page from "../../component/page";
import Grid from "../../component/grid";
import Heading from "../../component/heading";

import Header from "../../container/header";
import Signin from "../../container/signin";

export default function Component() {
  return (
    <Page>
      <Grid>
        <Header />
        <Heading title="Sign in" description="Select login method" />
        <Signin />
      </Grid>
    </Page>
  );
}
