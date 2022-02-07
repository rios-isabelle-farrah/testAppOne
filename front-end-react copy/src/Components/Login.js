import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCarsFN } from "../util/networkRequest";
import { UserContext } from "../Providers/UserProvider";
import { useHistory } from "react-router-dom";
import { signInWithGoogle, signup, login } from "../Services/Firebase";
import "../Components/Style/Login.css";
import { AiFillLock } from "react-icons/ai";
import { FcKey } from "react-icons/fc";
import { SiTwitter } from "react-icons/si";
import { FaInstagramSquare } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";

// import TripLogo from "./Images/hands.png";
import green from "./Images/greenLend.png";
import dsLogo from "./Images/logods.jpg";
import flyer from "./Images/flyer.png";
import whatlend from "./Images/whatlend.png";
import psg from "./Images/psg.png";
import squares from "./Images/squares.png";
import ZipSearch from "./ZipSearch";

const Login = () => {
  const entireState = useSelector((state) => state);
  const { cars } = entireState;
  const user = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState("");
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [signUpInput, setSignUpInput] = useState({
    newEmail: "",
    newPassword: "",
    passwordCheck: "",
  });
  const handleGoogle = () => {
    try {
      handleX();
      signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };
  const handleX = () => {
    setDisplaySignUp(false);
    setDisplayLogin(false);
  };
  const handleDisplayLogin = () => {
    if (displaySignUp) {
      setDisplaySignUp(!displaySignUp);
      setDisplayLogin(!displayLogin);
    } else {
      setDisplayLogin(!displayLogin);
    }
  };
  const handleDisplaySignIn = () => {
    setDisplaySignUp(!displaySignUp);
    setDisplayLogin(!displayLogin);
  };
  const handleLoginIn = async (e) => {
    e.preventDefault();
    try {
      await login(input.email, input.password);
    } catch (error) {
      if (
        String(error).includes(
          "The password is invalid or the user does not have a password."
        )
      ) {
        setError(
          "The password is invalid or the user does not have a password."
        );
      } else if (
        String(error).includes(
          "Access to this account has been temporarily disabled due to many failed login attempts."
        )
      ) {
        setError(
          "Access to this account has been temporarily disabled due to many failed login attempts."
        );
      } else {
        window.alert(error);
        console.log(error);
      }
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(signUpInput.newEmail, signUpInput.newPassword);
    } catch (error) {
      if (String(error).includes("The email address is badly formatted.")) {
        setError("The email address is badly formatted.");
      } else if (
        String(error).includes(
          "The email address is already in use by another account"
        )
      ) {
        setError("The email address is already in use by another account.");
      } else {
        window.alert(error);
        console.log(error);
      }
    }
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
    setError("");
  };
  const handleSignUpChange = (e) => {
    setSignUpInput({ ...signUpInput, [e.target.id]: e.target.value });
    setError("");
  };

  useEffect(() => {
    if (user) {
      history.push("/cars");
    }
  }, [user, history]);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        if (!cars) {
          const res = await getAllCarsFN(user);
          // dispatch(addCars(res));
          if (res.length) {
            //FIXME: The current code does nothing
            history.push(`/cars`);
            // let filterArray = res.filter((el) => el.is_default === true);
            // history.push(`/cars/${filterArray[filterArray.length - 1].id}`);
          } else {
            history.push("/cars/car/new");
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchAllCars();
  }, [cars, user, history]);

  return (
    <div className="sign-box">
      <div className="top">
        <div className="sunydiv">
          <img
            className="ds-logo"
            src={dsLogo}
            style={{
              height: "47px",
              // width: "215px",
              // marginTop: "140px",
              // marginLeft: "30px",
            }}
            alt={"Logo"}
          />
        </div>

        <div className="social-icons">
          <FcKey />
          <SiTwitter />
          <FaInstagramSquare />
          <GrFacebook />
        </div>
        <div className="icon-login">
          <button className="sign-in" onClick={handleDisplayLogin}>
            <AiFillLock />
            Advocate <br></br>Sign In
          </button>
        </div>
      </div>

      <nav className="nav-login">
        <div className="lend-stretch">
          <img className="green-logo" src={green} alt={"Logo"} />
         
        </div>
      </nav>

      {/* --------------------------------- */}
      {/* Log in */}

      <ul className="nav-ul">
        <li>
          <a href="#more"> more about LEND </a>
        </li>
        <li>
          <a href="#trainings"> trainings </a>
        </li>
        <li>
          <a href="#parent"> parent support </a>
        </li>
       
        <li>
        <div class="dropdown">
  <button class="dropbtn">Dropdown</button>
  <div class="dropdown-content">
  <a href="#resources">OPWDD </a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
  </div>
</div>

          
     
        </li>
      </ul>

      {displayLogin && (
        <form className="logInForm" onSubmit={handleLoginIn}>
          {error !== "" && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button
            type="button"
            className="btn-close x-button"
            onClick={handleX}
            aria-label="Close"
          ></button>
          <div>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleDisplaySignIn}
            >
              New User
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleGoogle}
            >
              Google Sign in
            </button>
          </div>
          <legend>Log In</legend>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              onChange={handleChange}
              value={input.email}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="...@url.com"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={handleChange}
              value={input.password}
              type="password"
              className="form-control"
              id="password"
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}

      {displaySignUp && (
        <form className="signUpForm" onSubmit={handleSignUp}>
          {error !== "" && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button
            type="button"
            className="btn-close x-button"
            onClick={handleX}
            aria-label="Close"
          ></button>
          <div>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleGoogle}
            >
              Google Sign in
            </button>
          </div>
          <legend>Sign Up</legend>
          <div className="mb-3">
            <label htmlFor="newEmail" className="form-label">
              Email address
            </label>
            <input
              onChange={handleSignUpChange}
              value={signUpInput.newEmail}
              type="email"
              className="form-control"
              id="newEmail"
              aria-describedby="emailHelp"
              placeholder="...@url.com"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              Password
            </label>
            <input
              onChange={handleSignUpChange}
              value={signUpInput.newPassword}
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="6 characters minimum"
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
     

      {/* --------------------------------------- */}
      <div className="login-body">
      <section className="grabber">
        <div className="left-MJ">
          {/* <img className="giffy" src={giffy} alt={psg} /> */}
          <div className="giffy"></div>
          <img className="psgz" src="https://cdn.givecloud.co/s/files/1/0000/0613/files/diverse-adults-virtual-meeting-istock-1254704747.jpg" alt={psg} />
        </div>

        <div className="right">
          <img className="psg" src={psg} alt={psg} />
        </div>
      </section>
 
        <a name="more">
          <section className="more-lend">
            <img className="whatlend" src={whatlend} alt={"whatlend"} />
          </section>
        </a>
        <a name="parent">
          <section className="parent"> </section>
        </a>
        <a name="trainings">
          <section className="train">
          <section className="squares">
   <div className="squares-img" >
   <a href="https://www.eventbrite.com/e/lend-downstate-parent-support-group-advocacy-training-series-tickets-258372578337" target="blank"> 
<button className="eventbrite">Register Here</button>
</a>
     </div>
        </section>
          </section>
        </a>
        <a name="resources">
          <section className="resources">
            <ZipSearch />
          </section>
        </a>
      </div>
    </div>
  );
};

export default Login;
