import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from './footer';
import Navbar from './Navbar';


class Landing extends Component {
  render() {
    return (
      <div className = "Nav-Top">
      <div style={{ height: "75vh" }} className="valign-wrapper">
        <div className="row">
          <div className="col s12 dark-text center-align">
            <h4>
              <b>Automate your restaurant business with us </b>
              
            </h4>
            <p className="flow-text dark-text text-darken-1">
              A full-stack app created by the Fabulous Five from NYIT
              
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable navy accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable navy accent-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      </div>
    );
    
  }
}

export default Landing;