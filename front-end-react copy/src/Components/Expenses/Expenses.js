import React from "react";
import { useEffect, useContext } from "react";
import ExpenseListItem from "./ExpenseListItem";
import { Link, useParams, useHistory } from "react-router-dom";
import { getAllExpensesFN } from "../../util/networkRequest";
import { useDispatch, useSelector } from "react-redux";
import { addExpenses } from "../../Store/Actions/expenseActions";
import { UserContext } from "../../Providers/UserProvider";
import "../Style/Expenses/Expenses.css";

const Expenses = () => {
  const user = useContext(UserContext);
  let history = useHistory();
  const entireState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { cars, expenses } = entireState;
  const { id } = useParams();
  const expenseArr = Object.values(expenses);

  useEffect(() => {
    const fetchAllExpenses = async () => {
      try {
        if (user) {
          let res = await getAllExpensesFN(id, user);
          dispatch(addExpenses(res));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllExpenses();
  }, [dispatch, id, user]);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div className="main-e-div">
      <h2>
        {cars[id]?.make} {cars[id]?.model} Expenses
      </h2>
      <Link to={`/cars/${id}/expenses/expense/new`}>
        <button className="expense-new-button">Add New Expense</button>
      </Link>
      <table className="expenses-main-table">
        <thead>
          <tr className="head-row">
            <th className="head-date">Date</th>
            <th className="head-type">Expense Type</th>
            <th className="head-amount">Amount</th>
            <th className="head-edit">Show</th>
          </tr>
        </thead>
        <tbody>
          {expenseArr.map((expense, i) => {
            return <ExpenseListItem key={i} expense={expense} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
