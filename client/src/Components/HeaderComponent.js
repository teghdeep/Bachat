import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { NavLink, Redirect, Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleLogin(event) {
    this.toggleModal();
    this.props.loginUser({
      username: this.username.value,
      password: this.password.value,
    });
    event.preventDefault();
  }

  handleLogout() {
    this.props.logoutUser();
  }

  RenderList = () => {
    if (this.props.auth.isAuthenticated) {
      return (
        <React.Fragment>
          <NavItem>
            <NavLink className="nav-link" to="/userhome">
              <span className="fa fa-home fa-lg"></span> Home
            </NavLink>
          </NavItem>

          {/* <NavItem>
            <NavLink className="nav-link" to="/profile">
              <span className="fa fa-user-circle"></span> Profile
            </NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink className="nav-link" to="/menu">
              <span className="fa fa-bullseye fa-lg"></span> My Goals
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/aboutus">
              <span className="fa fa-info fa-lg"></span> About Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/contactus">
              <span className="fa fa-address-card fa-lg"></span> Contact Us
            </NavLink>
          </NavItem>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <NavItem>
            <NavLink className="nav-link" to="/home">
              <span className="fa fa-home fa-lg"></span> Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/contactus">
              <span className="fa fa-address-card fa-lg"></span> Contact Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/aboutus">
              <span className="fa fa-info fa-lg"></span> About Us
            </NavLink>
          </NavItem>
        </React.Fragment>
      );
    }
  };
 
  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand
              className="mr-auto"
              href={this.props.auth.isAuthenticated ? "/userhome" : "/home"}
            >
              <img
                src="assets/images/Icons-Cost-Saving.png"
                height="50"
                width="80"
                alt="costcut"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <this.RenderList />
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {!this.props.auth.isAuthenticated ? (
                    <Button outline onClick={this.toggleModal}>
                      <span className="fa fa-sign-in fa-lg"></span> Login
                      {this.props.auth.isFetching ? (
                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                      ) : null}
                    </Button>
                  ) : (
                    <div>
                      <div className="navbar-text mr-3">
                        <h6>
                         <Link to="/profile">
                         <span className="fa fa-user-circle fa-lg"></span>{" "}
                          {this.props.auth.user.username}  
                        </Link> </h6>
                        
                      </div>
                      <Button color="info"
                        style={{color:"white" }}
                       onClick={this.handleLogout}>
                        <span className="fa fa-sign-out fa-lg"></span> Logout
                        {this.props.auth.isFetching ? (
                          <span className="fa fa-spinner fa-pulse fa-fw"></span>
                        ) : null}
                      </Button>
                    </div>
                  )}
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        {/* <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante Con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron> */}
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin} action="/userhome">
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              {/* <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={(input) => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup> */}
              <FormGroup>
                <a href="http://localhost:3000/signupform?firstName=&lastName=&email=&password=">
                  New User ? SignUp!!
                </a>
              </FormGroup>
              {/* <FormGroup>
                <a href="http://localhost:3000/forgotpassword?userName=&newPassword=">
                  Forgot Password??
                </a>
              </FormGroup> */}
              <Button type="submit" value="submit" color="primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
