app.controller('LoginController', ['$location', 'AuthenticationService', 'FlashService', function ($location, AuthenticationService, FlashService) {
        var vm = this;
        vm.login = login;

        function init() {
            // reset login status
            AuthenticationService.ClearCredentials();
        }
        //initController();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }

        init();
    }]);

