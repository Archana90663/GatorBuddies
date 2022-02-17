var express = require("express");
var passport = require("passport");

var router = express.Router();

var Post = require("../../models/post");


router.get("/", function(req, res){
    console.log("I am on start page");
    res.render("home/index");
});

router.get("/home", function(req, res){
    Post.find({}).exec(function(err, posts){
        if(err){console.log(err);}
        res.render("home/home", {posts:posts}); 
     });
});

module.exports = router;