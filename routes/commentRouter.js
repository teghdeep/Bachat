const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var authenticate = require("../authenticate");
const cors = require("./cors");

const Comments = require("../models/comments");

const commentRouter = express.Router();

commentRouter.use(bodyParser.json());

commentRouter
  .route("/:userId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Comment.find({ userId: req.params.userId })
      .populate("user")
      .then(
        (comments) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(comments);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

commentRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Comments.find(req.query)
      .populate("user")
      .then(
        (comments) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(comments);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    // console.log(req.body);

    // req.body.user = req.user._id;
    // console.log(req.body);
    // Comments.create(req.body)
    //   .then(
    //     (comment) => {
    //       Comments.findById(comment._id)
    //         .populate("user")
    //         .then((comment) => {
    //           res.statusCode = 200;
    //           res.setHeader("Content-Type", "application/json");
    //           res.json(comment);
    //         });
    //     },
    //     (err) => next(err)
    //   )
    //   .catch((err) => next(err));

    Comments.create(req.body)
      .then(
        (comment) => {
          console.log("Expense Created", comment);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(comment);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    // err = new Error("Comment not found in request body");
    // err.status = 404;
    // return next(err);
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /comments/");
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    Comments.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

commentRouter
  .route("/:commentId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Comments.findById(req.params.commentId)
      .populate("user")
      .then(
        (comment) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(comment);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /comments/" + req.params.commentId
    );
  })
  // .put(cors.corsWithOptions, (req, res, next) => {
  //   Comments.findById(req.params.commentId)
  //     .then(
  //       (comment) => {
  //         if (comment != null) {
  //           req.body.user = req.user._id;
  //           Comments.findByIdAndUpdate(
  //             req.params.commentId,
  //             {
  //               $set: req.body,
  //             },
  //             { new: true }
  //           ).then(
  //             (comment) => {
  //               Comments.findById(comment._id)
  //                 .populate("user")
  //                 .then((comment) => {
  //                   res.statusCode = 200;
  //                   res.setHeader("Content-Type", "application/json");
  //                   res.json(comment);
  //                 });
  //             },
  //             (err) => next(err)
  //           );
  //         } else {
  //           err = new Error("Comment " + req.params.commentId + " not found");
  //           err.status = 404;
  //           return next(err);
  //         }
  //       },
  //       (err) => next(err)
  //     )

  // })
  .put(
    cors.corsWithOptions,
    // authenticate.verifyUser,
    // authenticate.verifyAdmin,
    (req, res, next) => {
      Comments.findByIdAndUpdate(
        req.params.commentId,
        {
          $set: req.body,
        },
        { new: true }
      )
        .then(
          (comment) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(comment);
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    }
  )
  .delete(cors.corsWithOptions, (req, res, next) => {
    Comments.findById(req.params.commentId)
      .then(
        (comment) => {
          if (comment != null) {
            // if (!comment.user.equals(req.user._id)) {
            //   var err = new Error(
            //     "You are not authorized to delete this comment!"
            //   );
            //   err.status = 403;
            //   return next(err);
            // }
            Comments.findByIdAndRemove(req.params.commentId)
              .then(
                (resp) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(resp);
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          } else {
            err = new Error("Comment " + req.params.commentId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = commentRouter;
