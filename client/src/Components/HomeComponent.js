import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";

function Home(props) {
  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <header id="home">
        <div className="row banner">
          <div className="banner-text">
            <br />
            <h1 className="responsive-headline">
              Having trouble in keeping track of your expenses?
            </h1>
            <h3>Don't wory we have got you covered!!</h3>
            <hr />
            <ul className="social">
              <a
                href="http://localhost:3000/signupform?firstName=&lastName=&email=&password="
                className="button btn project-btn"
              >
                <i className="fa fa-sign-in"></i> Sign Up
              </a>
            </ul>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Home;
