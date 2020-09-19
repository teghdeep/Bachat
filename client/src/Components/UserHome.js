import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Table } from "reactstrap";
import CircularIndeterminate from "./LoadingComponent";
import Container from "./LoadingComponent";
import { Fade, Stagger } from "react-animation-components";
import { deleteComment } from "../redux/ActionCreators";
import { numberFormat } from "./CurrencyFormat";

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isModalOpen2: false,
      commentId: "",
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleEditExpense = this.handleEditExpense.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  toggleModal2(value) {
    this.setState({
      isModalOpen2: !this.state.isModalOpen2,
      commentId: value,
    });
  }

  handleDeleteExp(commentId) {
    this.props.deleteComment(commentId);
  }
  handleEditExpense(values) {
    const expense = {
      commentId: this.state.commentId,
      actual: values.actual,
    };

    this.props.editComment(expense);
    console.log(expense);
    this.toggleModal2();
  }

  handleAddExpense(values) {
    const expense = {
      user: this.props.user._id,
      expense: values.expense,
      ideal: values.ideal,
      actual: values.actual,
    };

    this.props.postComment(expense);
    console.log(expense);
    this.toggleModal();
  }

  render() {
    const required = (val) => val && val.length;
    let count = 1;
    console.log(this.props.savings);
    // let sum_exp = 0;
    const data = Array.from(this.props.comments.comments);
    var expense;
    // const exp = data.map((comment) => {
    //   {
    //     sum_exp += comment.actual;
    //   }
    // });
    <Table hover responsive>
      <tbody>
        {
          (expense = data.map((comment) => {
            console.log(this.props.user._id, "   ", comment.user._id);
            return this.props.user._id === comment.user._id ? (
              <div className="col-12" key={comment._id}>
                <tr>
                  <th style={{ width: "150px" }} scope="row">
                    {count++}
                  </th>
                  <td style={{ width: "250px" }}>{comment.expense}</td>
                  <td style={{ width: "350px" }}>
                    {numberFormat(comment.actual)}
                  </td>
                  <td style={{ width: "250px" }}>
                    {numberFormat(comment.ideal)}
                  </td>
                  <td>
                    <i
                      className="fa fa-trash-o fa-lg trashcan"
                      aria-hidden="true"
                      onClick={() => this.props.deleteComment(comment._id)}
                    ></i>
                    {"   "}
                    <i
                      className="fa fa-pencil fa-lg editicon"
                      aria-hidden="true"
                      onClick={() => this.toggleModal2(comment._id)}
                    ></i>
                  </td>
                </tr>
              </div>
            ) : (
              <div></div>
            );
          }))
        }
      </tbody>
    </Table>;
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            {/* <CircularIndeterminate /> */}
            <br />
            <Container />
            <br />
            <br />
            <br />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>{this.props.errMess}</h4>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bgcolor">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <br />
                <h3>Home</h3>
                <hr />
              </div>
            </div>
            <Card style={{ padding: "50px, 0px, 50px, 0px" }}>
              <div className="row">
                <div className="col-12 ">
                  <CardHeader className="bg-info text-white">
                    <h3>
                      Welcome : {this.props.user.firstname}{" "}
                      {this.props.user.lastname}
                    </h3>
                  </CardHeader>
                </div>
              </div>
              <CardBody>
                <dl className="row p-1">
                  <dt className="col-6">
                    <h5>Income : {numberFormat(this.props.user.income)}</h5>
                  </dt>
                  <dd className="col-6">
                    <h5>
                      Savings : {numberFormat(this.props.savings)}
                      {/* {this.props.user.savings} */}
                    </h5>
                  </dd>
                </dl>
              </CardBody>
            </Card>
            <hr />
            <div className="row row-content">
              <div className="col-12">
                <h3>Curent Expenses</h3>
              </div>
              <div className="col-12">
                <Stagger in>
                  <Fade in>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>S NO.</th>
                          <th>EXPENSE</th>
                          <th>ACTUALLY SPENT</th>
                          <th>ESTIMATED EXPENSE </th>
                          <th></th>
                        </tr>
                      </thead>
                    </Table>
                    <div className="row ">{expense}</div>
                  </Fade>
                </Stagger>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left",
                padding: "20px 20px 20px 20px",
                margin: "0px auto",
              }}
            >
              <Button outline size="lg" color="info" onClick={this.toggleModal}>
                <span className="fa fa-plus fa-lg">Add Expenses</span>
              </Button>
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>New Expense</ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={(values) => this.handleAddExpense(values)}>
                  <Row className="form-group">
                    <div className="col-12">
                      <Label htmlFor="expense" md={2}>
                        Expense
                      </Label>
                    </div>
                    <div className="col-12 ">
                      <Control.text
                        model=".expense"
                        id="expense"
                        name="expense"
                        placeholder="Expense"
                        className="form-control"
                        validators={{
                          required,
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".expense"
                        show="touched"
                        messages={{
                          required: "Required",
                        }}
                      />
                    </div>
                  </Row>
                  <Row className="form-group">
                    <div className="col-12">
                      <Label htmlFor="ideal" md={12}>
                        Estimated Expenditure on this particular expense
                      </Label>
                    </div>
                    <div className="col-12 ">
                      <Control.text
                        model=".ideal"
                        id="ideal"
                        name="ideal"
                        placeholder="ideal"
                        className="form-control"
                        validators={{
                          required,
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".ideal"
                        show="touched"
                        messages={{
                          required: "Required",
                        }}
                      />
                    </div>
                  </Row>
                  <Row className="form-group">
                    <div className="col-12">
                      <Label htmlFor="actual" md={12}>
                        Actual Expenditure spent on this particular expense
                      </Label>
                    </div>
                    <div className="col-12 ">
                      <Control.text
                        model=".actual"
                        id="actual"
                        name="actual"
                        placeholder="actual"
                        className="form-control"
                        validators={{
                          required,
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".actual"
                        show="touched"
                        messages={{
                          required: "Required",
                        }}
                      />
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
                          Add Expense
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </LocalForm>
              </ModalBody>
            </Modal>

            <Modal isOpen={this.state.isModalOpen2} toggle={this.toggleModal2}>
              <ModalHeader toggle={this.toggleModal2}>Edit Expense</ModalHeader>
              <ModalBody>
                <LocalForm
                  onSubmit={(values) => this.handleEditExpense(values)}
                >
                  <Row className="form-group">
                    <div className="col-12">
                      <Label htmlFor="actual" md={2}>
                        Actual
                      </Label>
                    </div>
                    <div className="col-12 ">
                      <Control.text
                        model=".actual"
                        id="actual"
                        name="actual"
                        placeholder="Actual"
                        className="form-control"
                        // validators={{
                        //   required,
                        // }}
                      />
                      {/* <Errors
                        className="text-danger"
                        model=".expense"
                        show="touched"
                        messages={{
                          required: "Required",
                        }}
                      /> */}
                    </div>
                  </Row>
                  {/* <Row className="form-group">
                    <div className="col-12">
                      <Label htmlFor="ideal" md={12}>
                        Estimated Expenditure on this particular expense
                      </Label>
                    </div>
                    <div className="col-12 ">
                      <Control.text
                        model=".ideal"
                        id="ideal"
                        name="ideal"
                        placeholder="ideal"
                        className="form-control"
                        validators={{
                          required,
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".ideal"
                        show="touched"
                        messages={{
                          required: "Required",
                        }}
                      />
                    </div>
                  </Row>
                  <Row className="form-group">
                    <div className="col-12">
                      <Label htmlFor="actual" md={12}>
                        Actual Expenditure spent on this particular expense
                      </Label>
                    </div>
                    <div className="col-12 ">
                      <Control.text
                        model=".actual"
                        id="actual"
                        name="actual"
                        placeholder="actual"
                        className="form-control"
                        validators={{
                          required,
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".actual"
                        show="touched"
                        messages={{
                          required: "Required",
                        }}
                      />
                    </div>
                  </Row> */}
                  <Row className="form-group">
                    <Col md={{ size: 10, offset: 1 }}>
                      <div style={{ display: "flex" }}>
                        <Button
                          style={{ marginLeft: "auto" }}
                          type="submit"
                          color="primary"
                        >
                          Edit Expense
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
}
export default UserHome;
