import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";
import CircularIndeterminate from "./LoadingComponent";
import Container from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { numberFormat } from "./CurrencyFormat";
import ReactTooltip from "react-tooltip";
function RenderProgresBar({ dish }) {
  const now = (dish.saved / dish.target) * 100;
  if (now === "100")
    return (
      <Progress color="success" value="100">
        You did it!
      </Progress>
    );
  else if (now <= "70")
    return (
      <Progress color="success" value={now}>
        {now}%
      </Progress>
    );
  else
    return (
      <Progress color="success" value={now}>
        All most there! {now}%
      </Progress>
    );
}
function RenderMenuItem({ dish, onClick }) {
  return (
    <Card>
      <Link to={`/menu/${dish._id}`}>
        <CardImg
          width="100%"
          src="https://www.kindpng.com/picc/m/195-1959589_transparent-clickbait-circle-png-goal-setting-clipart-png.png"
          alt={dish.name}
        />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
      <CardBody>
        <RenderProgresBar dish={dish} />
      </CardBody>
    </Card>
  );
}

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddGoals = this.handleAddGoals.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleAddGoals(values) {
    this.props.postDish(
      this.props.user._id,
      values.name,
      values.target,
      values.time
    );
    this.toggleModal();
  }

  render() {
    const required = (val) => val && val.length;
    const menu = this.props.dishes.dishes.map((dish) => {
      // console.log(dish.user, "  ", this.props.user._id);
      return dish.user === this.props.user._id ? (
        !dish.archive ? (
          <div className="col-12 col-md-5 m-1" key={dish._id}>
            <RenderMenuItem dish={dish} onClick={this.props.onClick} />
          </div>
        ) : (
          <div></div>
        )
      ) : (
        <div></div>
      );
    });

    const antimenu = this.props.dishes.dishes.map((dish) => {
      // console.log(dish.user, "  ", this.props.user._id);
      return dish.user === this.props.user._id ? (
        dish.archive ? (
          <div className="col-12 col-md-5 m-1" key={dish._id}>
            <RenderMenuItem dish={dish} onClick={this.props.onClick} />
          </div>
        ) : (
          <div></div>
        )
      ) : (
        <div></div>
      );
    });

    if (this.props.dishes.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Container />
          </div>
        </div>
      );
    } else if (this.props.dishes.errMess) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>{this.props.dishes.errMess}</h4>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="bgcolor">
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/home">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>My Goals</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h1>Goals</h1>
                <hr />
                <h3>Projected Saving:{numberFormat(this.props.savings)}</h3>
              </div>
            </div>
            <div className="col-12">
              <h3>Active Goals</h3>
              <div className="row">{menu}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "left",
                  padding: "20px 20px 20px 20px",
                  margin: "0px auto",
                }}
              >
                <Button
                  outline
                  size="lg"
                  color="info"
                  onClick={this.toggleModal}
                >
                  <span className="fa fa-plus fa-lg">Add Goals</span>
                </Button>
              </div>
            </div>
            <hr />
            <div className="col-12">
              <h3>Archived Goals</h3>
            </div>
            <div className="row">{antimenu}</div>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>New Goal</ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={(values) => this.handleAddGoals(values)}>
                  <Row className="form-group">
                    <div className="col-12">
                      <Label htmlFor="name" md={6}>
                        Name of the Goal
                      </Label>
                    </div>
                    <div className="col-12 ">
                      <Control.text
                        model=".name"
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="form-control"
                        validators={{
                          required,
                        }}
                      />
                      {/* <Errors
                        className="text-danger"
                        model=".name"
                        show="touched"
                        messages={{
                          required: "Required",
                        }}
                      /> */}
                    </div>
                  </Row>
                  <Row className="form-group">
                    <div className="col-12">
                      <Label htmlFor="target" md={6}>
                        Target Price(in Rupees)
                      </Label>
                    </div>
                    <div className="col-12">
                      <Control.text
                        model=".target"
                        id="target"
                        name="target"
                        placeholder="Target"
                        className="form-control"
                        validators={{
                          required,
                        }}
                      />
                      {/* <Errors
                        className="text-danger"
                        model=".target"
                        show="touched"
                        messages={{
                          required: "Required",
                        }}
                      /> */}
                    </div>
                  </Row>
                  <Row className="form-group">
                    <div className="col-12">
                      <Label htmlFor="time" md={6}>
                        Time Span(in months)
                      </Label>
                    </div>
                    <div className="col-12">
                      <Control.text
                        model=".time"
                        id="time"
                        name="time"
                        placeholder="Time"
                        className="form-control"
                        validators={{
                          required,
                        }}
                      />
                      {/* <Errors
                        className="text-danger"
                        model=".time"
                        show="touched"
                        messages={{
                          required: "Required",
                        }}
                      /> */}
                    </div>
                  </Row>
                  <Row className="form-group">
                    <Col md={{ size: 10, offset: 1 }}>
                      <div style={{ display: "flex" }}>
                        <Button
                          style={{ marginLeft: "auto" }}
                          type="submit"
                          color="primary"
                        >
                          Add Goal
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </LocalForm>
              </ModalBody>
            </Modal>
          </div>
        </div>
      );
  }
}
export default Menu;
