angular.module('AngularBlog.services', [])
 .service('UserService', ['$http', '$location', function ($http, $location) { //week 6/ day 26/ slide 18
        var user;
        this.isLoggedIn = function() {
            if (user) {
                return true;
            } 
                return false;
            
        }

        this.requireLogin = function() { //week 6/ day 26/ slide 20
            if(!this.isLoggedIn()){
                var current = $location.path();
                $location.path('/login').search('p', current);
            }
        }
    
    this.login = function(email, password){ //week 6/ day 26/ slide 21
        return $http ({
            method:"POST",
            url: "http://localhost:3000/api/users/login",
            data: {email: email, password: password}
        }).then(function(success){
            user = success.data;
            return success.data;
        })
    }

    this.logout = function() { //week 6/ day 26/ slide 23
        return $http({
            method: "GET",
            url: "http://localhost:3000/api/users/logout"
        }). then(function() {
            user = undefined;
        })
    }

    this.me = function() { //week 6/ day 26/ slide 25
        if(user){
            return Promise.resolve(user);
        }
        return $http({
            url: "http://localhost:3000/api/users/me"
        }).then(function(success){
            user = success.data;
            return success.data;
        })
    };
}
]);
