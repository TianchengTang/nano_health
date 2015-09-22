angular.module("frintCA.shopMonitorCtrl", ['frintCA.dataServices', 'frintCA.sharedServices'])

    .controller('ShopMonitorCtrl', function ($scope, dataService, sharedService) {
        console.log("-- ShopMonitorCtrl");

        $scope.getCurrentShopState = function () {

            console.log('-- Stating');

            $scope.deadcount = 0;
            $scope.updatecount = 0;


            function changeTimeFormat(time) {
                var date = new Date(time * 1000); //实例化一个Date对象
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                return date.getFullYear() + "/" + month + "/" + currentDate + "/" + hh + ":" + mm;
            }

            dataService.getPrintShops(userAccountService.Token(), function (data) {
                $scope.playlists = [];
                for (var i = 0; i < data.status.length; i++) {
                    if (data.status[i].name.indexOf('T_') === 0) {
                        continue;
                    }
                    if (data.status[i].status.online) {
                        data.status[i].class = 'alive';
                    } else {
                        data.status[i].class = 'dead';
                        $scope.deadcount++;
                    }
                    if ((data.status[i].version !== null) && (data.status[i].version !== true)) {
                        $scope.updatecount++;
                    }
                    data.status[i].time = "失联于" + changeTimeFormat(data.status[i].status.last_beat_time);
                    if (data.status[i].status.last_beat_time == undefined) {
                        data.status[i].time = "时间未知  ";
                    }
                    $scope.playlists.push(data.status[i]);
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.getCurrentShopState();

    });