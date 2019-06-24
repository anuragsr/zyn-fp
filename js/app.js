var l = console.log.bind(window.console)
var isMobile = function() {
  if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    || window.innerWidth < 768
  ) {
    return true
  }
  else {
    return false
  }
}

var isTablet = function() {
  if (
    navigator.userAgent.match(/iPad/i)
    || (window.innerWidth >= 768 && window.innerWidth <= 1024)
  ) {
    return true
  }
  else {
    return false
  }
}

var isIE = function(){ return /*@cc_on!@*/false || !!document.documentMode }
var isEdge = function(){ return !isIE() && !!window.StyleMedia }
var app = angular.module('fpApp', ['ui.router', 'ui.router.title'])
app
.config(function($stateProvider, $urlRouterProvider) {  
  $urlRouterProvider.otherwise("/property/the-banks/");
  // $urlRouterProvider.otherwise("/home");
  $stateProvider
  // .state('home', {
  //   url: "/home",
  //   templateUrl: "templates/home.html",
  //   controller: 'hmCtrl',
  //   resolve: {
  //     $title: function() { return 'Zynderia Property Detail'; }
  //   }
  // }) 
  // .state('detail', {
  //   url: "/detail",
  //   templateUrl: "templates/detail.html",
  //   controller: 'fpCtrl',
  //   params: { t: null, p:null, all: null, l: null, s: null },
  //   resolve: {
  //     $title: function() { return 'Zynderia Location Detail'; }
  //   }
  // })
  .state('property', {
    url: "/property/:propertyName/",
    templateUrl: "templates/home.html",
    controller: 'hmCtrl',
    resolve: {
      $title: function() { return 'Zynderia Property Detail'; }
    }
  })
  .state('location', {
    url: "/property/:propertyName/:locationName",
    templateUrl: "templates/detail.html",
    controller: 'fpCtrl',
    params: { t: null, p:null, all: null, l: null },
    resolve: {
      $title: function() { return 'Zynderia Location Detail'; }
    },
  })
  .state('search', {
    url: "/search",
    templateUrl: "templates/search.html",
    controller: 'srCtrl',
    resolve: {
      $title: function() { return 'Zynderia Search'; }
    }
  })
})
.filter('trusted', function ($sce) {
  return function (text) {
    return $sce.trustAsResourceUrl(text)
  }
})
.directive('whenScrolled', function () {
  return function (scope, elm, attr) {
    var raw = elm[0];
    
    elm.bind('scroll', function () {
      if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
        scope.$apply(attr.whenScrolled);
      }
    });
  };
})
;