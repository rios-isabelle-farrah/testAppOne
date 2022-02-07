const db = require("../db/config");

const getAllCars = async (uid) => {
  try {
    const query = "SELECT * FROM cars WHERE uid=$1";
    const allCars = await db.any(query, uid);
    return { status: true, payload: allCars };
  } catch (error) {
    return { status: false, payload: error };
  }
};

const getCar = async (id, uid) => {
  try {
    const query = "SELECT * FROM cars WHERE id=$1 and uid=$2";
    const car = await db.one(query, [id, uid]);
    return { status: true, payload: car };
  } catch (error) {
    return { status: false, payload: error };
  }
};

const addCar = async (car) => {
  const { make, model, vin, year, odometer, doors, is_default, uid, driver } =
    car;
  try {
    const query =
      "INSERT INTO cars (make, model, vin, year, odometer, doors, is_default, uid, driver) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
    const newCar = await db.one(query, [
      make,
      model,
      vin,
      year,
      odometer,
      doors,
      is_default,
      uid,
      driver,
    ]);
    return { status: true, payload: newCar };
  } catch (error) {
    return { status: false, payload: error };
  }
};

const deleteCar = async (id, uid) => {
  try {
    const query = "DELETE FROM cars WHERE id=$1 AND uid=$2 RETURNING *";
    const deletedCar = await db.one(query, [id, uid]);
    return { status: true, payload: deletedCar };
  } catch (error) {
    return { status: false, payload: error };
  }
};

const updateCar = async (id, body, uid) => {
  const { make, model, vin, year, odometer, doors, is_default, driver } = body;
  const queryOne = "SELECT * FROM cars WHERE uid=$1 AND id=$2";
  const authCheck = await db.any(queryOne, [uid, id]);
  if (authCheck.length) {
    try {
      const query =
        "UPDATE cars SET make=$1, model=$2, vin=$3, year=$4, odometer=$5, doors=$6, is_default=$7,driver=$8, uid=$9  WHERE id=$10 RETURNING *";
      const updatedCar = await db.one(query, [
        make,
        model,
        vin,
        year,
        odometer,
        doors,
        is_default,
        driver,
        uid,
        id,
      ]);
      return { status: true, payload: updatedCar };
    } catch (error) {
      return { status: false, payload: error };
    }
  } else {
    return { status: false, payload: "user doesn't match" };
  }
};

module.exports = { getAllCars, getCar, addCar, deleteCar, updateCar };
