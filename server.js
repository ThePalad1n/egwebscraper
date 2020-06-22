require('dotenv').config;
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var axios = require("axios");
var cheerio = require("cheerio");
var request = require('request');
var exphbs = require('express-handlebars');

const app = express();

mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

var PORT = process.env.PORT || 3000;



app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static("public"));

app.engine("handlebars", exphbs({
	defaultLayout: "main",
	partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");



db.on("error", function(error){
	console.log("Mongoose Error: ", error);
});

db.once("open", function(){
	console.log("Mongoose connection successful.");
});


require('./routes/articles')(app);
require('./routes/notes')(app);

app.listen(PORT, function(){
	console.log("App running on PORT: " + PORT);
});

module.exports = app;