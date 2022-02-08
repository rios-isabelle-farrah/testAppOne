import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import "../Modals/ModalStyle/ModalNewExpenseForm.css";
import { apiURL } from "../../../util/apiURL";
import { UserContext } from "../../../Providers/UserProvider";

const API = apiURL();
const ModalNewExpenseForm = ({ setShowEForm, showEForm }) => {
  const user = useContext(UserContext);
  let history = useHistory();
  const { id } = useParams();
  const [expense, setExpense] = useState({
    expense_type: "",
    business_use: false,
    amount_spent: "",
    date: new Date(),
  });

  const addExpense = async (newExpense) => {
    try {
      if (user) {
        await axios.post(
          `${API}/cars/${id}/expenses?uid=${user.uid}`,
          newExpense
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.id]: e.target.value });
  };
  const handleSelectChange = (e) => {
    setExpense({ ...expense, expense_type: e.target.value });
  };
  const handleCheckboxChange = () => {
    setExpense({ ...expense, business_use: !expense.business_use });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense(expense);
      history.push(`/cars/${id}/expenses`);
    } catch (error) {
      console.log(error);
    }
  };

  const { business_use, amount_spent, date } = expense;
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate(date) + 1);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div className="main-left-div">
      <form className="form-expense-modal" onSubmit={handleSubmit}>
        {/* Car Expenses */}
        <table className="expense-table-one">
          <tbody>
            <tr>
              <td className="data-td">
                <label htmlFor="date">Date:</label>
              </td>
              <td className="data-td">
                <input
                  value={date}
                  // value="1111-11-11"
                  type="date"
                  onChange={handleChange}
                  id="date"
                  placeholder="Enter date"
                />
              </td>
            </tr>
            <tr>
              <td className="data-td">
                <label> Meeting type:</label>
              </td>
              <td className="data-td">
                <select onChange={handleSelectChange}>
                  <option value="" defaultValue></option>
                  <option name="gas" value="Gas">
                   IEP
                  </option>
                  <option name="repairs" value="Repairs">
                  Telephone Call
                  </option>
                  <option name="car_insurance" value="Car Insurance">
               Email
                  </option>
                  <option name="oil_change" value="Oil Change">
               turning 5
                  </option>
                  <option name="registration_fees" value="Registration Fees">
                    Registration Fees
                  </option>
                  <option name="depreciation" value="Depreciation">
                    Depreciation
                  </option>
                  <option name="rent" value="Car Rental">
                    Car Rental
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="data-td">
                <label htmlFor="amount_spent">Amount:</label>
              </td>
              <td className="data-td">
                <textarea
                  id="amount_spent"
                  type="text"
                  value={amount_spent}
                  min="1"
                  onChange={handleChange}
                  required
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
                  onChange={handleCheckboxChange}
                  checked={business_use}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="expense-buttons">
          <button className="sub" type="submit"></button>
          <Link to={`/cars/${id}`}>
            <button
              onClick={() => setShowEForm(!showEForm)}
              className="button-can"
            ></button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ModalNewExpenseForm;
