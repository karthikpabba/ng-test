var app = angular.module('app', ['ngRoute', 'ngCookies'])

        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {


                $routeProvider
                        .when('/', {
                            controller: 'HomeController',
                            templateUrl: App.url + 'js/views/home.html',
                            controllerAs: 'vm'
                        })

                        .when('/login', {
                            controller: 'LoginController',
                            templateUrl: App.url + 'js/views/signin.html',
                            controllerAs: 'vm'
                        })

                        .when('/register', {
                            controller: 'RegisterController',
                            templateUrl: App.url + 'js/views/signup.html',
                            controllerAs: 'vm'
                        })

                        .otherwise({redirectTo: '/login'});
            }])
        

        .run(['$rootScope', '$location', '$cookieStore', '$http', function ($rootScope, $location, $cookieStore, $http) {

                // keep user logged in after page refresh
                $rootScope.globals = $cookieStore.get('globals') || {};
                
                if ($rootScope.globals.currentUser) {
                    
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
                }

                $rootScope.$on('$locationChangeStart', function (event, next, current) {
                    // redirect to login page if not logged in and trying to access a restricted page
                    var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
                    var loggedIn = $rootScope.globals.currentUser;
                    if (restrictedPage && !loggedIn) {
                        $location.path('/login');
                    }
                });
            }]);




