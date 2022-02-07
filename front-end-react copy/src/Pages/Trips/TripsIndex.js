import Trips from "../../Components/Trips";
import { UserContext } from "../../Providers/UserProvider";
import { useHistory } from "react-router-dom";
import React, {useContext,useEffect} from "react";

const TripsIndex = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);
  return (
    <div className="trips-index-pages">
      <Trips />
    </div>
  );
};

export default TripsIndex;
