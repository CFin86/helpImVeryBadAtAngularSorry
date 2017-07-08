//cmf
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var routeMW = require("./middleware/route.mw")
var clientPath = path.join(__dirname, '../client');
var cookieParser = require("cookie-parser"); //week 6/ day 25/ slide 34
var configurePassport = require("./config/passport");
var userProc = require("./procedures/users.proc");
var api = require('./api'); //WEEK 6/ DAY 25 /SLIDE 16
var utils = require('./config/utils.js');
//NEXT FOUR LINES ARE WEEK 6/DAY 29/SLIDE 16 EXCEPT LINE 18. IT'S ON WEEK 6/DAY 29/SLIDE 19
//(THE HUGE RANDOM STRING ON LINE 19 WILL BE GENERATED ON PRERENDER.IO)
var prerender = require('prerender-node'); 

prerender.set('prerenderServiceUrl', 'http://localhost:1337/'); //WEEK 6/DAY 29/SLIDE 19
prerender.set('prerenderToken', 'Y2ljUX08lEV2mHIMOnxu');


app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(cookieParser());//week 6/ day 25/ slide 34
app.use(prerender); // WEEK 6/DAY 29/SLIDE 16 

configurePassport(app); // it's very important that this comes before app.use('/api', api)

app.use('/api', api) //WEEK 6/ DAY 25 /SLIDE 16

// this is some weird bullshit that was used when first hashing and salting passwords
// userProc.all().then(function (users) {
//     users.forEach(function (user) {
//         console.log("Updating password for user " + user.firstname);
//         utils.encryptPassword(user.password).then(function (hash) {
//             userProc.updatePw(user.id, hash).then(function () {
//                 console.log("Successfully updated the password for" + user.id)
//             })
//         })
//     });
// });



app.get("*", function (req, res, next) {
    //ThIS IS MODULARIZED FROM WEEK 5/ DAY 22/ SLIDE 6 
    if (routeMW.isAsset(req.url)) {
        next();
    } else {
        res.sendFile(path.join(__dirname, "../client/index.html"));
    }
})

app.listen(3000);