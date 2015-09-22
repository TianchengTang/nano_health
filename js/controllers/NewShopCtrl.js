/**
 * Created by Vinci on 2015/2/19 0019.
 */
angular.module("frintCA.newShopCtrl", ['frintCA.dataServices', 'frintCA.sharedServices'])

    .controller('NewShopCtrl', function ($scope, dataService, sharedService) {
        console.log("-- ShopReviewCtrl");

        //****************
        // private method
        //****************
        var watchInnerHtml = function () {
            if ($('pre', $("#ajaxUpload")[0].contentWindow.document)[0].innerHTML.length > 20) {
                alert("上传成功！");
                callback();
            } else {
                setTimeout(watchInnerHtml, 500);
            }
        };


        // 获取省份信息
        dataService.getProvinces(function (pdata, status) {
            if (pdata.result === "success" && pdata.provinces.length > 0) {
                $scope.provinceList = pdata.provinces;
                $scope.ShopInfo.Province = pdata.provinces[0];
                $scope.onProvinceChange();
            } else {
                alert("获取省份信息失败！");
            }
        });

        $scope.onProvinceChange = function () {
            console.log("onProvinceChange ...");
            dataService.getSchools($scope.ShopInfo.Province.id, function (data, status) {
                if (data.result === "success" && data.schools.length > 0) {
                    $scope.schoolList = data.schools;
                    $scope.ShopInfo.School = data.schools[0];
                    $scope.$digest();
                } else {
                    alert("获取学校列表失败！");
                }
            });
        };

        //**************
        //  data
        //**************
        $scope.ShopInfo = {
            ShopName: "",
            OwnerName: "",
            OwnerPhone: "",
            Address: "",
            Password: "",
            PasswodRp: "",
            SinglePrice: "",
            DoublePrice: "",
            SinglePriceForShop: "",
            DoublePriceForShop: "",
            Card: {
                Name: "",
                City: "",
                BranchName: "",
                Account: "",
                Owner: ""
            },
            AliPay: {
                Account: ""
            },
            PayHalf: "",
            PayWhole: "",
            School: "",
            Province: "",
            ContactNumber: ""
        };

        $scope.WaitShops = [];

        var tk; // token
        var ambassador; // promo code for xiaoyuandashi
        var acceptFileType = ['doc', 'docx', 'pdf'];
        var currentShop = "";
        var lock = "";

        //**************
        //  init
        //**************
        tk = sharedService.getCookie("token-ca");
        if (!tk) {
            // go back to login
            window.location.href = "#/login";
        }

        // 获取未完成注册的打印店信息
        dataService.getWaitShops(tk, function (data, status) {
            if (data.result === "success") {
                $scope.WaitShops = data.shop_list;
                $scope.$digest();
            } else {
                console.log(data);
                alert("获取未完成注册打印店信息失败！");
            }
        });

        // 获取大使信息
        ambassador = sharedService.getAmbassadorInfo();
        if (ambassador == null || ambassador == "") {
            dataService.getAmbassadorInfo(tk, function (data, status) {
                if (data.result === "success") {
                    ambassador = sharedService.registerAmbassador(data.info);
                } else {
                    alert("获取大使信息失败！");
                }
            });
        }

        //**************
        //  method
        //**************
        $scope.onClickApplyButton = function () {
            console.log("onClickApplyButton ...");
            dataService.startRegisterPrintShop(tk, $scope.ShopInfo, ambassador.promo_code, function (data, status) {
                console.log(data);
                if (data.result === "success") {
                    alert(data.message);
                } else {
                    alert(data.message);
                }
            });
        };

        $scope.onClickUploadButton = function (shop_id) {
            console.log("onClickUploadButton ... " + shop_id);
            if (lock == null || lock == "") {
                currentShop = shop_id;
                $('input[type=file]').click();
            } else {
                alert("请等待其他文件上床完毕！")
            }

        };

        // Action after choosing file from dialog
        $('#file').change(function () {
            var files = $('#file')[0].files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var arr = file.name.split('.');
                if (acceptFileType.indexOf(arr[arr.length - 1]) === -1) {
                    alert('纷印现在仅接受DOC，DOCX和PDF图片哦！');
                    currentShop = null;
                    lock = null;
                    return;
                } else {
                    /*
                     dataService.uploadPrintShopContact(tk, currentShop, file).done(function (res) {
                     alert("上传成功！");
                     currentShop = null;
                     lock = null;
                     })
                     .fail(function () {
                     alert("上传失败！");
                     currentShop = null;
                     lock = null;
                     });
                     */
                    dataService.uploadPrintShopContact(tk, currentShop);
                }
            }
        });

    });
