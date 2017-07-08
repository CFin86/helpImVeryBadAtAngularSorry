//EXPLANATION ON WEEK 5/ DAY 23/ SLIDE 12 & 14 (THAT'S NOT A TYPO)
// HOW TO ON WEEK 5/ DAY 23/ SLIDE 13
// BUT A MORE DETAILED SLIDE IS ON WEEK 6/ DAY 25/ SLIDE 14
var express = require("express");
var userProc = require('../procedures/users.proc');
var passport = require('passport');
var authMw = require("../middleware/auth.mw.js") //week 6/ day 25/ slide 39
var utils = require("../config/utils.js");

var router = express.Router();


router.get("/", function (req, res) { //this one don't need no isLogged in because it comes in before the /login /logout
    return userProc.all().then(function (data) {
        res.send(data);
    }, function (err) {
        console.log(err);
        res.status(500).send(err);
    })
});

router.post('/login', function (req, res, next) { //week 6/ day 26/ slide 5
    passport.authenticate('local', function (err, user, info) { 
        if (err) {
            console.log(err); return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.sendStatus(500);
            } else {
                return res.send(user);
            }
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) { //week 6/ day 26/ slide 7
    req.session.destroy(function () {
        req.logOut();
        res.sendStatus(204);
    });
});

router.all("*", authMw.isLoggedIn); //week 6/ day 25/ slide 40

router.get(authMw.isAdmin, function(req, res) { //THIS GOT UPDATED IN A GREYSON SLACK POST
        userProc.read(req.params.id).then(function(data) {
            res.send(data);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    })

.post(authMw.isAdmin, function (req, res) {//week 6/ day 27/ slide 10
    utils.encryptPassword(req.body.password).then(function (hash){//WEEK 6/DAY 28/SLIDE 15. IT'S NOT EXACTLY HOW THE SLIDES SHOW BUT ITS HOW WE DID IT IN CLASS
        userProc.write(req.body.firstname, req.body.lastname, req.body.email, hash) //WEEK 6/DAY 28/SLIDE 15
            .then(function (id) {
                res.send(id);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
                })
    })
})

router.route("/me") //week 6/ day 26/ slide 24
    .get(function(req, res){
        res.send(req.user);
    })

router.route("/:id")
    .get(authMw.isAdmin, function(req, res){ //week 6/ day 27/ slide 10
        userProc.read(req.params.id).then(function(data){
            res.send(data);
        }, function(err){
            console.log(err);
            res.sendStatus(500);
        })
    })

    .put(authMw.isAdmin, function (req, res) {
        userProc.updateEmail(req.params.id, req.body.email).then(function(){
            if(req.body.password){
                    utils.encryptPassword(req.body.password).then(function(hash){
                        userProc.updatePassword(req.params.id, hash).then(function(){
                            res.sendStatus(204);
                        })
                    })
                } else{
                    res.sendStatus(204)
                }
        })
    })
        .delete(authMw.isAdmin, function (req, res) {
             userProc.delete(req.params.id).then(function(){
                 res.sendStatus(204);
        }, function(err) {
            console.log(err);
            res.status(500).send(err);
        })
    })


module.exports = router;