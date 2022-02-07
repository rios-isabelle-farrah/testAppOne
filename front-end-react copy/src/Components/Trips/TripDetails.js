import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Providers/UserProvider";
import { apiURL } from "../../util/apiURL";
import { useSelector } from "react-redux";
import "../../Components/Style/Trips/TripDetails.css";

const API = apiURL();

const TripDetails = () => {
  const entireState = useSelector((state) => state);
  const { cars } = entireState;
  const user = useContext(UserContext);
  let [trip, setTrip] = useState({});
  let { id, trip_id } = useParams();
  let history = useHistory();

  const deleteTrip = async () => {
    try {
      if (user) {
        await axios.delete(
          `${API}/cars/${id}/trips/${trip_id}?uid=${user.uid}`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteTrip();
      history.push(`/cars/${id}/trips`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        if (user) {
          const { data } = await axios.get(
            `${API}/cars/${id}/trips/${trip_id}?uid=${user.uid}`
          );
          setTrip(data.payload);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTrip();
  }, [id, trip_id, user]);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  const { date, miles, reason, business_use, favorite } = trip;
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate(date) + 1);

  if (!user) {
    return <div className="spinner-border"></div>;
  } else {
    return (
      <div className="trip-details">
        <p className="car-make">
          Car: {cars[id]?.make} {cars[id]?.model}
        </p>
        <p>Date: {newDate.toLocaleDateString()}</p>
        <p>Miles: {miles}</p>
        <p>Reason: {reason}</p>
        <p>Business Use: {business_use ? "Yes" : "No"}</p>
        <p>Favorite: {favorite ? "Yes" : "No"}</p>
        <div className="buttons">
          <button onClick={handleDelete}>Delete</button>
          <Link to={`/cars/${id}/trips`}>
            <button>Back</button>
          </Link>
          <Link to={`/cars/${id}/trips/${trip_id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
      </div>
    );
  }
};

export default TripDetails;
