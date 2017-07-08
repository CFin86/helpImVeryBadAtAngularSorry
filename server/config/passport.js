//WEEK 6/ DAY 25 /SLIDE 20 lol look at all these imports i feel like im in the first fast and furious
var express = require("express");
var passport = require("passport");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session); 
var LocalStrategy = require('passport-local').Strategy;
var userProc = require('../procedures/users.proc');
var utils = require("./utils.js");
var pool = require('./db').pool;

function configurePassport(app) { // THIS STARTS ON WEEK 6/ DAY 25 /SLIDE 16

    passport.use(new LocalStrategy({ //WEEK 6/ DAY 25 /SLIDE 23. EXPLANATION ON //WEEK 6/ DAY 25 /SLIDE 24
        usernameField: 'email',
        passwordFields: 'password'
    }, function (email, password, done) {

        userProc.readByEmail(email).then(function (user) { //WEEK 6/ DAY 25 /SLIDE 16 
            if (!user) {
                return done(null, false);//these explained on week 6/ day 25/ slide 25
            }
            utils.checkPassword(password, user.password)//WEEK 6/ DAY 25 /SLIDE 16 
                .then(function (matches) {
                    if (matches) {
                        return done(null, user);//these explained on week 6/ day 25/ slide 25
                    } else { //IN THE SLIDE THIS IS A SEPARATE IF STATEMENT I USED IT AS AN ELSE STATEMENT
                        return done(null, false, { message: "Nope!" });
                    }
                }, function (err) {
                    return done(err);
                })
        }, function (err) {
            return done(err);
        });
    }));

    passport.serializeUser(function (user, done) { //week 6/ day 25/ slide 27 ignore the top line where it says function configurePassport(app) 
        done(null, user.id);//these explained on week 6/ day 25/ slide 25
    });
    passport.deserializeUser(function (id, done) { //week 6/ day 25/ slide 28 ignore the slide's top line where it says `function configurePassport(app){ 
        userProc.read(id).then(function (user) {
            done(null, user);//these explained on week 6/ day 25/ slide 25
        }, function (err) {
            done(err);
        })
    });

    var sessionsStore = new MySQLStore({ //week 6/ day 25/ slide 30
        createDatabaseTable: true
    }, pool);
    app.use(session({
        secret: 'process.env.RANDOMLY_GENERATED_STRING',
        store: sessionsStore,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());//week 6/ day 25/ slide 33
    app.use(passport.session()); //week 6/ day 25/ slide 33
}

module.exports = configurePassport; //THIS IS THE BOTTOM PART OF //WEEK 6/ DAY 25 /SLIDE 21