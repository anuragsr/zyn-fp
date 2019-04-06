var l = console.log.bind(window.console)
var app = angular.module('fpApp', ['ui.router', 'ui.router.title'])
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider
  .state('home', {
    url: "/home",
    templateUrl: "templates/home.html",
    controller: 'hmCtrl',
    resolve: {
      $title: function() { return 'Zynderia Home'; }
    }
  })  
  .state('search', {
    url: "/search",
    templateUrl: "templates/search.html",
    controller: 'srCtrl',
    resolve: {
      $title: function() { return 'Zynderia Search'; }
    }
  })
  .state('detail', {
    url: "/detail",
    templateUrl: "templates/detail.html",
    controller: 'fpCtrl',
    params: { p: null, section: null },
    resolve: {
      $title: function() { return 'Zynderia Product Detail'; }
    }
  })
})