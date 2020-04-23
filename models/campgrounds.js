var mongoose = require("mongoose")




//SCHME SETUp
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref:"Comment"
    }
  ]
});


module.exports = mongoose.model("Campground", campgroundSchema);
