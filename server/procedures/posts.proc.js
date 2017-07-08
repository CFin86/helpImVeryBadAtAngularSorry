//EXPLANATION ON WEEK 5/ DAY 23/ SLIDE 9
// HOW TO ON WEEK 5/ DAY 23/ SLIDE 10
var db = require('../config/db');

exports.all = function() {
    return db.rows("GetAllPosts", []);
}

exports.read = function(id){
     return db.row("GetSinglePost", [id]);
}

exports.write = function(title, categoryId, userId, content) {
    return db.row("InsertPost", [title, categoryId, userId, content]);
}

exports.update = function(id, title, categoryId, content) {
    return db.empty("UpdatePost", [id, title, categoryId, content]);
}

exports.delete = function(id) {
    return db.empty("DeletePost", [id]);
} 