import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import { UserContext } from "../../Providers/UserProvider";
import "../Style/Trips/TripEditForm.css";

const API = apiURL();

const TripEditForm = () => {
  const user = useContext(UserContext);
  let history = useHistory();
  const { id, trip_id } = useParams();
  const [trip, setTrip] = useState({
    date: "",
    miles: 0,
    reason: "",
    start_odometer: 0,
    stop_odometer: 0,
    business_use: false,
    favorite: false,
  });

  const updateTrip = async (updateTrip) => {
    try {
      if (user) {
        await axios.put(
          `${API}/cars/${id}/trips/${trip_id}?uid=${user.uid}`,
          updateTrip
        );
      }
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
  }, [trip_id, id, user]);

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.id]: e.target.value });
  };
  const businessCheckbox = (e) => {
    setTrip({ ...trip, business_use: !trip.business_use });
  };
  const favoriteCheckbox = (e) => {
    setTrip({ ...trip, favorite: !trip.favorite });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTrip(trip);
      history.push(`/cars/${id}/trips`);
    } catch (error) {
      console.log(error);
    }
  };

  const { date, miles, reason, business_use, favorite } = trip;

  return (
    <div className="edit-form-container">

      <form className="edit-form-trips" onSubmit={handleSubmit}>

        <label htmlFor="date">Date:</label>
        <input
          value={date}
          type="date"
          onChange={handleChange}
          id="date"
          placeholder="date"
        />
        <label htmlFor="miles">Miles:</label>
        <input
          id="miles"
          type="number"
          value={miles}
          onChange={handleChange}
          placeholder="Enter overall miles for the trip"
          required
        />
        <label htmlFor="reason">Reason:</label>
        <input
          id="reason"
          type="text"
          value={reason}
          onChange={handleChange}
          placeholder="Enter reason for your trip"
          required
        />

        <label htmlFor="business_use">Business Use:</label>
        <input
          id="business_use"
          type="checkbox"
          onChange={businessCheckbox}
          checked={business_use}
        />
        <label htmlFor="favorite">Favorite:</label>
        <input
          id="favorite"
          type="checkbox"
          onChange={favoriteCheckbox}
          checked={favorite}
        />

        <div className="edit-trip-buttons">
          <button className="new-submit" type="submit">Submit</button>
          <Link to={`/cars/${id}/trips`}>
            <button className="new-can">Cancel</button>

          </Link>
        </div>
      </form>
    </div>
  );
};

export default TripEditForm;
