import React, { Component } from "react";
import Home from "./HomeComponent";
import About from "./cloneAbout";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
// import DishDetail from "./DishdetailComponent";
import DishDetail from "./CloneDishDetail";
import Favorites from "./FavoriteComponent";
import Header from "./HeaderComponent";
import Profile from "./ProfileComponent";
import Footer from "./FooterComponent";
import SignUp from "./SignUpFormComponent2";
import Forgot from "./ForgotPassword";
import NewPassword from "./NewPassword";
import UserHome from "./UserHome";
import ParticlesBg from "particles-bg";
import icon from "./icon";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  postComment,
  postDish,
  postFeedback,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  loginUser,
  logoutUser,
  fetchFavorites,
  postFavorite,
  deleteFavorite,
  fetchUsers,
  postUser,
  deleteComment,
  changePassword,
  forgotPassword,
  newPassword,
  editComment,
  editUser,
  deleteDish,
  fetchMycomments,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ForgotPass from "./ForgotPassword";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    favorites: state.favorites,
    auth: state.auth,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (expense) => dispatch(postComment(expense)),
  editComment: (expense) => dispatch(editComment(expense)),
  editUser: (user) => dispatch(editUser(user)),
  postDish: (userId, name, target, time) =>
    dispatch(postDish(userId, name, target, time)),
  postUser: (newUser) => dispatch(postUser(newUser)),
  changePassword: (newUserPass) => dispatch(changePassword(newUserPass)),
  forgotPassword: (newUser) => dispatch(forgotPassword(newUser)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
  fetchUsers: () => {
    dispatch(fetchUsers());
  },
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteDish: (dishId) => dispatch(deleteDish(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
  deleteComment: (commentId) => dispatch(deleteComment(commentId)),
});

class Main extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { currUser: null, savings: 0 };
  //   this.CurrUser = this.CurrUser.bind(this);
  // }

  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
  }

  // componentDidMount() {
  //   {
  //     this.CurrUser();
  //   }
  // }

  // onLeaderSelect(dishId) {
  //   this.setState({ selectedLeader: dishId });
  // }
  // CurrUser() {
  //   const currUsername =
  //     this.props.auth.user === null ? 1 : this.props.auth.user.username;
  //   const currUser = this.props.users.users.filter(
  //     (user) => user.username === currUsername
  //   )[0];
  //   console.log("You are in curr user", currUser);
  //   this.setState({
  //     currUser: currUser,
  //   });
  //   return currUser;
  // }

  render() {
    // const CurrUser = () => {
    //   const currUsername =
    //     this.props.auth.user === null ? 1 : this.props.auth.user.username;
    //   const currUser = this.props.users.users.filter(
    //     (user) => user.username === currUsername
    //   )[0];
    //   console.log("You are in curr user");
    //   this.setState({
    //     currUser: currUser,
    //   });
    //   return currUser;
    // };
    const currUsername =
      this.props.auth.user === null ? 1 : this.props.auth.user.username;
    const currUser = this.props.users.users.filter(
      (user) => user.username === currUsername
    )[0];

    let sum_exp = 0;
    let sum_goals = 0;
    let data = 0;
    let data2 = 0;
    this.props.comments !== undefined && this.props.dishes !== undefined
      ? ((data = Array.from(this.props.comments.comments)),
        (data2 = Array.from(this.props.dishes.dishes)))
      : ((data = 0), (data2 = 0));
    var exp, goal;

    this.props.comments !== undefined && currUser !== undefined
      ? (exp = data.map((comment) => {
          comment.user._id === currUser._id
            ? (sum_exp += comment.actual)
            : (sum_exp += 0);
        }))
      : (exp = 0);
    this.props.dishes !== undefined && currUser !== undefined
      ? (goal = data2.map((dish) => {
          dish.user === currUser._id
            ? (sum_goals += dish.saved)
            : (sum_goals += 0);
        }))
      : (goal = 0);

    var savings =
      currUser !== undefined ? currUser.income - sum_exp - sum_goals : 0;

    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    };

    const UserHomePage = ({ match }) => {
      return (
        <UserHome
          leader={this.props.leaders.leaders.filter((lead) => lead.featured)[0]}
          user={currUser}
          isLoading={this.props.users.isLoading}
          errMess={this.props.users.errMess}
          // leaderLoading={this.props.leaders.isLoading}
          // leaderErrMess={this.props.leaders.errMess}
          comments={this.props.comments}
          postComment={this.props.postComment}
          deleteComment={this.props.deleteComment}
          editComment={this.props.editComment}
          savings={savings}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish._id === match.params.dishId
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          savings={savings}
          deleteDish={this.props.deleteDish}
          // comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
          // commentsErrMess={this.props.comments.errMess}
          // postComment={this.props.postComment}
          // favorite={this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId)}
          // postFavorite={this.props.postFavorite}
        />
      );
    };

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );

    let config = {
      num: [2, 4],
      rps: 0.9,
      radius: [5, 7],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-50, 50],
      alpha: [0.6, 0],
      scale: [0.1, 0.9],
      body: icon,
      position: "all",
      //color: ["random", "#ff0000"],
      cross: "dead",
      // emitter: "follow",
      random: 10,
    };

    return (
      <div>
        <Header
          auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
          currUser={currUser}
        />

        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route
                path="/home"
                component={
                  this.props.auth.isAuthenticated ? UserHomePage : HomePage
                }
              />
              <PrivateRoute path="/userhome" component={UserHomePage} />
              <Route
                exact
                path="/aboutus"
                component={() => <About leaders={this.props.leaders} />}
              />
              <Route
                exact
                path="/signupform"
                // postUser={this.props.postUser}
                component={() => <SignUp postUser={this.props.postUser} />}
              />
              <Route
                exact
                path="/forgotpassword"
                // postUser={this.props.postUser}
                component={() => (
                  <ForgotPass forgotPassword={this.props.forgotPassword} />
                )}
              />
              <Route
                exact
                path="/reset/:token"
                component={() => (
                  <NewPassword NewPassword={this.props.newPassword} />
                )}
              />

              {/* {console.log(this.props.postUser.firstname)} */}
              <PrivateRoute
                exact
                path="/profile"
                component={() => (
                  <Profile
                    user={currUser}
                    isLoading={this.props.users.isLoading}
                    errMess={this.props.users.errMess}
                    changePassword={this.props.changePassword}
                    editUser={this.props.editUser}
                  />
                )}
              />
              <PrivateRoute
                exact
                path="/menu"
                component={() => (
                  <Menu
                    user={currUser}
                    dishes={this.props.dishes}
                    postDish={this.props.postDish}
                    savings={savings}
                  />
                )}
              />
              <PrivateRoute path="/menu/:dishId" component={DishWithId} />
              {/* <PrivateRoute
                exact
                path="/favorites"
                component={() => (
                  <Favorites
                    favorites={this.props.favorites}
                    deleteFavorite={this.props.deleteFavorite}
                  />
                )}
              /> */}
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />
              <Redirect
                to={this.props.auth.isAuthenticated ? "/userhome" : "/home"}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <Footer auth={this.props.auth} />
        <ParticlesBg
          type="custom"
          className="particles"
          config={config}
          bg={true}
        />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
