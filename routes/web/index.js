var express = require("express");

var router = express.Router();

router.use(function(req, res ,next){
    res.locals.currentUser = req.user;
    next();
});

router.use("/", require("./home"));
router.use("/posts", require("./post"));

module.exports = router;