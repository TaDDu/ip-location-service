var express = require("express");
var app = express();
var routes = require("./routes.js");

app.use("/ip-location", routes);

module.exports = app;
