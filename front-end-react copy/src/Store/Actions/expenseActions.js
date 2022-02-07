import { ADD_EXPENSE, ADD_EXPENSES } from "./actionTypes";

export const addExpense = (payload) => {
  return { type: ADD_EXPENSE, payload };
};

export const addExpenses = (payload) => {
  return { type: ADD_EXPENSES, payload };
};
