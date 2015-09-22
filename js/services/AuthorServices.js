/**
 * Created by gripleaf on 2/25/15.
 */
angular.module("frintCA.authorServices", ['frintCA.dataServices', 'frintCA.sharedServices'])

  .service('authorService', ['dataService', 'sharedService', function (dataService, sharedService) {

    // 权限管理
    this.AuthorManage = function (tk, callback) {
      var ambassador = sharedService.getAmbassadorInfo();
      if (ambassador == null || ambassador == "") {
        dataService.getAmbassadorInfo(tk, function (data, status) {
          if (data.result === "success") {
            sharedService.registerAmbassador(data.info);
            callback(data);
          } else {
            alert(data.message);
          }
        });
      }
      else {
        setTimeout(function () {
          callback({result: "success", info: ambassador});
        }, 0);
      }
    };

  }]);