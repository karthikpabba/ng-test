(function () {
    var app = angular.module('test1');

    app.controller('loginController', ['$http', function ($http) {
            var details = this;
            details.users = [];

            $http.get('json/users-details.json').success(function (data) {
                details.users = data;
            });
        }]);

});