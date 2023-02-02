module.exports = (app) => {
  const users_posts = require("../controllers/users_posts.controller.js");

  var router = require("express").Router();

  // Create a new user for a post
  router.post("/", users_posts.create);

  // Check if the user has read the post
  router.get("/:id/:userId", users_posts.checkIfUserReadPost);

  app.use("/api/users_posts", router);
};
