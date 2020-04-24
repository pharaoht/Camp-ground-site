var express = require("express")
var router  = express.Router();
var Campground = require("../models/campgrounds")
var Comment = require("../models/comment")

router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
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

router.post("/campgrounds/:id/comments", function(req, res){

  //lookup campground using ID
  Campground.findById(req.params.id, isLoggedIn, function(err, campground){
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


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
