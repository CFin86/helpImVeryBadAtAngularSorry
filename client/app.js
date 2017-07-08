//cmf  
////WEEK 5/DAY 20/SLIDE 14
var app = angular.module("AngularBlog", ['ngRoute', 'ngResource',
 "AngularBlog.controllers", "AngularBlog.factories", 
 "AngularBlog.services", "AngularBlog.directives"])

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);//WEEK 5/ DAY 22/ SLIDE 6 ALSO MAKE SURE TO PUT IT AS A DEPENDENCY AND A 
    $routeProvider
    //THESE ARE EXPLAINED A LITTLE MORE IN DETAIL ON WEEK 5/DAY 20/SLIDE 15 
    .when("/", {
        templateUrl: 'views/list.html',
        controller: "ListController"
    })
    .when('/compose', {
        templateUrl: "views/compose.html",
        controller: "ComposeController"
    })
    .when('/login',{
        templateUrl:  "views/login.html",
        controller: "LoginController"
    })
    .when("/:id/update", {
        templateUrl: "views/update.html",
        controller: "UpdateController"
    })
    .when('/:id', {
        templateUrl: "views/single.html",
        controller: "SingleController"
    })
    .when('/newUser',{
        templateUrl: "/views/newUser.html",
        controller: "NewUserController"
    })
    .when('/:id/user',{
        templateUrl: "/views/user.html",
        controller: "UserController"
    })
    .otherwise({
        redirectTo: '/'
    });
}]);