import { combineReducers } from "redux";
import carsReducer from "./cars";
import expensesReducer from "./expenses";
import tripsReducer from "./trips";

const rootReducers = combineReducers({
  cars: carsReducer,
  expenses: expensesReducer,
  trips: tripsReducer,
});

export default rootReducers;
