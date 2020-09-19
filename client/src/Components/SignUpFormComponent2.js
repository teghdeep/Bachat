import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  Card,
} from "reactstrap";
// import { registerUser } from "../redux/ActionCreators";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  handleAddUser() {
    console.log(this.firstname.value);

    const newUser = {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      income: this.income.value,
      familymembers: this.familymembers.value,
      username: this.username.value,
      password: this.password.value,
    };
    this.props.postUser(
      //   {
      //   firstname: this.firstname.value,
      //   lastname: this.lastname.value,
      //   income: this.income.value,
      //   familymembers: this.familymembers.value,
      //   username: this.username.value,
      //   password: this.password.value,
      // }
      newUser
    );

    // registerUser(newUser);
  }

  render() {
    return (
      // <div className="bgcolor">
      //   <Container>
      //     <Form onSubmit={this.handleAddUser}>
      //       <FormGroup>
      //         <Label htmlFor="firstname">Firstname</Label>
      //         <Input
      //           type="text"
      //           id="firstname"
      //           name="firstname"
      //           innerRef={(input) => (this.firstname = input)}
      //         />
      //       </FormGroup>
      //       <FormGroup>
      //         <Label htmlFor="lastname">Lastname</Label>
      //         <Input
      //           type="text"
      //           id="lastname"
      //           name="lastname"
      //           innerRef={(input) => (this.lastname = input)}
      //         />
      //       </FormGroup>
      //       <FormGroup>
      //         <Label htmlFor="username">Username</Label>
      //         <Input
      //           type="text"
      //           id="username"
      //           name="username"
      //           innerRef={(input) => (this.username = input)}
      //         />
      //       </FormGroup>
      //       <FormGroup>
      //         <Label htmlFor="password">Password</Label>
      //         <Input
      //           type="password"
      //           id="password"
      //           name="password"
      //           innerRef={(input) => (this.password = input)}
      //         />
      //       </FormGroup>
      //       <FormGroup>
      //         <Label htmlFor="income">Income</Label>
      //         <Input
      //           type="number"
      //           id="income"
      //           name="income"
      //           innerRef={(input) => (this.income = input)}
      //         />
      //       </FormGroup>
      //       <FormGroup>
      //         <Label htmlFor="familymembers">Family Members</Label>
      //         <Input
      //           type="text"
      //           id="familymembers"
      //           name="familymembers"
      //           innerRef={(input) => (this.familymembers = input)}
      //         />
      //       </FormGroup>
      //       <FormGroup check>
      //         <Label check>
      //           <Input
      //             type="checkbox"
      //             name="remember"
      //             innerRef={(input) => (this.remember = input)}
      //           />
      //           Remember me
      //         </Label>
      //       </FormGroup>
      //       <Button type="submit" value="submit" color="primary">
      //         SignUp
      //       </Button>
      //     </Form>
      //   </Container>
      // </div>

      <Container className="container">
        <div className="paper">
          <Card className="main">
            <Card className="icon">
              <i
                class="fa fa-lock fa-lg"
                aria-hidden="true"
                style={{ alignSelf: "center", color: "#fff", marginTop: "5px" }}
              ></i>
            </Card>
            <h2 style={{ alignSelf: "center", color: "#fff" }}>Sign Up</h2>
            <Form
              className="loginform"
              onSubmit={this.handleAddUser}
              action="/userhome"
            >
              <Col>
                <FormGroup>
                  <Label
                    style={{ fontSize: "22px", color: "#fff" }}
                    htmlfor="firstname"
                  >
                    Firstname
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    innerRef={(input) => (this.firstname = input)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label
                    style={{ fontSize: "22px", color: "#fff" }}
                    htmlfor="lastname"
                  >
                    Lastname
                  </Label>
                  <Input
                    type="text"
                    id="lastname"
                    name="lastname"
                    innerRef={(input) => (this.lastname = input)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label
                    style={{ fontSize: "22px", color: "#fff" }}
                    htmlFor="username"
                  >
                    Username(Email-ID)
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    innerRef={(input) => (this.username = input)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label
                    htmlFor="password"
                    style={{ fontSize: "22px", color: "#fff" }}
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    innerRef={(input) => (this.password = input)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label
                    htmlFor="income"
                    style={{ fontSize: "22px", color: "#fff" }}
                  >
                    Income(in Rupees)/Monthly
                  </Label>
                  <Input
                    type="number"
                    id="income"
                    name="income"
                    innerRef={(input) => (this.income = input)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label
                    htmlFor="familymembers"
                    style={{ fontSize: "22px", color: "#fff" }}
                  >
                    Family Members
                  </Label>
                  <Input
                    type="text"
                    id="familymembers"
                    name="familymembers"
                    innerRef={(input) => (this.familymembers = input)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check style={{ fontSize: "22px", color: "#fff" }}>
                    <Input
                      type="checkbox"
                      name="remember"
                      innerRef={(input) => (this.remember = input)}
                    />
                    Remember me
                  </Label>
                </FormGroup>
              </Col>
              <div style={{ display: "flex", padding: "20px 0px 20px 0px" }}>
                <Button
                  style={{ marginLeft: "50px" }}
                  type="submit"
                  value="submit"
                  color="primary"
                >
                  SignUp
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </Container>
    );
  }
}

export default SignUp;
