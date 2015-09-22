/**
 * Created by gripleaf on 11/29/2014.
 */
angular.module('frintCA.registerCtrl', ['frintCA.dataServices', 'frintCA.sharedServices'])
    .controller('RegisterCtrl', function ($scope, dataService, sharedService) {

        console.log('-- RegisterCtrl');

        //*********************
        //  data
        //*********************
        var default_op = {id: 0, name: "未选择"};
        $scope.registerData = {
            name: "",
            cellphone: '',
            password: '',
            errorInfo: '',
            verification: "",
            applyLetter: "",
            Province: default_op,
            School: default_op,
            agreeMe: false
        };

        $scope.Provinces = [default_op];
        $scope.Schools = [default_op];

        //*********************
        // init
        //*********************
        $('#dash-menu').fadeOut();
        $('#registerModal').modal({backdrop: 'static'});

        dataService.getProvinces(function (data, status) {
            if (data.result === "success") {
                data.provinces.push(default_op);
                $scope.Provinces = data.provinces;
                $scope.registerData.Province = default_op;
                $scope.$digest();
            } else {
                alert(data.message);
            }
        });

        //*********************
        //  method
        //*********************

        // 注册大使
        $scope.registerAmbassador = function () {
            console.log("registerAmbassador ...");
            $scope.showSpinner = true;
            if ($scope.registerData.cellphone.match(/\d/g) === null || $scope.registerData.cellphone.match(/\d/g).length !== 11) {
                $scope.registerData.errorInfo = '请输入正确的手机号！';
                $scope.showSpinner = false;
                $scope.$digest();
            } else if ($scope.registerData.School === default_op) {
                $scope.registerData.errorInfo = "请选择学校！";
                $scope.showSpinner = false;
                $scope.$digest();
            } else {
                dataService.registerAmbassador($scope.registerData.name, $scope.registerData.cellphone, $scope.registerData.password,
                    $scope.registerData.School.id, $scope.registerData.applyLetter, $scope.registerData.verification, function (data, status) {
                        if (data.result == "success") {
                            $scope.showSpinner = false;
                            $('#registerModal').modal('hide');
                            $('.modal-backdrop').modal('hide');
                            setTimeout(function () {
                                window.location.href = '#/login'
                            }, 1000);
                        } else {
                            $scope.registerData.errorInfo = data.message;
                        }
                    });
            }
        };

        // 发送验证验证码
        $scope.sendMessage = function (phone) {
            console.log("sendMessage ...");
            if (phone.match(/\d/g) === null || phone.match(/\d/g).length !== 11) {
                $scope.registerData.errorInfo = '请输入正确的手机号！';
                $scope.$digest();
                // alert($scope.loginData.errorInfo);
                return;
            } else {
                dataService.sendMessage(phone, function (data, status) {
                    if (data.result === "success") {
                        alert(data.message);
                    } else {
                        alert(data.message);
                    }
                });
            }
        };

        // 省份改变
        $scope.onProvinceChanged = function () {
            console.log("onProvinceChanged ...");

            dataService.getSchools($scope.registerData.Province.id, function (data, status) {
                if (data.result === "success") {
                    data.schools.push(default_op);
                    $scope.Schools = data.schools;
                    $scope.registerData.School = default_op;
                    $scope.$digest();
                } else {
                    alert(data.message);
                }
            });
        };

    });