var express = require("express");
var bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var Post = require("../../models/post");

router.get("/", function(req, res){
    Post.find({}).exec(function(err, posts){
       if(err){console.log(err);}
       res.render("post/posts", {posts:posts}); 
    });
});

router.get("/add", function(req, res){
    res.render("post/addpost");
});

router.post("/add", function(req, res){
    var newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        // userID: req.user._id

    });

    newPost.save(function(err, post){
        if(err){console.log(err);}
        res.redirect("/posts");
    });
});

router.get("/:postId", function(req, res){
    Post.findById(req.params.postId).exec(function(err, post){
        res.render("post/detailpost", {post:post});
    });
});

router.get("/edit/:postId", function(req, res){
    Post.findById(req.params.postId).exec(function(err, post){
        res.render("post/editpost", {post:post});
    });
});

router.post("/update", async function(req, res){
    const post = await Post.findById(req.body.postid);
    post.title = req.body.title;
    post.content = req.body.content;

    try{
        let savePost = await post.save();
        console.log("savepost", savePost);
        res.redirect("/posts/" + req.body.postid);

    } catch(err){
        console.log("Error happened");
        res.status(500).send(err);
    }
});

module.exports = router;