import React, { createContext, useReducer, useMemo, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loadSession, endSession, saveSession } from "./utils/session";
import Base from "./component/base";
import WellcomePage from "./page/wellcome-page";
import ErrorPage from "./page/error-page";
import SignupPage from "./page/signup-page";
import SigninPage from "./page/signin-page";
import RecoveryPage from "./page/recovery-page";
import RecoveryConfirmPage from "./page/recovery-confirm-page";
import SignupConfirmPage from "./page/signup-confirm-page";
import BalancePage from "./page/balance-page";

export const AuthContext = createContext({});

function initSession(session) {
  session = loadSession(session);
  if (session) {
    return session;
  } else {
    return {};
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return saveSession(action.data);
    case "logout":
      return endSession();
    default:
      return { ...state };
  }
}

function App() {
  const session = {};

  const [state, dispatch] = useReducer(reducer, session, initSession);

  const authContextData = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  console.log("auth", authContextData);

  const AuthRoute = ({ children }) => {
    const auth = useContext(AuthContext);

    if (!auth) return <ErrorPage />;

    const state = Object.entries(auth)[0][1];
    console.log(state);

    if (Object.keys(state).length !== 0) {
      if (state.user.isConfirm) {
        return <BalancePage />;
      } else {
        return <SignupConfirmPage />;
      }
    } else {
      return <>{children}</>;
    }
  };

  const PrivateRoute = ({ children }) => {
    const auth = useContext(AuthContext);

    if (!auth) return <ErrorPage />;

    const state = Object.entries(auth)[0][1];

    if (Object.keys(state).length !== 0) {
      if (state.user.isConfirm) {
        return <BalancePage />;
      } else {
        return <SignupConfirmPage />;
      }
    } else {
      return <WellcomePage />;
    }
  };

  return (
    <AuthContext.Provider value={authContextData}>
      <Base>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <AuthRoute>
                  <WellcomePage />
                </AuthRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <SignupPage />
                </AuthRoute>
              }
            />

            <Route
              path="/signup-confirm"
              element={
                <PrivateRoute>
                  <SignupConfirmPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <AuthRoute>
                  <SigninPage />
                </AuthRoute>
              }
            />
            <Route
              path="/recovery"
              element={
                <AuthRoute>
                  <RecoveryPage />
                </AuthRoute>
              }
            />
            <Route
              path="/recovery-confirm/:emailRecoveryConfirm"
              element={
                <AuthRoute>
                  <RecoveryConfirmPage />
                </AuthRoute>
              }
            />
            <Route
              path="/balance"
              element={
                <PrivateRoute>
                  <BalancePage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </Base>
    </AuthContext.Provider>
  );
}

export default App;
