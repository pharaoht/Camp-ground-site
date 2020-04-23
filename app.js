//dependencies
var express     = require("express");
var app         = express();
var request     = require("request");
var ejs         = require("ejs");
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var passport    = require("passport");
var Campground  = require("./models/campgrounds.js");
var Comment     = require("./models/comment")
var seedDB      = require("./seed");
var LocalStrategy = require("passport-local");
//------------------------------------------------//
//---------------Connecting to MongoDb----------//
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
seedDB();
//-----------------------------------------------//


//===============================================================
//Campground routes
//===============================================================
//Homepage route
app.get("/", function(req, res) {
  res.render("landing");
});

//Campgroundsroutes
app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allcampgrounds){
    if(err){
      console.log("Something went wrong")
    }
    else{

      res.render("campgrounds/campgrounds.ejs", {campgrounds:allcampgrounds});
    }
  })

})

app.post("/campgrounds", function(req, res){
  //get data from form and add to campground array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc}
  //Create a new campground and save to database
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log("Something went Wrong")
    }
    else{
      res.redirect("/campgrounds")
    }
  })

})

//New route
app.get("/campgrounds/new", function(req, res){
  res.render("campgrounds/new.ejs")
})

//Show route
app.get("/campgrounds/:id", function(req, res){
  //find the campgroud with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log("oops, something went wrong")
    }
    else{

      //render show templates with that campgrounds
      res.render("campgrounds/show", {campground: foundCampground});
    }
  })

})

//===============================================================
//Comment campgroundsroutes
//===============================================================
app.get("/campgrounds/:id/comments/new", function(req, res){
  //find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(campground)
      console.log(err)


    }else{

      res.render("comments/new", {campground: campground});
    }
  })
  res.render("comments/new");
})

app.post("/campgrounds/:id/comments", function(req, res){


  //lookup campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err)
      res.redirect("/campgrounds")
    }else{
      Comments.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        }else{
          console.log(comment)
          campgrounds.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      })
    }
  })
  //create new comment
  //connect new comment to campground
  //redirect to show page
})














var server = app.listen(8080, function() {
    console.log('The server is up and running CAPTAIN on port %d', server.address().port);
});
