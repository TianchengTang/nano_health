/**
 * Created by Vinci on 2015/2/19 0019.
 */
angular.module("frintCA.shopReviewCtrl", ['frintCA.dataServices', 'frintCA.sharedServices'])

  .controller('ShopReviewCtrl', function ($scope, dataService, sharedService) {
    console.log("-- ShopReviewCtrl");

    //**************
    //  data
    //**************
    $scope.feedBack = {
      isWork: "",
      isSuit: "",
      isObserve: "",
      score: "",
      smgui: ""
    };

    var tk;

    //**************
    //  init
    //**************
    tk = sharedService.getCookie("token-ca");
    if (!tk) {
      window.location.href = "#/login";
    }

    dataService.getPrintShops(tk, function (data) {
      if (data.result === "success") {
        $scope.printShops = data.status;
      }
    });

    //**************
    //  method
    //**************
    $scope.onClickSaveButton = function () {
      console.log("onClickSaveButton ...");
      $scope.feedBack.printshop_id = $scope.printShop.id;
      $scope.feedBack.problems = ($scope.feedBack.isWork == true ? 1 : 0) * 4 + ($scope.feedBack.isSuit == true ? 1 : 0) * 2 + ($scope.feedBack.isObserve == true ? 1 : 0);
      dataService.uploadPrintShopFeedBack(tk, $scope.feedBack, function (data, status) {
        if (data.result === "success") {
          alert("回访成功！");
        } else {
          alert("上传打印店回访信息失败！");
        }
      });
    };

  });
