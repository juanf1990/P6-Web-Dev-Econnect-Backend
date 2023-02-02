const db = require("../models");
const UsersPosts = db.users_posts;

exports.create = (req, res) => {
  // check if the user has already read the post
  UsersPosts.findOne({
    where: {
      userId: req.body.userId,
      postId: req.body.postId,
    },
  }).then((data) => {
    if (data) {
      res.status(400).send({
        message: "User has already read this post",
      });
    } else {
      // Create a User_Posts
      const users_Posts = new UsersPosts({
        userId: req.body.userId,
        postId: req.body.postId,
      });

      users_Posts
        .save()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the User_Posts.",
          });
        });
    }
  });
};

// Check that the user is in the selected postId row
// If the user is in the PostId row then return true
// If the user is not in the PostId row then return false
exports.checkIfUserReadPost = (req, res) => {
  UsersPosts.findOne({
    where: {
      postId: req.params.id,
      userId: req.params.userId,
    },
  }).then((data) => {
    if (data) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
};
