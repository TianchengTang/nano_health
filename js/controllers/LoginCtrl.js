/**
 * Created by gripleaf on 11/29/2014.
 */
angular.module('frintCA.loginCtrl', ['frintCA.dataServices', 'frintCA.sharedServices'])
    .controller('LoginCtrl', function ($scope, dataService, sharedService) {

        console.log('-- LoginCtrl');

        //*********************
        //  data
        //*********************
        $scope.loginData = {
            cellphone: '',
            password: '',
            errorInfo: ''
        };
        var tk;

        //*********************
        // init
        //*********************
        tk = sharedService.getCookie('token-ca');

        if (tk) {
            $scope.loginData.sessionToken = tk;
            sharedService.setCookie('token-ca', $scope.loginData.sessionToken, 15);

            // Synchronize UI
            $scope.showSpinner = false;
            $('#dash-menu').fadeIn();
            $('#loginModal').modal('hide');

            // ui-route
            window.location.href = '#/home';
        } else {
            $('#dash-menu').fadeOut();
            $('#loginModal').modal({backdrop: 'static'});
        }

        //*********************
        //  method
        //*********************
        $scope.login = function (cellphone, password) {
            $scope.showSpinner = true;
            if (cellphone.match(/\d/g) === null || cellphone.match(/\d/g).length !== 11) {
                $scope.loginData.errorInfo = '请输入正确的手机号！';
                $scope.showSpinner = false;
                $scope.$digest();
                // alert($scope.loginData.errorInfo);
                return;
            } else {
                dataService.login(cellphone, password, function (data, status) {
                    if (data.result === 'success' && data.token) {
                        $scope.loginData.sessionToken = data.token;
                        $scope.showSpinner = false;

                        sharedService.setCookie('token-ca', $scope.loginData.sessionToken, 15);
                        sharedService.setCookie('is-super', data.is_super, 15);
                        sharedService.setCookie('is-province-super', data.is_province_super, 15);
                        console.log(sharedService.getCookie('is-super'));

                        $('#dash-menu').fadeIn();
                        $('#loginModal').modal('hide');
                        $('.modal-backdrop').modal('hide');
                        setTimeout(function () {
                            window.location.href = '#/home'
                        }, 1000);
                    } else {
                        $scope.showSpinner = false;
                        $scope.loginData.errorInfo = data.message;
                        $scope.$digest();
                    }
                });
            }
        };
    });