import { useState, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { addCar } from "../../Store/Actions/carsActions";
import { useSelector, useDispatch } from "react-redux";
import { updateCarById } from "../../util/networkRequest";
import "../Style/Cars/CarEditForm.css";
import { UserContext } from "../../Providers/UserProvider";

function CarEditForm() {
  const user = useContext(UserContext);
  let { id } = useParams();
  let history = useHistory();
  const cars = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const car = cars[id];

  const [carInput, setCarInput] = useState({
    make: car.make,
    model: car.model,
    vin: car.vin,
    year: car.year,
    odometer: car.odometer,
    doors: car.doors,
    is_default: car.is_default,
    driver: car.driver,
  });

  const updateCar = async (updatedCar, id) => {
    try {
      const editedCar = await updateCarById(id, updatedCar, user);
      if (editedCar.data.status) {
        dispatch(addCar(editedCar.data.payload));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCarInput({ ...carInput, [e.target.id]: e.target.value });
  };

  const isDefaultCheckbox = (e) => {
    setCarInput({ ...carInput, is_default: !carInput.is_default });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCar(carInput, id);
    history.push(`/cars/${id}`);
  };

  const { make, model, vin, year, odometer, doors, is_default, driver } =
    carInput;

  return (
    <div className="wrap-edit">
    <div className="edit-form">
      <form className="car-edit-form-a" onSubmit={handleSubmit}>
        <label htmlFor="driver">Driver's Name:</label>
        <input
          value={driver}
          type="text"
          onChange={handleChange}
          id="driver"
          placeholder="Enter your name"
        />

        <label htmlFor="make">Make:</label>

        <input
          value={make}
          type="text"
          onChange={handleChange}
          id="make"
          placeholder="Enter make of the car"
        />
        <label htmlFor="model">Model:</label>
        <input
          id="model"
          type="text"
          value={model}
          onChange={handleChange}
          placeholder="Enter model of the car"
        />
        <label htmlFor="vin">VIN:</label>
        <input
          id="vin"
          type="text"
          value={vin}
          onChange={handleChange}
          placeholder="Enter VIN of the car"
        />
        <label htmlFor="year">year:</label>
        <input
          id="year"
          type="number"
          value={year}
          min="1990"
          onChange={handleChange}
        />
        <label htmlFor="odometer">Odometer:</label>
        <input
          id="odometer"
          type="number"
          value={odometer}
          min="0"
          placeholder="Enter the mileage on the odometer"
          onChange={handleChange}
        />
        <label htmlFor="doors">Doors:</label>
        <input
          id="doors"
          type="number"
          value={doors}
          min="2"
          max="4"
          placeholder="Enter the number doors of the car"
          onChange={handleChange}
        />

        <div className="form-check">
          <input
            id="is_default"
            value={is_default}
            className="form-check-input"
            type="radio"
            onChange={isDefaultCheckbox}
          />
          <label className="form-check-label" htmlFor="exampleRadios1">
            default car
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
          <Link to={`/cars/${id}`}>
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
}

export default CarEditForm;
