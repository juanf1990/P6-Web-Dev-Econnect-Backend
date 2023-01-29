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
    .catch((err) => {});
};

// Retrieve all Posts from the database.
exports.getAllPosts = (req, res) => {
  const description = req.query.description;
  var condition = description
    ? { description: { [Op.like]: `%${description}%` } }
    : null;

  Post.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts.",
      });
    });
};

// Includes the userId sent from the Body JSON on the ReadBy column on a post with the specified id in the request

exports.markAsRead = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post)
      return res.status(404).send("The post with the given ID was not found.");
    const readBy = post.readBy;
    if (post.readBy.includes(req.body.readBy)) {
      return res.status(400).send("You have already read this post");
    } else {
      readBy.push(req.body.readBy);
    }
    await post.update({ readBy: readBy });
    await post.save();
    res.status(200).send(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};
