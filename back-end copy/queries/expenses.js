const db = require("../db/config");

const getAllExpenses = async (car_id, uid) => {
  const queryOne = "SELECT * FROM cars WHERE uid=$1 AND id=$2";
  const authCheck = await db.any(queryOne, [uid, car_id]);
  if (authCheck.length) {
    try {
      const queryTwo = "SELECT * FROM expenses WHERE car_id=$1";
      const allExpenses = await db.any(queryTwo, car_id);
      return { status: true, payload: allExpenses };
    } catch (error) {
      return { status: false, payload: error };
    }
  } else {
    return { status: false, payload: "user doesn't match" };
  }
};

const getExpense = async (id, car_id, uid) => {
  const queryOne = "SELECT * FROM cars WHERE uid=$1 AND id=$2";
  const authCheck = await db.any(queryOne, [uid, car_id]);
  if (authCheck.length) {
    try {
      const query = "SELECT * FROM expenses WHERE id=$1 AND car_id=$2 ";
      const expense = await db.one(query, [id, car_id]);
      return { status: true, payload: expense };
    } catch (error) {
      return { status: false, payload: error };
    }
  } else {
    return { status: false, payload: "user doesn't match" };
  }
};

const addExpense = async (body, car_id, uid) => {
  const { expense_type, business_use, amount_spent, date } = body;
  const queryOne = "SELECT * FROM cars WHERE uid=$1 AND id=$2";
  const authCheck = await db.any(queryOne, [uid, car_id]);

  if (authCheck.length) {
    try {
      const queryTwo =
        "INSERT INTO expenses (car_id, expense_type, business_use, amount_spent, date) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const newExpense = await db.one(queryTwo, [
        car_id,
        expense_type,
        business_use,
        amount_spent,
        date,
      ]);
      return { status: true, payload: newExpense };
    } catch (error) {
      return { status: false, payload: error };
    }
  } else {
    return { status: false, payload: "user doesn't match" };
  }
};

const deleteExpense = async (id, car_id, uid) => {
  const queryOne = "SELECT * FROM cars WHERE uid=$1 AND id=$2";
  const authCheck = await db.any(queryOne, [uid, car_id]);
  if (authCheck.length) {
    try {
      const query =
        "DELETE FROM expenses WHERE id=$1 AND car_id=$2 RETURNING *";
      const deletedExpense = await db.one(query, [id, car_id]);
      return { status: true, payload: deletedExpense };
    } catch (error) {
      return { status: false, payload: error };
    }
  } else {
    return { status: false, payload: "user doesn't match" };
  }
};

const updateExpense = async (id, expense, uid) => {
  const { car_id, expense_type, business_use, amount_spent, date } = expense;
  const queryOne = "SELECT * FROM cars WHERE uid=$1 AND id=$2";
  const authCheck = await db.any(queryOne, [uid, car_id]);
  if (authCheck.length) {
    try {
      const queryTwo =
        "UPDATE expenses SET car_id=$1, expense_type=$2, business_use=$3, amount_spent=$4, date=$5 WHERE id=$6 RETURNING *";
      const updatedExpense = await db.one(queryTwo, [
        car_id,
        expense_type,
        business_use,
        amount_spent,
        date,
        id,
      ]);
      return { status: true, payload: updatedExpense };
    } catch (error) {
      return { status: false, payload: error };
    }
  } else {
    return { status: false, payload: "user doesn't match" };
  }
};
module.exports = {
  getAllExpenses,
  getExpense,
  addExpense,
  deleteExpense,
  updateExpense,
};
