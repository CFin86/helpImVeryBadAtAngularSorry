angular.module("AngularBlog.factories", ["ngResource"])

.factory("User", ["$resource", function($resource) { 
    //THE SLIDE FOR FACTORIES IS ON WEEK 5/ DAY 21/ SLIDE 6
    //IT'S FUCKING WEIRD, DON'T USE IT, USE THIS INSTEAD
        return $resource("http://localhost:3000/api/users/:id",{id: "@id"});
    }])

.factory("Category", ['$resource', function($resource) { 
    //THESE THREE FACTORIES CONNECT AT THE BACKEND AT SERVER/CONTROLLERS/"filename".js 
    //THIS ONE GOES TO ../SERVER/CONTROLLERS/CATEGORIES.CTRL.JS
        return $resource("http://localhost:3000/api/categories/:id", {id: "@id"});
    }])

.factory("Post", ["$resource", function($resource) {
        return $resource("http://localhost:3000/api/posts/:id",
        {
             id:'@id'
        },{
            'update': {method: "PUT"}
        })
    }]);