exports.isLoggedIn = function(req, res, next) {//week 6/ day 25/ slide 38
    if(req.user){
        next();
    } else{
        res.sendStatus(401)
    }
}

exports.isAdmin = function (req, res, next) { //week 6/ day 27/ slide 8
    if (req.user.role === 'admin') { //week 6/ day 27/ slide 10
        next();
    } else {
        res.sendStatus(401);
    }
}