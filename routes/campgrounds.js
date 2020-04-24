var express = require("express")
var router  = express.Router();
//Homepage route


//Campgroundsroutes
router.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allcampgrounds){
    if(err){
      console.log("Something went wrong")
    }
    else{

      res.render("campgrounds/campgrounds.ejs", {campgrounds:allcampgrounds, currentUser: req.user});
    }
  })

})

router.post("/campgrounds", function(req, res){
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
router.get("/campgrounds/new", function(req, res){
  res.render("campgrounds/new.ejs")
})

//Show route
router.get("/campgrounds/:id", function(req, res){
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


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
