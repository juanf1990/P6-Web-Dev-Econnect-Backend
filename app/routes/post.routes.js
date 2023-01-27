module.exports = (app) => {
  const posts = require("../controllers/post.controller.js");

  var router = require("express").Router();

  const auth = require("../middleware/auth");

  const multer = require("../middleware/multer-config");

  // Check that the user is authenticated, then adds the file image to the database folder and then adds the post to the database
  router.post("/", auth, multer, (req, res, next) => {
    posts.create(req, res);
    next();
  });

  // Retrieves all posts from the database
  router.get("/", posts.getAllPosts);

  app.use("/api/posts", router);
};
