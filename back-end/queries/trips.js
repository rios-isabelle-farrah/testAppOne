const db = require("../db/config");

const getAllTrips = async (car_id, uid) => {
  const queryOne = "SELECT * FROM cars WHERE uid=$1 AND id=$2";
  const authCheck = await db.any(queryOne, [uid, car_id]);
  if (authCheck.length) {
    try {
      const queryTwo = "SELECT * FROM trips WHERE car_id=$1";
      const allTrips = await db.any(queryTwo, car_id);
      return { status: true, payload: allTrips };
    } catch (error) {
      return { status: false, payload: error };
    }
  } else {
    return { status: false, payload: "user doesn't match" };
  }
};

const getTrip = async (id, car_id, uid) => {
  const queryOne = "SELECT * FROM cars WHERE uid=$1 AND id=$2";
  const authCheck = await db.any(queryOne, [uid, car_id]);
  if (authCheck.length) {
    try {
      const query = "SELECT * FROM trips WHERE id=$1 AND car_id=$2";
      const trip = await db.one(query, [id, car_id]);
      return { status: true, payload: trip };
    } catch (error) {
      return { status: false, payload: error };
    }
  } else {
    return { status: false, payload: "user doesn't match" };
  }
};

const addTrip = async (body, car_id, uid) => {
  const { business_use, miles, date, reason, favorite } = body;
  const queryOne = "SELECT * FROM cars WHERE uid=$1 AND id=$2";
  const authCheck = await db.any(queryOne, [uid, car_id]);
  if (authCheck.length) {
    try {
      const query =
        "INSERT INTO trips ( car_id,business_use,miles,date,reason,favorite) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
      const newTrip = await db.one(query, [
        car_id,
        business_use,
        miles,
        date,
        reason,
        favorite,
      ]);
      return { status: true, payload: newTrip };
    } catch (error) {
      return { status: false, payload: error };
    }
  } else {
    return { status: false, payload: "user doesn't match" };
  }
};

const deleteTrip = async (id, car_id, uid) => {
  const queryOne = "SELECT * FROM cars WHERE uid=$1 AND id=$2";
  const authCheck = await db.any(queryOne, [uid, car_id]);
  if (authCheck.length) {
    try {
      const query = "DELETE FROM trips WHERE id=$1 AND car_id=$2 RETURNING *";
      const deletedTrip = await db.one(query, [id, car_id]);
      return { status: true, payload: deletedTrip };
    } catch (error) {
      return { status: false, payload: error };
    }
  } else {
    return { status: false, payload: "user doesn't match" };
  }
};

const updateTrip = async (id, body, uid) => {
  const { car_id, business_use, miles, date, reason, favorite } = body;
  const queryOne = "SELECT * FROM cars WHERE uid=$1 AND id=$2";
  const authCheck = await db.any(queryOne, [uid, car_id]);
  if (authCheck.length) {
    try {
      const query =
        "UPDATE trips SET car_id=$1, business_use=$2, miles=$3, date=$4,reason=$5,favorite=$6 WHERE id=$7 RETURNING *";
      const updatedTrip = await db.one(query, [
        car_id,
        business_use,
        miles,
        date,
        reason,
        favorite,
        id,
      ]);
      return { status: true, payload: updatedTrip };
    } catch (error) {
      return { status: false, payload: error };
    }
  } else {
    return { status: false, payload: "user doesn't match" };
  }
};

module.exports = { getAllTrips, getTrip, addTrip, deleteTrip, updateTrip };
