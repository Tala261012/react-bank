import "./index.css";

import Page from "../../component/page";
import Grid from "../../component/grid";
import Heading from "../../component/heading";

import Header from "../../container/header";
import Signup from "../../container/signup";

export default function Component() {
  return (
    <Page>
      <Grid>
        <Header />
        <Heading title="Sign up" description="Choose a registration method" />
        <Signup />
      </Grid>
    </Page>
  );
}
