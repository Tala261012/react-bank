// страница с действиями пользователя, класс Notifications
import "./index.css";
import "../../style/style.css";

import { AuthContext } from "../../App";
import { useState, useContext, useEffect, Fragment } from "react";

import FormSmall from "../../component/form-small";
import Alert from "../../component/alert";
import Box from "../../component/box";
import InfoBox from "../../component/info-box";
import Skeleton from "../../component/skeleton";

import { getDateAgo } from "../../utils/scripts";

export default function Component() {
  const auth = useContext(AuthContext);

  const [list, setList] = useState([]);

  // console.log("auth inside Signup:", auth);

  const getData = async () => {
    // объект сессии, тут token & user
    const state = Object.entries(auth)[0][1];

    setAlertClass({ status: "progress", text: "Loading..." });

    try {
      const res = await fetch(
        `http://localhost:4000/notifications?token=${state.token}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setAlertClass({ status: "success", text: data.message });
        setList(data.list);
      } else {
        setAlertClass({ status: "error", text: data.message });
      }
    } catch (error) {
      setAlertClass({ status: "error", text: error.message });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [alertClass, setAlertClass] = useState({
    status: "disabled",
    text: "",
  });

  const getTypeDescription = (type) => {
    switch (type) {
      default:
        return type;
      case "PASSWORD_CHANGE":
        return "Password was changed";
      case "EMAIL_CHANGE":
        return "Email was changed";
      case "LOG_IN":
        return "Log in";
      case "LOG_OUT":
        return "Log out";
      case "GET_MONEY":
        return "You've got money";
      case "SEND_MONEY":
        return "You've sent money";
    }
  };

  const getTypeShort = (type) => {
    switch (type) {
      default:
        return type;
      case "PASSWORD_CHANGE":
      case "EMAIL_CHANGE":
        return "Warning";

      case "LOG_IN":
      case "LOG_OUT":
      case "GET_MONEY":
      case "SEND_MONEY":
        return "Announcement";
    }
  };

  const formattedList = list
    .map(({ id, date, type }) => ({
      id,
      date: getDateAgo(date),
      description: getTypeDescription(type),
      short: getTypeShort(type),
      icon: getTypeShort(type).toLowerCase(),
    }))
    .reverse();

  // console.log(formattedList);

  return (
    <FormSmall>
      {alertClass.status === "progress" && (
        <Fragment>
          <Box>
            <Skeleton subtitleClass={"on"} />
          </Box>
          <Box>
            <Skeleton subtitleClass={"on"} />
          </Box>
          <Box>
            <Skeleton subtitleClass={"on"} />
          </Box>
        </Fragment>
      )}

      {alertClass.status === "success" &&
        formattedList.map((item) => (
          <Fragment key={item.id}>
            <Box>
              <InfoBox
                image={item.icon}
                title={item.description}
                subtitleClass={"on"}
                subtitleTime={item.date}
                subtitleType={item.short}
              />
            </Box>
          </Fragment>
        ))}

      <Alert className={alertClass.status} alertText={alertClass.text} />
    </FormSmall>
  );
}
