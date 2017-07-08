// WEEK 5/ DAY 23/ SLIDE 6 
// ALL THIS SHIT SHOULD HAVE BEEN IN YOUR SERVER/INDEX.JS
var mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "bloguser",
    password: 'imRickJamesBitch',
    database: "AngularBlog"
});

exports.pool = pool;
// THESE exports.row/rows/empty are explained on WEEK 5/ DAY 23/ SLIDE 6 & 7
exports.row = function(procedure, values) {
    return callProcedure(procedure, values).then(function(data) {
        return data[0][0];
    })
}

exports.rows = function(procedure, values) {
    return callProcedure(procedure, values).then(function(data) {
        return data[0];
    })
}

exports.empty = function(procedure, values) {
    return callProcedure(procedure, values).then(function() {
        return;
    });
}

function callProcedure(procedure, values) {
    return new Promise(function(fulfill, reject) {
        pool.getConnection(function(err, connection) {
            if(err) {
                reject(err);
            } else {
                pool.query(createQueryString(procedure, values),
                 values, function(err, results) {
                     connection.release();
                    if(err) {
                        reject(err);
                    } else {
                        fulfill(results);
                    }
                })
            }
        })
    });
}

function createQueryString(procedure, values) {
    var query = 'CALL ' + procedure + "(";
    for(var i = 0; i < values.length; i++) {
        query += (i >= values.length - 1 ? "?" : "?,");
    }
    return query += ")";
}