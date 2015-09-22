/**
 * Created by gripleaf on 2/22/15.
 */
/**
 * Created by gripleaf on 11/29/2014.
 */
angular.module('frintCA.logoutCtrl', ['frintCA.dataServices', 'frintCA.sharedServices'])
    .controller('LogoutCtrl', function ($scope, dataService, sharedService) {

        console.log('-- LogoutCtrl');
        sharedService.deleteCookie("token-ca");
        window.location.href = "#/login";
    });