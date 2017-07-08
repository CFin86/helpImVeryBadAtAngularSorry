// *******WEEK 6/DAY 29/ SLIDE 10 
angular.module('AngularBlog.services', [])
    .service ('SEOService', ['$rootScope', function($rootScope) {
		this.setSEO = function(data) {
			$rootScope.seo = {};
			for(var p in data) {
				$rootScope.seo[p] = data[p];
			}
		}
}]);
