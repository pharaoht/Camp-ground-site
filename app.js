//dependencies
var express     = require("express");
var app         = express();
var request     = require("request");
var ejs         = require("ejs");
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
//------------------------------------------------//
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
//-----------------------------------------------//
//---------------Connecting to MongoDb----------//
mongoose.connect("mongodb://localhost/yelp_camp");

//SCHME SETUp
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
//compiling the schema into an object model
var Campground = mongoose.model("Campground", campgroundSchema);

 //Campground.create({
  //name:"Granite Hill",
  //image:"https://www.outtherecolorado.com/wp-content/uploads/2017/03/23caa67e99c75c84468d07f6aa80027b.jpg",
  //description:"This place has some much granite..."
//}, function(err, campground){
//  if(err){
//    console.log("Something went wrong!!")
//  }
//  else{
//    console.log("Success! Here are the campgrounds")
//    console.log(campground);
//
//  }
//})



//routes
//homepage route
app.get("/", function(req, res) {
  res.render("landing");
});

//campgroundsroutes
app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allcampgrounds){
    if(err){
      console.log("Something went wrong")
    }
    else{
      console.log("Success!")
      res.render("campgrounds.ejs", {campgrounds:allcampgrounds});
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

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs")
})
//Show
app.get("/campgrounds/:id", function(req, res){
  //find the campgroud with provided id
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log("oops, something went wrong")
    }
    else{
      //render show templates with that campgrounds
      res.render("show", {campground: foundCampground});
    }
  })

})



var server = app.listen(8080, function() {
    console.log('The server is up and running CAPTAIN on port %d', server.address().port);
});
