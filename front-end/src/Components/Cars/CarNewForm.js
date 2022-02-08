import axios from "axios";
import { useState, useContext } from "react";
import { useHistory,Link} from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import "mdbreact/dist/css/mdb.css";
import "../../Components/Style/Cars/CarNewForm.css";

import { UserContext } from "../../Providers/UserProvider";

const API = apiURL();

function CarNewForm() {
  const user = useContext(UserContext);
  const [car, setCar] = useState({
    make: "",
    model: "",
    vin: "",
    year: "",
    odometer: "",
    doors: "",
    is_default: true,
    driver: "",
    uid: user && user.uid,
  });

  let history = useHistory();

  const addCar = async (newCar) => {
    try {
      await axios.post(`${API}/cars`, newCar);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCar({ ...car, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCar(car);
      history.push("/cars");
    } catch (error) {
      console.log(error);
    }
  };

  const { make, model, vin, year, odometer, doors, driver } = car;

  return (
    <div className="bckground">
      <div className="divform">
        <div className="cargif"></div>
        <form onSubmit={handleSubmit} className="form-newcar">
          <table className="table-newcar">
            <tbody>
              <tr className="row-driver">
                <td>
                  <label className="label-data" htmlFor="driver">
                    Driver:
                  </label>
                </td>
                <td className="driver">
                  <input
                    id="driver"
                    type="text"
                    value={driver}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr className="row-make">
                <td className="label-data">
                  <label htmlFor="make">Make:</label>
                </td>

                <td className="make-input">
                  <input
                    value={make}
                    type="text"
                    onChange={handleChange}
                    id="make"
                    placeholder=""
                    required
                  />
                </td>
              </tr>
              <tr className="row-model">
                <td className="model-data">
                  <label className="label-data" htmlFor="model">
                    Model:
                  </label>
                </td>
                <td>
                  <input
                    id="model"
                    className="model-input"
                    type="text"
                    value={model}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </td>
              </tr>
              <tr className="row-vin">
                <td>
                  <label className="label-data" htmlFor="vin">
                    Vin:
                  </label>
                </td>
                <td>
                  <input
                    id="vin"
                    className="vin-input"
                    type="text"
                    value={vin}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </td>
              </tr>
              <tr className="row-year">
                <td>
                  <label className="label-data" htmlFor="year">
                    year:
                  </label>
                </td>
                <td className="input-year">
                  <input
                    id="year"
                    type="number"
                    value={year}
                    min="1990"
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr className="row-odo">
                <td className="data-odo">
                  <label className="label-data" htmlFor="odometer">
                    Odometer:
                  </label>
                </td>

                <td className="input-odo">
                  <input
                    id="odometer"
                    type="number"
                    value={odometer}
                    min="0"
                    placeholder=""
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr className="row-doors">
                <td>
                  <label className="label-data" htmlFor="doors">
                    Doors:
                  </label>
                </td>
                <td className="input-doors">
                  <input
                    id="doors"
                    type="number"
                    value={doors}
                    min="2"
                    max="4"
                    placeholder=""
                    onChange={handleChange}
                    style={{ width: "50px" }}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="car-new-form-buttons">
            <button onClick={handleSubmit} className="submit" type="submit">
              Submit
            </button>
            <Link to={`/cars`}>
              <button className="cancel">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CarNewForm;
