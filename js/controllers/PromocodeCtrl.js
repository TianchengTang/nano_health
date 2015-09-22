/**
 * Created by Vinci on 2015/2/19 0019.
 */
angular.module("frintCA.promocodeCtrl", ['frintCA.dataServices', 'frintCA.sharedServices'])

    .controller('PromocodeCtrl', function ($scope, dataService, sharedService) {
        console.log("-- PromocodeCtrl");

        //**************
        //  data
        //**************
        var default_op = {id: 0, name: "不限定"};
        // 新建
        $scope.Pcodes = {
            IdName: "",
            Province: default_op,
            School: default_op,
            City: default_op,
            Provinces: [default_op],
            Schools: [default_op],
            Citys: [default_op]
        };

        // 管理
        $scope.Mcodes = [];

        var tk; //token

        //**************
        //  init
        //**************
        tk = sharedService.getCookie("token-ca");
        if (!tk) {
            window.location.href = "#/login";
        }

        dataService.getProvinces(function (data, status) {
            if (data.result === "success") {
                data.provinces.push(default_op);
                $scope.Pcodes.Provinces = data.provinces;
                $scope.Pcodes.Province = default_op;
                $scope.$digest();
            } else {
                alert(data.message);
            }
        });

        dataService.getGroundPromo(tk, function (data, status) {
            if (data.result === "success") {
                $scope.Mcodes = data.promos;
                $scope.$digest();
            } else {
                alert(data.message);
            }
        });

        //**************
        //  method
        //**************

        $scope.onClickCreateButton = function () {
            dataService.newGroundPromo(tk, $scope.Pcodes, function (data, status) {
                if (data.result === "success") {
                    alert(data.message);
                } else {
                    alert(data.message);
                }
            });
        };

        $scope.onProvinceChanged = function () {
            dataService.getCities($scope.Pcodes.Province.id, function (data, status) {
                if (data.result === "success") {
                    data.cities.push(default_op);
                    $scope.Pcodes.Citys = data.cities;
                    $scope.Pcodes.City = default_op;
                    $scope.$digest();
                } else {
                    alert(data.message);
                }
            });
        };

        $scope.onCityChanged = function () {
            dataService.getSchools($scope.Pcodes.Province.id, function (data, status) {
                if (data.result === "success") {
                    data.schools.push(default_op);
                    $scope.Pcodes.Schools = data.schools;
                    $scope.Pcodes.School = default_op;
                    $scope.$digest();
                } else {
                    alert(data.message);
                }
            });
        };

    });
