angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // compliments page that will use the ComplimentController
        .when('/compliments', {
            templateUrl: 'views/compliment.html',
            controller: 'ComplimentController'
        });

    $locationProvider.html5Mode(true);

}]);
