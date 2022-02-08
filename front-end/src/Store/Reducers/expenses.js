import { ADD_EXPENSE, ADD_EXPENSES } from "../Actions/actionTypes";

let initialState = {};

const expenses = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_EXPENSES:
      const nextExpenseState = {};
      payload.forEach((expense) => {
        nextExpenseState[expense.id] = expense;
      });
      return nextExpenseState;
    case ADD_EXPENSE:
      return { ...state, [payload.id]: payload };
    default:
      return state;
  }
};

export default expenses;
