import { Link } from "react-router-dom";
import "../Style/Expenses/ExpenseListItem.css";

const ExpenseListItem = ({ expense }) => {
  const { id, car_id, expense_type, amount_spent, date } = expense;

  let newDate = new Date(date);
  newDate.setDate(newDate.getDate(date) + 1);

  return (
    <tr className="row-penses">
      <td>{newDate.toLocaleDateString()}</td>
      <td>{expense_type}</td>
      <td>${amount_spent.toLocaleString()}</td>
      <td>
        <Link to={`/cars/${car_id}/expenses/${id}`}>
          <button className="edit-button">More</button>
        </Link>
      </td>
    </tr>
  );
};

export default ExpenseListItem;
