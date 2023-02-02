const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(cors(corsOptions));

app.use(express.json());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// models db
const db = require("./app/models");
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to econnect application." });
});

require("./app/routes/post.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/users_posts.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
