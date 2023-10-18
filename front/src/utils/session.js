export const SESSION_KEY = "sessionReactBank";

export const saveSession = (session) => {
  try {
    // window.session = session; // чтоб можно было обратиться из любой страницы моего приложения
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    // console.log("session", session);

    return session;
  } catch (error) {
    console.log(error);
    // window.session = null;
    return {};
  }
};

export const loadSession = (session) => {
  try {
    session = JSON.parse(localStorage.getItem(SESSION_KEY));

    if (session) {
      return session;
      // window.session = session;
    } else {
      // window.session = null;
      return {};
    }
  } catch (error) {
    console.log(error);
    // window.session = null;
    return {};
  }
};

export const endSession = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
    console.log("deleted!");
  } catch (error) {
    console.log(error);
  } finally {
    // window.session = null;
    return {};
  }
};
