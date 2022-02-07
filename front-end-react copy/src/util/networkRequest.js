import axios from "axios";
import { apiURL } from "./apiURL";

const API = apiURL();

// Car Routes
export const getAllCarsFN = async (user) => {
  let { data } = await axios.get(`${API}/cars?uid=${user.uid}`);
  return data.payload;
};
export const updateCarById = async (id, updatedCar, user) => {
  if (id) {
    const editedCar = await axios.put(
      `${API}/cars/${id}?uid=${user.uid}`,
      updatedCar
    );
    return editedCar;
  }
};
export const deleteCarByID = async (id, user) => {
  if (id) {
    let { data } = await axios.delete(`${API}/cars/${id}?uid=${user.uid}`);
    return data.payload;
  }
};
export const postCar = async (newCar) => {
  let { data } = await axios.post(`${API}/cars`, newCar);
  return data.payload;
};

// Expenses Routes
export const getAllExpensesFN = async (id, user) => {
  if (id) {
    let { data } = await axios.get(
      `${API}/cars/${id}/expenses?uid=${user.uid}`
    );
    return data.payload;
  }
};
export const updateExpenseById = async (id, expense_id, updatedExpense) => {
  if (id) {
    const editedExpense = await axios.put(
      `${API}/cars/${id}/expenses/${expense_id}`,
      updatedExpense
    );
    return editedExpense;
  }
};

// Trips Routes
export const getAllTripsFN = async (id, user) => {
  if (id) {
    let { data } = await axios.get(`${API}/cars/${id}/trips?uid=${user.uid}`);
    return data.payload;
  }
};

export const updateTripById = async (id, trip_id, updatedTrip) => {
  if (id) {
    const editedTrip = await axios.put(
      `${API}/cars/${id}/trips/${trip_id}`,
      updatedTrip
    );
    return editedTrip;
  }
};
