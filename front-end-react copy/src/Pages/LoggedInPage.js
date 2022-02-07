import React, { useContext, useEffect } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useHistory } from "react-router-dom";
import CarsIndex from "./Cars/CarsIndex";
import "../Components/Style/LoggedInPage.css";

export const LoggedInPage = () => {
  const history = useHistory();
  const user = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  if (user) {
    return (
      <div>
        <CarsIndex />
      </div>
    );
  } else return <div> NOT LOGGED IN </div>;
};