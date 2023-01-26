const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.create = (req, res) => {
  // Create a Post
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    imgUrl: url + "/images/" + req.file.filename,
    description: req.body.description,
    userId: req.body.userId,
    username: req.body.username,
    readBy: req.body.readBy,
  });

  // Save Post in the database
  post
    .save(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post.",
      });
    });
};
