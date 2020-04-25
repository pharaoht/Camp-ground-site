//dependencies
var express     = require("express");
var app         = express();
var request     = require("request");
var ejs         = require("ejs");
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
const passport    = require("passport");
var Campground  = require("./models/campgrounds.js");
var Comment     = require("./models/comment")
var seedDB      = require("./seed");
var User        = require("./models/user")
var LocalStrategy = require("passport-local");

//------------------------------------------------//
var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes        = require("./routes/index")
//---------------Connecting to MongoDb----------//
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
//seedDB();
//-----------------------------------------------//
//Passport Config
app.use(require("express-session")({
  secret:"Captain, this is our secret code",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


















var server = app.listen(8080, function() {
    console.log('The server is up and running CAPTAIN on port %d', server.address().port);
});
