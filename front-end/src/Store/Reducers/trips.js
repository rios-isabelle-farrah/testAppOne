import { ADD_TRIP, ADD_TRIPS } from "../Actions/actionTypes";

let initialState = {};

const trips = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TRIPS:
      const nextTripState = {};
      payload.forEach((trip) => {
        nextTripState[trip.id] = trip;
      });
      return nextTripState;
    case ADD_TRIP:
      return { ...state, [payload.id]: payload };
    default:
      return state;
  }
};

export default trips;
