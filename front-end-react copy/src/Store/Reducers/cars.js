import { ADD_CAR, ADD_CARS} from "../Actions/actionTypes";

let initialState = {};

const cars = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CARS:
      const nextCarState = {};
      payload.forEach((car) => {
        nextCarState[car.id] = car;
      });
      return nextCarState;
    case ADD_CAR:
      return { ...state, [payload.id]: payload };
    default:
      return state;
  }
};

export default cars;
