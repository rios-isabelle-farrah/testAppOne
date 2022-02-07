import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import { UserContext } from "../../Providers/UserProvider";
import "../Style/Trips/TripNewForm.css";

const API = apiURL();

const TripNewForm = () => {
  const user = useContext(UserContext);
  let history = useHistory();
  const { id } = useParams();
  const [trip, setTrip] = useState({
    date: new Date(),
    miles: 0,
    reason: "",
    business_use: false,
    favorite: false,
  });

  const addTrip = async (newTrip) => {
    try {
      if (user) {
        await axios.post(`${API}/cars/${id}/trips?uid=${user.uid}`, newTrip);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      await addTrip(trip);
      history.push(`/cars/${id}/trips`);
    } catch (error) {
      console.log(error);
    }
  };

  const { date, miles, reason, business_use, favorite } = trip;

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div className="overall-div">
      <div className="trips-show-table">
        <form className="form-trip" onSubmit={handleSubmit}>
          <h2> Car Mileage</h2>
          <table className="trip-table-one">
            <tbody>
              <tr>
                <td className="data-td">
                  <label htmlFor="date">Date:</label>
                </td>
                <td className="data-td">
                  <input
                    value={date}
                    type="date"
                    onChange={handleChange}
                    id="date"
                    placeholder="date"
                  />
                </td>
              </tr>
              <tr>
                <td className="data-td">
                  <label htmlFor="amount_spent">Miles:</label>
                </td>
                <td className="data-td">
                  <input
                    id="miles"
                    type="number"
                    value={miles}
                    min="0"
                    onChange={handleChange}
                    placeholder="Enter overall miles for the trip"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="data-td">
                  <label htmlFor="reason">Reason:</label>
                </td>
                <td className="data-td">
                  <input
                    id="reason"
                    type="text"
                    value={reason}
                    onChange={handleChange}
                    placeholder="Reason for trip"
                  />
                </td>
              </tr>

              <tr>
                <td className="data-td">
                  <label htmlFor="business_use">Business Use:</label>
                </td>
                <td className="data-td">
                  <input
                    id="business_use"
                    type="checkbox"
                    onChange={businessCheckbox}
                    checked={business_use}
                  />
                </td>
              </tr>

              <tr>
                <td className="data-td">
                  <label htmlFor="favorite">Favorite:</label>
                </td>
                <td className="data-td">
                  <input
                    id="favorite"
                    type="checkbox"
                    onChange={favoriteCheckbox}
                    checked={favorite}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="trip-buttons">
            <button className="sub" type="submit"></button>
            <Link to={`/cars/${id}`}>
              <button className="button-can"></button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripNewForm;
