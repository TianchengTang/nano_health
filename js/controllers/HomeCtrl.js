angular.module("frintCA.homeCtrl", ['frintCA.dataServices', 'frintCA.sharedServices', "frintCA.authorServices"])

  .controller('HomeCtrl', function ($scope, dataService, sharedService, authorService) {
    console.log("-- HomeCtrl");

    //*********************
    // data
    //*********************

    genDate = function (days) {
      var today = new Date();
      today.setTime(today.getTime() - days * 24 * 3600 * 1000);
      var daylist = [];
      for (var i = 0; i < days; i++) {
        today.setTime(today.getTime() + 1 * 24 * 3600 * 1000);
          var $m = "" + (today.getMonth() + 1);
          if ((today.getMonth() + 1) < 10) {
              $m = "0" + $m;
          }

          var $d = "" + today.getDate();
          if ((today.getDate() + 1) < 10) {
              $d = "0" + $d;
          }
        daylist.push(today.getFullYear() + "-" + $m + "-" + $d);
      }
      return daylist;
    };

    id2School = function (id) {
      dataService.getSchool(id, function (data, status) {
        if (data.result == "success") {
          console.log(data);
          for (var i = 0; i < $scope.caApplyList.length; i++) {
            if ($scope.caApplyList[i].school_id == id) {
              $scope.caApplyList[i].school_name = data.school.name;
              $scope.caApplyList[i].province_name = data.school.province.name;
            }
          }
          $scope.$digest();
        }
      });
    };

    promo2Ambassador = function (promo) {

      dataService.getAmbassadorByPromo(promo, function (data, status) {
        if (data.result == "success") {
          for (var i = 0; i < $scope.psApplyList.length; i++) {
            if ($scope.psApplyList[i].promo_from == promo) {
              $scope.psApplyList[i].ambassador = data.info.name;
              $scope.psApplyList[i].am_cellphone = data.info.cellphone;
              $scope.psApplyList[i].am_school_id = data.info.school_id;
              dataService.getSchool(data.info.school_id, function (sdata, status) {
                if (sdata.result === "success") {
                  for (var j = 0; j < $scope.psApplyList.length; j++) {
                    if ($scope.psApplyList[j].am_school_id == sdata.school.id) {
                      $scope.psApplyList[j].am_school_name = sdata.school.name;
                      $scope.psApplyList[j].am_province_name = sdata.school.province.name;
                    }
                  }
                  $scope.$digest();
                }
              });
            }
          }
          $scope.$digest();
        }
      });
    };

    $scope.unfinished_tasks = [];
    $scope.payUser = "获取中";
    var tk; //token
    var is_super = 0;


    //*********************
    // init
    //*********************
    tk = sharedService.getCookie("token-ca");
    is_super = sharedService.getCookie("is-super");

    $scope.is_super = is_super;

    if (!tk) {
      window.location.href = "#/login";
    }


    authorService.AuthorManage(tk, function (data) {
      if (data.result === "success") {
        $scope.name = data.info.name;
        $scope.promo_code = data.info.promo_code;
        $scope.$digest();
      }
    });


    dataService.getUnfinishedTasks(tk, function (data, status) {
      if (data.result === "success") {
        $scope.unfinished_tasks = data.tasks;
        $scope.$digest();
      } else {
        alert("获取未完成任务列表失败！");
      }
    });

    dataService.getActiveUser(tk, function (data, status) {
      if (data.result === "success") {
        $scope.payUser = data.count;
        $scope.$digest();
      } else {
        $scope.payUser = "异常";
      }
    });

    this.refreshAmbassador = function () {
      $scope.caApplyList = {};
      dataService.getAmbassadorForApply(tk, function (data, status) {
        if (data.result === "success") {
          $scope.caApplyList = data.list;
          for (var i = 0; i < data.list.length; i++) {
            id2School(data.list[i].school_id);
          }
          $scope.$digest();
        } else {
          alert("获取待审核大使失败！");
        }
      });
    };

    this.refreshTDView = function () {
      $scope.tdLines = {};
      dataService.getTenDayView(tk, function (data, status) {
        if (data.result === "success") {
          $scope.tdLines = data.view;
          //alert($scope.tdLines);
          $scope.$digest();
        } else {
          alert("获取视图失败！");
        }
      });
    };

    if (is_super) {
      this.refreshAmbassador();
      this.refreshTDView();
    }

    this.refreshShopForApply = function () {
      $scope.psApplyList = {};
      dataService.getShopForApply(tk, function (data, status) {
        if (data.result === "success") {
          $scope.psApplyList = data.list;
          for (var i = 0; i < data.list.length; i++) {
            promo2Ambassador(data.list[i].promo_from);
          }
          $scope.$digest();
        } else {
          alert("获取待审核店铺失败！");
        }
      });
    };

    if (is_super) {
      this.refreshShopForApply();
    }


    $scope.labels = genDate(15);
    $scope.series = ['Series A', 'Series B'];



    dataService.getSchoolUserCount(tk,function(data,status){
      if(data.result === "success"){
        $scope.auc = data.auc;
        $scope.uc = data.uc;
        $scope.$digest();
      }
    });

    dataService.getFrontNumbers(tk, '0000-00-00',function(data,status) {
      if(data.result === "success"){
        $scope.FrontNumbers = data.data;
        dataService.createHistogram($scope.labels, $scope.FrontNumbers.apd, "#histogram", ["活跃用户", "注册用户"]);
        dataService.createHistogram($scope.labels, $scope.FrontNumbers.apd, "#histogramTotal", ["总计活跃", "总计注册"]);
        $scope.$digest();
      }
    });



    // 获取总注册人数和总活跃用户人数
    $scope.payUser = $scope.RegisterTotal = 0;
    dataService.getAmbassadorPromoUserCount(tk, function (data, status) {
      if (data.result === "success") {
        $scope.payUser = data.auc;
        $scope.RegisterTotal = data.uc;
        $scope.$digest();
      }
    });


    //*********************
    // method
    //*********************

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

    $scope.onClickFinishButton = function (task_id) {
      console.log("onClickFinishButton ...");
      dataService.finishTask(tk, task_id, function (data, status) {
        if (data.result === "success") {
          alert(data.message);
        } else {
          alert(data.message);
        }
      });
    };

    $scope.onClickUploadButton = function () {
      console.log("onClickUploadButton ...");
      dataService.uploadAmbassadorContact(tk);
    };

    $scope.applyCa = function (id) {
      dataService.applyCa(tk, id, function (data, status) {
        if (data.result === "success") {
          alert(data.message);
        } else {
          alert(data.message);
        }
      });
    };

    $scope.denyCa = function (id) {
      dataService.denyCa(tk, id, function (data, status) {
        if (data.result === "success") {
          alert(data.message);
        } else {
          alert(data.message);
        }
      });
    };

    $scope.applyPs = function (id) {
      dataService.applyPs(tk, id, function (data, status) {
        if (data.result === "success") {
          alert(data.message + "刷新后消除");
        } else {
          alert(data.message);
        }
      });
      //this.refreshShopForApply();
    };

    $scope.denyPs = function (id) {
      dataService.denyPs(tk, id, function (data, status) {
        if (data.result === "success") {
          alert(data.message + "刷新后消除");
        } else {
          alert(data.message);
        }
      });
      //this.refreshShopForApply();
    };

  });