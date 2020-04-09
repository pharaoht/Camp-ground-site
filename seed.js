var mongoose    = require("mongoose");
var Campground  = require("./models/campgrounds.js");
var Comment     = require("./models/comment.js")

var data = [
  {
    name: "Cloud's Rest",
    image:"https://www.outtherecolorado.com/wp-content/uploads/2017/03/23caa67e99c75c84468d07f6aa80027b.jpg",
    description: "Blah blah blah blah"

  },
  {
    name: "Desert Mesa",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1gTeNNmhDmjby5JHa-o9ljMoneNMok4Is0853Vcp7Oi-f7oXp",
    description: "Blah blah blah blah"

  },
  {
    name: "Donkey Trails",
    image:"https://www.pitchup.com/_cfi/cdn-cgi/image/format=auto,fit=scale-down,quality=50,w=1800,h=1350/images/1/image/private/s--t60Fv25w--/c_limit,h_2400,w_3200/e_improve,fl_progressive/q_auto/b_rgb:000,g_south_west,l_pitchup.com_wordmark_white_watermark,o_15/v1565013350/torrent-walk-campsite/487804.jpg",
    description: "Blah blah blah blah"

  }

]

function seedDB() {
  //remove campground
  Campground.remove({}, function(err){
    if(err){
      console.log(err)
    }
      else{
      console.log("Captain, all campgrounds have been removed...")
    }
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log("Captain, something went wrong... we are checking it out now")
        }
        else{
          console.log("Captain, A Campground has been added.")
          //create comment
          Comment.create(
            {
                text:"this place is great but I wish there was internet",
                author: "Homer Sims"
            }, function(err, comment){
              if(err){
                console.log("Something went wrong Captain,")
              }
              else{
                campground.comments.push(comment);
                campground.save()
                console.log("Captain, a comment has been added!")
              }

            })
        }
      })
    })

  })


}

module.exports = seedDB;
