 //week 6/ day 27/ slide 19 DIRECTIVES ARE BEST USED FOR HEADERS AND FOOTERS
 angular.module("AngularBlog.directives", [])
   .directive("blogPost", function(){
        return {
            templateUrl: "../directives/post.html",
            restrict: "E",
           
        }
    }); 