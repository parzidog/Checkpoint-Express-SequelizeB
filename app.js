const express = require('express');
const app = express();
module.exports = app; // this line is only used to make testing easier.

// remember to plug in your router and any other middleware you may need here (i.e. body parser, mounting any router-level middleware, etc.)

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

// parses json bodies
app.use(express.json())

app.use((err, req, res, next) => {
  res.sendStatus(err.status);
});

app.get("/", function (req, res) {
  res.redirect("/users/");
});
app.use("/users", require("./routes/index"));

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
