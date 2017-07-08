//EXPLANATION ON WEEK 5/ DAY 23/ SLIDE 9
// HOW TO ON WEEK 5/ DAY 23/ SLIDE 10
var db = require("../config/db");

exports.all = function() {
    return db.rows("GetAllCategories", []);
}