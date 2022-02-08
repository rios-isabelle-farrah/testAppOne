import { ADD_TRIP, ADD_TRIPS } from "./actionTypes";

export const addTrip = (payload) => {
  return { type: ADD_TRIP, payload };
};

export const addTrips = (payload) => {
  return { type: ADD_TRIPS, payload };
};
