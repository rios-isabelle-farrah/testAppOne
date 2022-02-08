import React from "react";
import { Link } from "react-router-dom";
import "../../Components/Style/Cars/CarsListItem.css";
import filer from "../Images/file.png"
function CarsListItem({ carsArr }) {
  let showElement = false;

  return (
    <div className="list-cars">
      <ul
        style={
          showElement
            ? { display: "none" }
            : { display: "flex", justifyContent: "space-around" }
        }
        className="ul-show"
      >
        {carsArr.map((car, i) => {

          return (
            <li key={i} className="li-show">
              <div className="card-center">
                <img className="car-pic" src={filer}></img>
                <div className="make-model">
                  {car?.make} {car?.model}
                  <Link to={`/cars/${car?.id}`}>
                    <button className="showMe">Select</button>
                  </Link>
                </div>
                <br></br>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CarsListItem;
