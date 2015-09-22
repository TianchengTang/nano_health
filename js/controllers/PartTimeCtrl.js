/**
 * Created by Vinci on 2015/2/19 0019.
 */
angular.module("frintCA.partTimeCtrl", ['frintCA.dataServices', 'frintCA.sharedServices'])

    .controller('PartTimeCtrl', function ($scope, dataService, sharedService) {

        tk = sharedService.getCookie("token-ca");

        dataService.getPartTimeLogs(tk, function (data, status) {
            if (data.result === "success") {
                $scope.logs = data.log;
                $scope.$digest();
            }
        });

    });
