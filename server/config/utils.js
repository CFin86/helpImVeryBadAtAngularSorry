//WEEK 6/DAY 28/SLIDE 13 THE SLIDE SAYS PUT IT IN YOUR SERVER FOLDER,
//BUT WE WOUND UP PUTTING IT IN OUR CONFIG FOLDER
var bcrypt = require('bcrypt');
const saltRounds = 12;

exports.encryptPassword = function(pw){ //WEEK 6/DAY 28/SLIDE 13
    return new Promise(function(resolve, reject){
        bcrypt.hash(pw, saltRounds, function(err,hash){
            if(err){
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

exports.checkPassword = function(pw, hash) {// WEEK 6/DAY 28/SLIDE 14
    return new Promise(function(resolve, reject) {
        bcrypt.compare(pw, hash, function(err, matches) {
            if (err) { 
                reject(err); 
            } else { resolve(matches);
             }
        });
    });
}