const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.users;
const Post = db.posts;
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");

// Create and Save a new User
exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

// Login a User
exports.login = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user exists
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User Not Found.",
      });
    }

    // Compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({
        error: new Error("Incorrect password!"),
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// Logout a User
exports.logout = async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User Not Found.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "0",
      }
    );

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  // Find if user exists
  User.findByPk(req.params.id).then((data) => {
    // If user exists, check if user is has posts and delete them
    if (data) {
      Post.destroy({
        where: {
          userId: req.params.id,
        },
      })
        .then((data) => {
          // If user has posts, delete them
          if (data) {
            console.log("Posts deleted successfully!");
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while deleting posts.",
          });
        });
      // Delete user
      User.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((data) => {
          if (data == 1) {
            res.send({
              message: "User was deleted successfully!",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while deleting user.",
          });
        });
    } else {
      res.status(404).send({
        message: `Cannot delete User with id=${req.params.id}. User not found!`,
      });
    }
  });
};
