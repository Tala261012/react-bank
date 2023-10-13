import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "./component/base";
import WellcomePage from "./page/wellcome-page";
import ErrorPage from "./page/error-page";
import SignupPage from "./page/signup-page";
import SigninPage from "./page/signin-page";
import RecoveryPage from "./page/recovery-page";
import RecoveryConfirmPage from "./page/recovery-confirm-page";
import SignupConfirmPage from "./page/signup-confirm-page";

function App() {
  return (
    <Base>
      <BrowserRouter>
        <Routes>
          <Route index element={<WellcomePage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/signup-confirm" element={<SignupConfirmPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
          <Route
            path="/recovery-confirm/:emailRecoveryConfirm"
            element={<RecoveryConfirmPage />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Base>
  );
}

export default App;
