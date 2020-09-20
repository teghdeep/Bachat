import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Media,
} from "reactstrap";
import { Link } from "react-router-dom";
import CircularIndeterminate from "./LoadingComponent";
import Container from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { Fade, Stagger } from "react-animation-components";

const RenderLeader = ({ item }) => {
  return (
    // <Stagger in>
    //   <Fade in>
    //     <Media>
    //       <div className="col-12 col-sm-1">
    //         <Media
    //           object
    //           src={baseUrl + "images/" + item.image}
    //           alt={item.name}
    //           height="80"
    //           width="80"
    //         />
    //       </div>
    //       <div className="col-sm-10">
    //         <Media heading>{item.name}</Media>
    //         <Media text>{item.designation}</Media>
    //         <Media body>{item.description}</Media>
    //         <br />
    //         <br />
    //       </div>
    //     </Media>
    //   </Fade>
    // </Stagger>
    <React.Fragment>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-0 shadow">
          <img src={item.image} class="card-img-top" alt={item.name} />
          <div class="card-body text-center">
            <h5 class="card-title mb-0">{item.abbr}</h5>
            <div class="card-text text-black-50">{item.name}</div>
            <div class="card-text text-black-50">{item.designation}</div>
            <ul class="social mb-0 list-inline mt-3">
              <li class="list-inline-item">
                <a href="#" class="social-link">
                  <i class="fa fa-facebook-f"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="social-link">
                  <i class="fa fa-twitter"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="social-link">
                  <i class="fa fa-instagram"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href={item.linkedin} class="social-link">
                  <i class="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>

          {/* <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-0 shadow">
              <img
                src="https://source.unsplash.com/9UVmlIb0wJU/500x350"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body text-center">
                <h5 class="card-title mb-0">Team Member</h5>
                <div class="card-text text-black-50">Web Developer</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

function About(props) {
  const leadersfunc = props.leaders.leaders.map((leader) => {
    return <RenderLeader item={leader} />;
  });

  if (props.leaders.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Container />
        </div>
      </div>
    );
  } else if (props.leaders.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{props.leaders.errMess}</h4>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bgcolor">
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/home">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>About Us</BreadcrumbItem>
            </Breadcrumb>
            {/* <div className="col-12">
              <h3>About Us</h3>
              <hr />
            </div> */}
          </div>
        </div>
        {/* <div className="row row-content">
            <div className="col-12 col-md-6">
              <h2>Our History</h2>
              <p>
                Started in 2010, Ristorante con Fusion quickly established
                itself as a culinary icon par excellence in Hong Kong. With its
                unique brand of world fusion cuisine that can be found nowhere
                else, it enjoys patronage from the A-list clientele in Hong
                Kong. Featuring four of the best three-star Michelin chefs in
                the world, you never know what will arrive on your plate the
                next time you visit us.
              </p>
              <p>
                The restaurant traces its humble beginnings to{" "}
                <em>The Frying Pan</em>, a successful chain started by our CEO,
                Mr. Peter Pan, that featured for the first time the world's best
                cuisines in a pan.
              </p>
            </div>
            <div className="col-12 col-md-5">
              <Card>
                <CardHeader className="bg-primary text-white">
                  Facts At a Glance
                </CardHeader>
                <CardBody>
                  <dl className="row p-1">
                    <dt className="col-6">Started</dt>
                    <dd className="col-6">3 Feb. 2013</dd>
                    <dt className="col-6">Major Stake Holder</dt>
                    <dd className="col-6">HK Fine Foods Inc.</dd>
                    <dt className="col-6">Last Year's Turnover</dt>
                    <dd className="col-6">$1,250,375</dd>
                    <dt className="col-6">Employees</dt>
                    <dd className="col-6">40</dd>
                  </dl>
                </CardBody>
              </Card>
            </div>
            <div className="col-12">
              <Card>
                <CardBody className="bg-faded">
                  <blockquote className="blockquote">
                    <p className="mb-0">
                      You better cut the pizza in four pieces because I'm not
                      hungry enough to eat six.
                    </p>
                    <footer className="blockquote-footer">
                      Yogi Berra,
                      <cite title="Source Title">
                        The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion
                        Books, 2014
                      </cite>
                    </footer>
                  </blockquote>
                </CardBody>
              </Card>
            </div>
          </div>*/}
        <div className="row row-content">
          <div className="col-12">
            <h2>About Creators</h2>
          </div>
          <div class="container">
            <div class="row">{leadersfunc}</div>
          </div>
        </div>
      </div>
      //   </div>
    );
  }
}

export default About;
