var express = require("express")
var router  = express.Router();
var Campground = require("../models/campgrounds")
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
  var author = {  id: req.user._id, username: req.user.username };
  var newCampground = {name: name, image: image, description: desc, author: author}
  console.log(req.user)
  //Create a new campground and save to database
  Campground.create(newCampground, isLoggedIn, function(err, newlyCreated){
    if(err){
      console.log("Something went Wrong")
      res.redirect("/campgrounds")
    }
    else{
      res.redirect("/campgrounds")
    }
  })

})

//New route
router.get("/campgrounds/new", isLoggedIn, function(req, res){
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

//Edit Campground routes
router.get("/campgrounds/:id/edit", function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      res.redirect("/campgrounds")
    }else{
        res.render("campgrounds/edit", {campground: foundCampground});
    }
  })
})

//Update campground route
router.put("/campgrounds/:id", function(req, res){
  //find and update campgrounds
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedcampground){
    if(err){
      res.redirect("/campgrounds")
    }else{
      //redirect
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})

//Destory campground route
router.delete("/campgrounds/:id", function(req,res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds")
    }else{
      res.redirect("/campgrounds")
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
