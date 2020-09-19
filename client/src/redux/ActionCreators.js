import * as ActionTypes from "./ActionTypes";
import React from "react";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";
import { Redirect } from "react-router-dom";
import { browserHistory } from "react-router";

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (expense) => (dispatch) => {
  console.log("Comment ", expense);

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(expense),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json(), window.location.reload())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      console.log("Post comments ", error.message);
      // alert("Your comment could not be posted\nError: " + error.message);
    });
};

export const editComment = (expense) => (dispatch) => {
  console.log("Comment ", expense);

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + `comments/${expense.commentId}`, {
    method: "PUT",
    body: JSON.stringify(expense),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json(), window.location.reload())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      console.log("Edit comments ", error.message);
      // alert("Your comment could not be edited\nError: " + error.message);
    });
};

export const editUser = (user) => (dispatch) => {
  console.log("User ", user);

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + `users/${user.userId}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json(), window.location.reload())

    .then((response) => dispatch(addUsers(response)))
    .catch((error) => {
      console.log("Edit users ", error.message);
      // alert("Your user could not be edited\nError: " + error.message);
    });
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const addDish = (dishes) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: dishes,
});

export const deleteDish = (dishId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "dishes/" + dishId, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
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
    .then(
      (response) => response.json(),
      (window.location = "http://localhost:3000/menu")
    )
    .then((dishes) => {
      console.log("Dish Deleted", dishes);
      dispatch(addDishes(dishes));
      // <Redirect to="/menu" />;
      // browserHistory.push("/menu");
      // window.location = "http://localhost:3000/menu";
      // window.location.reload(false);
    })
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const postDish = (userId, name, target, time) => (dispatch) => {
  const newDish = {
    user: userId,
    name: name,
    target: target,
    time: time,
  };
  newDish.image = "assets/images/goal2.png";
  newDish.complete = "0";

  return fetch(baseUrl + "dishes", {
    method: "POST",
    body: JSON.stringify(newDish),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
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
    .then((response) => response.json())
    .then(
      (response) => dispatch(addDish(response)),
      (window.location = "http://localhost:3000/menu")
    )
    .catch((error) => {
      console.log("post dish", error.message);
      // alert("Your goal could not be added\nError: " + error.message);
    });
};

export const deleteComment = (commentId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "comments/" + commentId, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
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
    .then((response) => response.json())
    .then((comments) => {
      console.log("Comment Deleted", comments);
      dispatch(addComments(comments));
      window.location.reload(false);
    })
    .catch((error) => dispatch(commentsFailed(error.message)));
};

// export const fetchMycomments = (userId) => (dispatch) => {
//   return fetch(baseUrl + `comments/${userId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "same-origin",
//   })
//     .then(
//       (response) => {
//         if (response.ok) {
//           return response;
//         } else {
//           var error = new Error(
//             "Error " + response.status + ": " + response.statusText
//           );
//           error.response = response;
//           throw error;
//         }
//       },
//       (error) => {
//         var errmess = new Error(error.message);
//         throw errmess;
//       }
//     )
//     .then((response) => response.json())
//     .then((comments) => dispatch(addComments(comments)))
//     .catch((error) => dispatch(commentsFailed(error.message)));
// };

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));

  return fetch(baseUrl + "promotions")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());

  return fetch(baseUrl + "leaders")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const postFeedback = (feedback) => (dispatch) => {
  return fetch(baseUrl + "feedback", {
    method: "POST",
    body: JSON.stringify(feedback),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
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
    .then((response) => response.json())
    .then((response) => {
      console.log("Feedback", response);
      alert("Thank you for your feedback!\n" + JSON.stringify(response));
    })
    .catch((error) => {
      console.log("Feedback", error.message);
      alert("Your feedback could not be posted\nError: " + error.message);
    });
};

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds,
  };
};

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));

  return fetch(baseUrl + "users/login", {
    method: "POST",
    body: JSON.stringify(creds),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
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
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(creds));
        // Dispatch the success action
        dispatch(fetchFavorites());
        dispatch(receiveLogin(response));
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(loginError(error.message)));
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem("token");
  localStorage.removeItem("creds");
  dispatch(favoritesFailed("Error 401: Unauthorized"));
  dispatch(receiveLogout());
};

