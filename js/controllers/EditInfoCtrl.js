angular.module("frintCA.editInfoCtrl", ['frintCA.dataServices', 'frintCA.sharedServices', "frintCA.authorServices"])

  .controller('EditInfoCtrl', function ($scope, dataService, sharedService, authorService) {
    console.log("-- EditInfoCtrl");

    //**************
    //  helper
    //**************
    var findById = function (list, id) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          return list[i];
        }
      }
      return {};
    };


    //**************
    //  data
    //**************
    $scope.userInfo = {
      name: "",
      gender: "",
      QQ: "",
      Province: "",
      School: "",
      Address: "",
      FinishYear: "",
      whoami: "",
      AccountName: "",
      AccountBank: "",
      AccountNumber: "",
      AccountCity: "",
      Mail: "",
      Major: "",
      SchoolArea: "",
      AreaStudentId: ""
    };

    $scope.schoolList = [];

    $scope.provinceList = [];

    $scope.majorList = [];

    var tk;
    //**************
    //  init
    //**************

    tk = sharedService.getCookie("token-ca");

    if (!tk) {
      window.location.href = "#/login";
    }

    // 获取大使信息


    authorService.AuthorManage(tk, function (data) {
      if (data.result === "success") {
        $scope.userInfo.name = data.info.name;
        $scope.userInfo.gender = data.info.gender == "1" ? "男" : "女";
        $scope.userInfo.whoami = data.info.whoami;
        $scope.userInfo.Address = data.info.address;
        $scope.userInfo.FinishYear = data.info.finish_year;
        $scope.userInfo.QQ = data.info.qq;
        $scope.userInfo.AccountName = data.info.account_name;
        $scope.userInfo.AccountBank = data.info.account_bank;
        $scope.userInfo.AccountNumber = data.info.account_number;
        $scope.userInfo.AccountSubBank = data.info.account_subbank;
        $scope.userInfo.AccountCity = data.info.account_city;
        $scope.userInfo.Mail = data.info.mail;
        $scope.userInfo.SchoolArea = data.info.school_area;
        $scope.userInfo.School = {id: data.info.school_id};
        $scope.userInfo.Major = {id: data.info.major_id};
        console.log("第一次" + data.info.school_id);
        $scope.userInfo.AreaStudentCount = data.info.area_student_count;

        $scope.$digest();

        // 获取省份信息
        dataService.getProvinces(function (pdata, status) {
          if (pdata.result === "success" && pdata.provinces.length > 0) {
            $scope.provinceList = pdata.provinces;

            // 获取学校信息
            dataService.getSchool(data.info.school_id, function (sdata, status) {
              if (sdata.result === "success") {
                $scope.userInfo.Province = findById($scope.provinceList, sdata.school.province_id);
                $scope.onProvinceChange();
                $scope.$digest();

                dataService.getMajor(data.info.school_id, function (mdata, status) {
                  if (mdata.result === "success") {
                    $scope.majorList = mdata.majors;
                    $scope.$digest();
                    for (var i = 0; i < mdata.majors.length; i++) {
                      if (mdata.majors[i].id == data.major_id) {
                        $scope.userInfo.Major = mdata.majors[i];
                        $scope.onSchoolChange();
                        $scope.$digest();
                        return;
                      }
                    }
                  } else {
                    alert("获取专业信息失败");
                  }
                });

              } else {
                alert("获取学校信息失败");
              }
            });
          } else {
            alert("获取省份信息失败！");
          }
        });

      } else {
        alert("获取大使信息失败！");
      }
    });


    //**************
    //  method
    //**************
    $scope.onClickEditInfo = function () {
      console.log("onClickEditInfo ...");
      dataService.updateAmbassadorInfo(tk, $scope.userInfo, function (data, status) {
        if (data.result === "success") {
          sharedService.needRefreshInfo();
          alert("更新成功！");
        } else {
          alert("更新失败！错误代码：" + data.message);
        }
      });
    };

    $scope.onProvinceChange = function () {
      console.log("onProvinceChange ...");
      dataService.getSchools($scope.userInfo.Province.id, function (data, status) {
        if (data.result === "success" && data.schools.length > 0) {
          $scope.schoolList = data.schools;
          console.log($scope.schoolList);
          $scope.userInfo.School = findById($scope.schoolList, $scope.userInfo.School.id);
          console.log("第二次" + $scope.userInfo.School.name);
          /*$scope.userInfo.School = {id: sdata.school.id, name: sdata.school.name};*/
          $scope.$digest();
        } else {
          alert("获取学校列表失败！");
        }
      });
    };
  });