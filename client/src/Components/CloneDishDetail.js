import React, { Component, useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  Media,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import CircularIndeterminate from "./LoadingComponent";
import Container from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
import { Redirect } from "react-router-dom";
import { numberFormat } from "./CurrencyFormat";
import ReactTooltip from "react-tooltip";
import { number } from "prop-types";
// function RenderDish({ dish, favorite, postFavorite }) {
//   return (
//     <div className="col-12 col-md-5 m-1">
//       <FadeTransform
//         in
//         transformProps={{
//           exitTransform: "scale(0.5) translateY(-50%)",
//         }}
//       >
//         <Card>
//           <CardImg top src={dish.image} alt={dish.name} />
//           {/* <CardImgOverlay>
//             <Button
//               outline
//               color="primary"
//               onClick={() =>
//                 favorite
//                   ? console.log("Already favorite")
//                   : postFavorite(dish._id)
//               }
//             >
//               {favorite ? (
//                 <span className="fa fa-heart"></span>
//               ) : (
//                 <span className="fa fa-heart-o"></span>
//               )}
//             </Button>
//           </CardImgOverlay> */}
//           <CardBody>
//             <CardTitle>{dish.name}</CardTitle>
//             {/* <CardText>{dish.description}</CardText> */}
//           </CardBody>
//         </Card>
//       </FadeTransform>
//     </div>
//   );
// }

// function RenderComments({ comments, postComment, dishId }) {
//   if (comments != null)
//     return (
//       <div className="col-12 col-md-5 m-1">
//         <h4>Comments</h4>
//         <ul className="list-unstyled">
//           <Stagger in>
//             {comments.map((comment) => {
//               return (
//                 <Fade in key={comment._id}>
//                   <li>
//                     <p>{comment.comment}</p>
//                     <p>{comment.rating} stars</p>
//                     <p>
//                       -- {comment.author.firstname} {comment.author.lastname} ,{" "}
//                       {new Intl.DateTimeFormat("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "2-digit",
//                       }).format(new Date(Date.parse(comment.updatedAt)))}
//                     </p>
//                   </li>
//                 </Fade>
//               );
//             })}
//           </Stagger>
//         </ul>
//         <CommentForm dishId={dishId} postComment={postComment} />
//       </div>
//     );
//   else return <div></div>;
// }

// class CommentForm extends Component {
//   constructor(props) {
//     super(props);

//     this.toggleModal = this.toggleModal.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);

//     this.state = {
//       isNavOpen: false,
//       isModalOpen: false,
//     };
//   }

//   toggleModal() {
//     this.setState({
//       isModalOpen: !this.state.isModalOpen,
//     });
//   }

//   handleSubmit(values) {
//     this.toggleModal();
//     this.props.postComment(this.props.dishId, values.rating, values.comment);
//   }

//   render() {
//     return (
//       <div>
//         {/* <Button outline onClick={this.toggleModal}>
//           <span className="fa fa-pencil fa-lg"></span> Submit Comment
//         </Button> */}
//         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
//           <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
//           <ModalBody>
//             <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
//               <Row className="form-group">
//                 <Col>
//                   <Label htmlFor="rating">Rating</Label>
//                   <Control.select
//                     model=".rating"
//                     id="rating"
//                     className="form-control"
//                   >
//                     <option>1</option>
//                     <option>2</option>
//                     <option>3</option>
//                     <option>4</option>
//                     <option>5</option>
//                   </Control.select>
//                 </Col>
//               </Row>
//               <Row className="form-group">
//                 <Col>
//                   <Label htmlFor="comment">Comment</Label>
//                   <Control.textarea
//                     model=".comment"
//                     id="comment"
//                     rows="6"
//                     className="form-control"
//                   />
//                 </Col>
//               </Row>
//               <Button type="submit" className="bg-primary">
//                 Submit
//               </Button>
//             </LocalForm>
//           </ModalBody>
//         </Modal>
//       </div>
//     );
//   }
// }

const DishDetail = (props) => {
  let a = false;
  let c = false;
  const [modal, setModal] = useState(a);
  const [modal2, setModal2] = useState(c);

  //const currentUser = { id: props.dish.id, name: props.dish.name,target: props.dish.target ,time: props.dish.time }

  const [User, setUser] = useState(props.dish);
  const [User2, setUser2] = useState(props.dish);
  const [User3, setUser3] = useState(props.dish);
  const [User4, setUser4] = useState(props.dish);
  //const [ Users, setUsers ] = useState(props.dishes)
  //const [id , setId]= useState(props.dish.id)
  //const[updatedDish, setUpdatedDish]= useState("")

  const archive = () => {
    User3.archive = true;
    setUser3(User3);
    updateUser(props.dish._id, User3);
  };
  const unarchive = () => {
    User3.archive = false;
    setUser3(User3);
    updateUser(props.dish._id, User3);
  };

  const updateUser = (id, updatedDish) => {
    fetch(baseUrl + "dishes/" + props.dish._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDish),
    })
      .then(
        (response) => {
          if (response.ok) {
            return (
              response.json(), (window.location = "http://localhost:3000/menu")
            );
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((data) => console.log("data is", data))
      .catch((error) => {
        console.log("update goals", error.message);
        // alert("Your goal could not be updated\nError: " + error.message);
      });
  };

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);

  // let isMounted = true;
  let b = 1;

  useEffect(() => {
    setUser(props.dish);
    setUser2(props.dish.saved);
  }, [b]);

  const errorfunc = (message) => {
    return (
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{message}</p>
      </Alert>
    );
  };
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...User, [name]: value });
  };
  const handleInputChange2 = (event) => {
    const { name, value } = event.target;

    if (name == "saved") {
      if (value <= props.dish.target) {
        setUser2({ ...User2, [name]: value });
      } else {
        errorfunc(
          "The value of Updated Money can not be greater than Target amount"
        );
      }
    }
  };

  const required = (val) => val && val.length;
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Container />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
    return (
      <div className="bgcolor">
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Goals</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>Goal</h3>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <FadeTransform
                in
                transformProps={{
                  exitTransform: "scale(0.5) translateY(-50%)",
                }}
              >
                <Card>
                  <CardImg
                    top
                    src="https://www.kindpng.com/picc/m/195-1959589_transparent-clickbait-circle-png-goal-setting-clipart-png.png"
                    alt={props.dish.name}
                  />
                  <CardBody>
                    <CardTitle>{props.dish.name}</CardTitle>
                  </CardBody>
                </Card>
              </FadeTransform>
            </div>

            <div className="col-12 col-md-5 m-1">
              <Card>
                <CardTitle className="row">
                  <h1 className="col-9">{props.dish.name}</h1>
                  <div className="col-3" style={{ display: "flex" }}>
                    <i
                      className="fa fa-trash-o fa-lg trashcan"
                      aria-hidden="true"
                      style={{
                        marginLeft: "auto",
                        padding: "20px 20px 20px 20px",
                      }}
                      onClick={() => props.deleteDish(props.dish._id)}
                    ></i>
                  </div>

                  <hr />
                </CardTitle>
                <CardBody>
                  <Stagger in>
                    <Fade in>
                      <Media>
                        <Media body>
                          <h5>
                            {" "}
                            Target:
                            {numberFormat(props.dish.target)}
                          </h5>

                          <br />
                          <h5>Time: {props.dish.time} months</h5>
                          <br />
                          <div className="row">
                            <h5 className="col-6">
                              Saved: {numberFormat(props.dish.saved)}
                            </h5>
                            {props.dish.target - props.dish.saved > 0 &&
                            props.dish.archive == false ? (
                              <div
                                className="col-6"
                                style={{
                                  display: "flex",
                                }}
                              >
                                <Button
                                  outline
                                  size="sm"
                                  color="info"
                                  onClick={toggle2}
                                >
                                  <span className="fa fa-plus fa-lg">
                                    Update Money
                                  </span>
                                </Button>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                          <br />
                          <h3>Target Plan</h3>
                          <p>
                            {" "}
                            Monthly Savings Required :{" "}
                            {numberFormat((props.dish.target - props.dish.saved) / props.dish.time)}
                          </p>
                          <br />
                        </Media>
                      </Media>
                    </Fade>
                  </Stagger>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-6" style={{ display: "flex" }}>
                      {!User3.archive ? (
                        <Button
                          style={{ marginRight: "auto" }}
                          outline
                          color="info"
                          onClick={archive}
                        >
                          <span className="fa fa-archive fa-lg"></span> Archive
                        </Button>
                      ) : (
                        <Button
                          style={{ marginRight: "auto" }}
                          outline
                          color="info"
                          onClick={unarchive}
                        >
                          <span className="fa fa-undo fa-lg"></span> Unarchive
                        </Button>
                      )}
                    </div>
                    <div className="col-6" style={{ display: "flex" }}>
                      <Button
                        style={{ marginLeft: "auto" }}
                        outline
                        color="info"
                        onClick={toggle}
                      >
                        <span className="fa fa-pencil fa-lg"></span> Edit
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{props.dish.name}</ModalHeader>
            <ModalBody>
              <LocalForm
                onSubmit={(event) => {
                  //event.preventDefault()
                  updateUser(props.dish._id, User);
                  toggle();
                }}
              >
                <div className="col-12">
                  <p>
                    **Please enter all the Fields and change the Fields you wish
                    to Change
                  </p>
                </div>
                <Row className="form-group">
                  <div className="col-12">
                    <Label htmlFor="name" md={2}>
                      Name Of Goal
                    </Label>
                  </div>
                  <div className="col-12 ">
                    <Control.text
                      model=".name"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={User.name}
                      className="form-control"
                      onChange={handleInputChange}
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
                      placeholder="Target Price"
                      className="form-control"
                      value={User.target}
                      onChange={handleInputChange}
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
                      placeholder="in months"
                      className="form-control"
                      value={User.time}
                      onChange={handleInputChange}
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
                        Edit Goal
                      </Button>
                    </div>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>

          <Modal isOpen={modal2} toggle={toggle2}>
            <ModalHeader toggle={toggle2}>{props.dish.name}</ModalHeader>
            <ModalBody>
              <LocalForm
                onSubmit={(event) => {
                  //event.preventDefault()
                  updateUser(props.dish._id, User2);
                  toggle2();
                }}
              >
                <div className="col-12">
                  <p>**Please enter Previous Amount + New Amount </p>
                </div>
                <Row className="form-group">
                  <div className="col-12">
                    <Label htmlFor="saved" md={2}>
                      Saved
                    </Label>
                  </div>
                  <div className="col-12 ">
                    <Control.text
                      model=".saved"
                      id="saved"
                      name="saved"
                      placeholder="Saved"
                      value={User2.saved}
                      className="form-control"
                      onChange={handleInputChange2}
                      // onChange={() => {
                      //   handleInputChange2(User2.saved);
                      // }}
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
                    />  */}
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
                        Update Money
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
  else return <div></div>;
};

export default DishDetail;
