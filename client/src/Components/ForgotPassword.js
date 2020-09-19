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
// import { ValueSource } from "react-avatar";

class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleForgot = this.handleForgot.bind(this);
  }

  handleForgot() {
    const newUser = {
      username: this.username.value,
    };
    console.log(newUser);

    this.props.forgotPassword(
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
  }

  render() {
    return (
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
            <h2 style={{ alignSelf: "center", color: "#fff" }}>
              Forgot Password
            </h2>
            <Form
              className="loginform"
              onSubmit={this.handleForgot}
              action="/home"
            >
              <Col>
                <FormGroup>
                  <Label
                    style={{ fontSize: "22px", color: "#fff" }}
                    htmlfor="username"
                  >
                    Username
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
                    style={{ fontSize: "22px", color: "#fff" }}
                    htmlfor="newPassword"
                  >
                    New password
                  </Label>
                  <Input
                    type="text"
                    id="newpassword"
                    name="newPassword"
                    innerRef={(input) => (this.newPassword = input)}
                  />
                </FormGroup>
              </Col>
              <div style={{ display: "flex", padding: "20px 0px 20px 0px" }}>
                <Button
                  style={{ marginLeft: "50px" }}
                  type="submit"
                  value="submit"
                  color="primary"
                >
                  Submit Request
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </Container>
    );
  }
}

export default ForgotPass;
