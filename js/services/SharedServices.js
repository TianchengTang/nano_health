/**
 * Created by gripleaf on 2/25/15.
 */
angular.module("frintCA.sharedServices", [])

  .service('sharedService', [function () {
    var tcookie = '';
    var ambassador = "";

    /////////  cookie operator set ///////////////////////////
    this.setCookie = function (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    };

    this.setTmpCookie = function (ck) {
      tcookie = ck;
    };

    this.getCookie = function (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return tcookie;
    };

    this.deleteCookie = function (cname) {
      tcookie = '';
      document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    };

    this.registerAmbassador = function (ca) {
      ambassador = ca;
      return ca;
    };

    this.getAmbassadorInfo = function () {
      if (ambassador == null || ambassador == "") {
        return null;
      } else {
        return ambassador;
      }
    };

    this.needRefreshInfo = function () {
      ambassador = null;
    };

  }]);