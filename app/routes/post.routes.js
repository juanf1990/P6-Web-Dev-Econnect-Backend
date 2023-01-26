module.exports = (app) => {
  const posts = require("../controllers/post.controller.js");

  var router = require("express").Router();

  const auth = require("../middleware/auth");

  const multer = require("../middleware/multer-config");

  // Saves an image to the server
  router.post("/", auth, multer, (req, res) => {
    posts.create(req, res);
  });

  // Retrieves all posts
  router.get("/", auth, (req, res) => {
    posts.findAll(req, res);
  });

  app.use("/api/posts", router);
};
