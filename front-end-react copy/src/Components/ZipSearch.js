

import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import fam from "./father.png"
 
// import famTwo from "./smallfam.jpeg"
// import CheckChoices from "./CheckChoices";
// import DisplayMap from "./DisplayMap";
  import "./ZipSearch.css";
let urlString = "";
let zipString = "";
const ZipSearch = () => {
  const [input, setInput] = useState();
  // const [inputQuery, setInputQuery] = useState();

  const [results, setResults] = useState([]);
  // const [parameters, setParameters] = useState(urlString);

  const queryString = (url) => {
    urlString = url;
    console.log(urlString);
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(input.length !== 5){
      alert('Zip code is not valid.')
    }
    zipString = "&zip=" + input;
    console.log("zip", zipString);
    try {
      // const res = await axios.get(
      //   `https://data.cityofnewyork.us/resource/cuzb-dmcd.json?${zipString}${urlString}`
      // );
      // const res = await axios.get(
      //   `https://data.ny.gov/resource/fymg-3wv3.json?${zipString}${urlString}`
      // );
 const res = await axios.get(
        `https://data.ny.gov/resource/ahjq-dbec.json?${zipString}${urlString}`
      );



      console.log(res.data);
      setResults(res.data);
    } catch (error) {
      console.log(error);
      //setResults([{location_name:"In order to Resources",address:"please enter a NYC Zip Code", city:" - Connect Now", state:"The City is Yours to Explore"}])
    }
    // setInput("");
  };

  return (
    <section className="main">
<div className="main-resources">
<div className="left-resources">

       {/* <img className="fam" src={fam}></img>  */}
       <h3 className="left-title">New York State Office of Children and Family Services</h3>
 
      <h4 className="nys">Search for programs currently funded by the New York State Office of Children and Family Services' (OCFS) Division of Child Welfare and Community Services (CWCS) by zipcode.</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="zip_code"></label>
        <input
          className="zip-input"
          id="zip_code"
          onChange={handleChange}
          value={input}
          type="text"
          placeholder="NYC Zip Code"
        />
        <button className="Resources-button"> Search</button>
      {/* <CheckChoices queryString={queryString}/> */}
      </form>
        </div>

</div>

      <section className="locales">
      <ul className="ul-locations">
        {results.map((resultObj) => {
          return (
            <div className="li-cover" >
              <li className="location">
                {/* <Link style={{ textDecoration: 'none' }} to={`/location/${resultObj.oid}`}>
                  {resultObj.agency}: {resultObj.location_name},{" "}
                  {resultObj.address}, {resultObj.program_description}, {resultObj.state}{" "}
                  {resultObj.zip}{" "}
                </Link> */}
                <div className="show">
                <h3>{resultObj.agency} </h3>
                <h4><strong>Description: </strong>{resultObj.program_description} </h4>
        
                <h5>  <strong>Address: </strong>{resultObj.address}   </h5>
                <h5>  <strong>Website: </strong>{resultObj.website.url}   </h5>
                 
                </div>
              







                
              </li>
              <br />
            </div>
          );
        })}
      </ul>
  
      </section>

    </section>
  );
};

export default ZipSearch;

// programs currently funded by the New York State Office of Children and Family Services' (OCFS) Division of Child Welfare and Community Services (CWCS). Data elements include the name of the provider agency, the business address and phone number, the county served, type of program, funding source, description of services, contract dates, contract number, funding level and the agencies website, where available





// <div className="right-resources">
// <img className="famTwo" src={famTwo}></img> 
// <h3 className="right-title">Developmental Disabilities Service Provider Agencies</h3>
// <h4 className="opwd"> Search for OPWDD supports and services: </h4>

// <form onSubmit={handleSubmit}>
// <label htmlFor="zip_code"></label>
// <input
//   className="zip-input"
 
//   type="text"
//   placeholder="NYC Zip Code"
// />
 
// </form>

// </div>