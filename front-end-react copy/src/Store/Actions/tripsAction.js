import { ADD_TRIP, ADD_TRIPS } from "./actionTypes";

export const addTrips = (payload) => {
  return { type: ADD_TRIPS, payload };
};

export const addTrip = (payload) => {
  return { type: ADD_TRIP, payload };
};
