//EXPLANATION ON WEEK 5/ DAY 23/ SLIDE 12 & 14 (THAT'S NOT A TYPO)
// HOW TO ON WEEK 5/ DAY 23/ SLIDE 13
var express = require("express");
var catProc = require("../procedures/categories.proc.js");

var router = express.Router();

router.get('/', function (req, res){
    catProc.all().then(function(data) {
        res.send(data);
    }, function(err) {
        console.log(err);
        res.status(500).send(err);
    })
})

module.exports = router;