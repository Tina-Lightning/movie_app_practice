const express = require('express');
const router = express.Router();

const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", auth, (req, res) => {

    // Find Favorite Movie info inside Favorite Collection by Movie ID
    Favorite.find({"movieId": req.body.movieId })
    .exec(( err, favorite ) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true, favoriteNumber: favorite.length })
    }) 
});

router.post("/favorited", auth, (req, res) => {

    // Find Favorite Movie info inside Favorite Collection by Movie ID & userFrom
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom })
    .exec(( err, favorite ) => {
        if(err) return res.status(400).send(err)

        // How do I know if I already favorited this movie? 
        let result = false;
        if(favorite.length !== 0){
            result = true
        }
        res.status(200).json({ success: true, favorited: result })
    }) 
});

router.post("/addToFavorite", auth, (req, res) => {

    console.log(req.body)

    // Save the Movie Info and User ID to the Favorite Collection
   const favorite = new Favorite(req.body)

   favorite.save((err, doc) => {
       if(err) return res.json({ success: false, err })
       return res.status(200).json({ success: true })

   })
});

router.post("/removeFromFavorite", auth, (req, res) => {
    Favorite.findOneAndDelete({ 
        movieId: req.body.movieId, 
        userFrom: req.body.userFrom
    })
    .exec((err, doc) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, doc })
    })
});

router.post("/getFavoriteMovie", auth, (req, res) => {

    Favorite.find({ "userfrom": req.body.userFrom })
    .exec((err, favorites) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, favorites })
    })
});


module.exports = router;