export const postFavorite = (dishId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "favorites/" + dishId, {
    method: "POST",
    body: JSON.stringify({ _id: dishId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
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
    .then((response) => response.json())
    .then((favorites) => {
      console.log("Favorite Added", favorites);
      dispatch(addFavorites(favorites));
    })
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const deleteFavorite = (dishId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "favorites/" + dishId, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
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
    .then((response) => response.json())
    .then((favorites) => {
      console.log("Favorite Deleted", favorites);
      dispatch(addFavorites(favorites));
    })
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
  dispatch(favoritesLoading(true));

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "favorites", {
    headers: {
      Authorization: bearer,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((favorites) => dispatch(addFavorites(favorites)))
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const favoritesLoading = () => ({
  type: ActionTypes.FAVORITES_LOADING,
});

export const favoritesFailed = (errmess) => ({
  type: ActionTypes.FAVORITES_FAILED,
  payload: errmess,
});

export const addFavorites = (favorites) => ({
  type: ActionTypes.ADD_FAVORITES,
  payload: favorites,
});

export const fetchUsers = () => (dispatch) => {
  dispatch(usersLoading(true));

  return fetch(baseUrl + "users")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((users) => dispatch(addUsers(users)))
    .catch((error) => dispatch(usersFailed(error.message)));
};

export const usersLoading = () => ({
  type: ActionTypes.USERS_LOADING,
});

export const usersFailed = (errmess) => ({
  type: ActionTypes.USERS_FAILED,
  payload: errmess,
});

export const addUsers = (users) => ({
  type: ActionTypes.ADD_USERS,
  payload: users,
});

export const addUser = (user) => ({
  type: ActionTypes.ADD_USER,
  payload: user,
});
export const postUser = (
  // firstname,
  // lastname,
  // income,
  // familymembers,
  // username,
  // password
  newUser
) => (dispatch) => {
  // const newUser = {
  //   firstname: firstname,
  //   lastname: lastname,
  //   income: income,
  //   familymembers: familymembers,
  //   username: username,
  //   password: password,
  // };
  console.log(newUser);
  axios
    .post(baseUrl + "users/signup", newUser)
    .then(
      (response) => {
        if (response.ok) {
          return response;
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
    .then((response) => response.json())
    .then((response) => dispatch(addUser(response)))
    .catch((error) => {
      console.log("post user", error.message);
      alert("Your user could not be posted\nError: " + error.message);
    });
};

export const changePassword = (
  // firstname,
  // lastname,
  // income,
  // familymembers,
  // username,
  // password
  newUserPass
) => (dispatch) => {
  // const newUser = {
  //   firstname: firstname,
  //   lastname: lastname,
  //   income: income,
  //   familymembers: familymembers,
  //   username: username,
  //   password: password,
  // };
  console.log(newUserPass);
  axios
    .post(baseUrl + "users/changepassword", newUserPass)
    .then(
      (response) => {
        if (response.ok) {
          return response;
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
    .then((response) => response.json())
    .then((response) => dispatch(addUser(response)))
    .catch((error) => {
      console.log("Change User Password", error.message);
      // alert("Your user could not change Password\nError: " + error.message);
    });
};

export const forgotPassword = (newUser) => (dispatch) => {
  console.log(newUser);
  axios
    .post(baseUrl + "users/resetpassword", newUser)
    .then(
      (response) => {
        if (response.ok) {
          return response;
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
    .then((response) => response.json())
    .then((response) => dispatch(addUser(response)))
    .catch((error) => {
      console.log("Reset User Password", error.message);
      alert("Your user could not reset Password\nError: " + error.message);
    });
};

export const newPassword = (newUser) => (dispatch) => {
  console.log(newUser);
  axios
    .post(baseUrl + "users/newpassword", newUser)
    .then(
      (response) => {
        if (response.ok) {
          return response;
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
    .then((response) => response.json())
    .then((response) => dispatch(addUser(response)))
    .catch((error) => {
      console.log("New User Password", error.message);
      alert("Your user could not reset new Password\nError: " + error.message);
    });
};
