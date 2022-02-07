import { Link } from "react-router-dom";
import "../Style/Trips/TripsListItem.css";

const TripsListItem = ({ trip }) => {
  const { car_id, id, date, miles, reason, business_use } = trip;

  let newDate = new Date(date);
  newDate.setDate(newDate.getDate(date) + 1);

  return (
    <tr className="tr-trips">
      <td>{newDate.toLocaleDateString()}</td>
      <td>{miles}</td>
      <td>{reason}</td>
      <td>{business_use ? "Yes" : "No"}</td>
      <td>
        <Link to={`/cars/${car_id}/trips/${id}/`}>
          <button className="edit-button">More</button>
        </Link>
      </td>
    </tr>
  );
};

export default TripsListItem;
