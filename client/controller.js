//******CMF */
angular.module("AngularBlog.controllers", [])
    //THESE GET STARTED ON //WEEK 5/DAY 20/SLIDE 16
    // ******** WEEK 6/ DAY 29/ SLIDE 11
    // MAKE SURE TO INJECT SEOSERVICE AS DEPENDENCY AND PARAMETERS
    .controller("ListController", ["$scope", 'Post', 'UserService', "Category", "$routeParams", "SEOService",
        function ($scope, Post, UserService, Category, $routeParams, SEOService) {
            UserService.requireLogin();//week 6/ day 26/ slide 30
            $scope.posts = Post.query();//week 6/ day 26/ slide 30
            $scope.categories = Category.query();

            $scope.logout = function () {
                //WEEK 5/DAY 20/SLIDE 16 FUNCTIONS AND HOW TO 
                //ARE EXPLAINED ON WEEK 5/DAY 20/SLIDE 18
                UserService.logout();
                window.location.pathname = "/login";

            };

            $scope.compose = function () {
                window.location.pathname = "/compose";
            };

            $scope.singleFunc = function () {
                console.log($scope.posts);
            }

            SEOService.setSEO({
                title: 'Blogular with SEO',
                image: 'https://tinyurl.com/yd8o2lwr',
                url: $location.url(),
                description: 'This is a blog to post all of your negative feelings'
            });


        }])
    //******CMF */
    .controller("ComposeController", ["$scope", "Post", "User", "Category", "UserService", "SEOService",
        function ($scope, Post, User, Category, UserService, SEOService) {
            UserService.requireLogin();

            $scope.categories = Category.query();
            $scope.users = User.query();

            $scope.createPost = function () {
                console.log($scope.categoryId);
                if ($scope.userId == undefined || $scope.categoryId == undefined) {
                    alert("You did not select a proper category or user");
                    return;
                }
                new Post({
                    title: $scope.title,
                    userId: $scope.userId,
                    categoryId: $scope.categoryId,
                    content: $scope.content
                }).$save(function () {
                    window.location.pathname = '/';
                })
            }
            // ******** WEEK 6/ DAY 29/ SLIDE 11
            SEOService.setSEO({
                title: 'Blogular with SEO',
                image: 'https://tinyurl.com/yd8o2lwr',
                url: $location.url(),
                description: 'This is a blog to post all of your negative feelings'
            })
        }])
    //******CMF */
    .controller("UpdateController", ['$scope', "Post", "User", "Category", "UserService", "SEOService",
        function ($scope, Post, Category, $routeParams, SEOService) {
            $scope.post = Post.get({ id: $routeParams.id });
            $scope.categories = Category.query();

            $scope.updatePost = function () {
                $scope.post.$update(function () {
                    window.location.pathname = "/" + $routeParams.id;
                    //match this controller with your "SingleController"    
                })
            }
            // ******** WEEK 6/ DAY 29/ SLIDE 11
            SEOService.setSEO({
                title: 'Blogular with SEO',
                image: 'https://tinyurl.com/yd8o2lwr',
                url: $location.url(),
                description: 'This is a blog to post all of your negative feelings'
            })
        }])

    //******CMF */
    .controller("SingleController", ["$scope", "$routeParams", "$location",
        "Post", "UserService", "Category", "User", "SEOService",
        function ($scope, $routeParams, $location, Post, UserService, Category, User, SEOService) {

            $scope.posts = Post.get({ id: $routeParams.id });

            console.log($scope.posts);
            $scope.direct = function () {
                window.location.pathname = "./" + $routeParams.id + "/update";
            }

            $scope.deletePost = function () {
                if (confirm("Are you sure you want to delete this post?")) {
                    $scope.post.$delete(function () {
                        window.location.pathname = "/"
                    })
                }
            }
            // ******** WEEK 6/ DAY 29/ SLIDE 11
            SEOService.setSEO({
                title: 'Blogular with SEO',
                image: 'https://tinyurl.com/yd8o2lwr',
                url: $location.url(),
                description: 'This is a blog to post all of your negative feelings'
            })
        }])

    //******CMF */
    .controller("LoginController", ['$scope', 'User', "$location", "UserService", "SEOService",
        function ($scope, User, $location, UserService, SEOService) {
                //week 6/ day 26/ slide 27
            UserService.me().then(function () {
                redirect();
            });

            $scope.login = function () { //week 6/ day 26/ slide 29
                UserService.login($scope.email, $scope.password).then(function () {
                    redirect();
                }, function (err) {
                    console.log(err);
                })
            }
            $scope.newUser = function () {
                window.location.pathname = "/newUser"
            };

            function redirect() {
                var dest = $location.search().p;
                if (!dest) { dest = '/' };
                $location.path(dest).search('p', null).replace();
            }
            // ******** WEEK 6/ DAY 29/ SLIDE 11
            SEOService.setSEO({
                title: 'Blogular with SEO',
                image: 'https://tinyurl.com/yd8o2lwr',
                url: $location.url(),
                description: 'This is a blog to post all of your negative feelings'
            })
        }])
    //******CMF */
    .controller("UserController", ['$scope', "User", "UserService", "SEOService", 
        function ($scope, User, UserService, SEOService) {
            UserService.requireLogin();
            $scope.user = Post.get({ id: $routeParams.id });

            $scope.createUser = function () {
                new User({
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    email: $scope.email,
                    password: $scope.password
                }).$save(function () {
                    $scope.users = User.query();
                })
            }

            $scope.deleteUser = function () {
                new User().$delete({ id: id });
            }
            $scope.editEmail = function (id) {
                var newEmail = prompt("Enter a new email address for user with id of " + id);
                if (newEmail) {
                    var user = User.get({ id: id });
                    user.email = newEmail;
                    User.update({ id: id }, user);
                }
            }
            $scope.editPassword = function (id) {
                var newPass = prompt("Enter a new password for user with id of " + id);
                if (newPass) {
                    var user = User.get({ id: id });
                    user.password = newPass;
                    User.update({ id: id }, user);
                }
            }
            // ******** WEEK 6/ DAY 29/ SLIDE 11
            SEOService.setSEO({
                title: 'Blogular with SEO',
                image: 'https://tinyurl.com/yd8o2lwr',
                url: $location.url(),
                description: 'This is a blog to post all of your negative feelings'
            })

        }])
