angular.module('frintCA', ["ui.router", "ui.select", "ui.bootstrap",
    'frintCA.homeCtrl',
    'frintCA.shopMonitorCtrl',
    'frintCA.editInfoCtrl',
    'frintCA.newShopCtrl',
    'frintCA.promocodeCtrl',
    'frintCA.shopReviewCtrl',
    'frintCA.shopXinaoCtrl',
    'frintCA.metaDownloadCtrl',
    'frintCA.loginCtrl',
    'frintCA.logoutCtrl',
    'frintCA.registerCtrl',
    'frintCA.applyCtrl',
    'frintCA.qaCtrl',
    'frintCA.partTimeCtrl'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: 'js/templates/login.tpl.html',
                controller: 'LoginCtrl'
            })
            .state('register', {
                url: "/register",
                templateUrl: 'js/templates/register.tpl.html',
                controller: 'RegisterCtrl'
            })
            .state('home', {
                url: "/home",
                templateUrl: 'js/templates/home.tpl.html',
                controller: "HomeCtrl"
            })
            .state('editinfo', {
                url: "/editinfo",
                templateUrl: 'js/templates/editinfo.tpl.html',
                controller: "EditInfoCtrl"
            })
            .state('shopmonitor', {
                url: "/shopmonitor",
                templateUrl: 'js/templates/shopmonitor.tpl.html',
                controller: "ShopMonitorCtrl"
            })
            .state('shopreview', {
                url: "/shopreview",
                templateUrl: 'js/templates/shopreview.tpl.html',
                controller: "ShopReviewCtrl"
            })
            .state('newshop', {
                url: "/newshop",
                templateUrl: 'js/templates/newshop.tpl.html',
                controller: "NewShopCtrl"
            })
            .state('shopxinao', {
                url: "/shopxinao",
                templateUrl: 'js/templates/shopxinao.tpl.html',
                controller: "ShopXinaoCtrl"
            })
            .state('promocode', {
                url: "/promocode",
                templateUrl: 'js/templates/promocode.tpl.html',
                controller: "PromocodeCtrl"
            })
            .state('metadownload', {
                url: "/metadownload",
                templateUrl: 'js/templates/metadownload.tpl.html',
                controller: "MetaDownloadCtrl"
            })
            .state('logout', {
                url: "/logout",
                controller: "LogoutCtrl"
            })
            .state('apply', {
                url: "/apply",
                templateUrl: 'js/templates/apply.tpl.html',
                controller: "ApplyCtrl"
            })
            .state('edu', {
                url: "/edu",
                templateUrl: 'js/templates/edu.tpl.html',
                controller: "EduCtrl"
            })
            .state('qa', {
                url: "/qa",
                templateUrl: 'js/templates/qa.tpl.html',
                controller: "QaCtrl"
            })
            .state('parttime', {
                url: "/parttime",
                templateUrl: 'js/templates/parttime.tpl.html',
                controller: "PartTimeCtrl"
            })
            .state('otherwise', {
                url: '',
                templateUrl: "js/templates/login.tpl.html",
                controller: "LoginCtrl"
            });
      $urlRouterProvider
        .otherwise("/login")
    });