(function () {
	"use strict";

	  angular.module('homeCtrl', ['ui.bootstrap']);
		
		angular.module('directives', []);

		/**/
    angular.module('RDApp', ['ngMaterial','ngAnimate', 'ui.router', 'directives', 'config', 'homeCtrl']);

})();

(function(){
  'use strict';

  angular.module('config', [ 'ngMaterial' ]);

})();

(function(){

  angular
    .module('config')
    .config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
      .state('app', {
        url: "/",
        views: {
          'content':{
            templateUrl: 'views/home.html',
            controller: 'HomeController as hc'
          },
          'header':{
            templateUrl: 'views/templates/_header.html'/*,
            controller: 'HeaderController as hdc'*/
          }
        }
      })
      .state('app.construction', {
        url: "underconstruction",
        views: {
          'content@': {
            templateUrl: 'views/construction.html'
          }
        }
      })

      $urlRouterProvider.otherwise('/');
      //$locationProvider.html5Mode(true);
    }]);


})();

(function(){
   "use strict";

    angular.module('homeCtrl').controller('HomeController', [function(){
      var vm = this;
      vm.title = "Home";


      vm.buildArray = buildArray;

      function buildArray(num) {
        return new Array(num);
      }


    }]);

})();

(function(){
   "use strict";

    angular.module('directives').directive('randomMotion', ['$timeout', function($timeout) {
      return {
        restrict: 'EA',
        link: function ($scope, element, attrs) {
          console.log("Start Motion");
          var parentContainer = element[0].offsetParent;

          // Randomly Set Postion & Velocity
          var maxVelocity = 150;
          var posX = (Math.random() * parentContainer.clientWidth);//Math.min(0, Math.max(20, (Math.random() * 0)));
          var posY = (Math.random() * parentContainer.clientHeight);//Math.min(0, Math.max(20, (Math.random() * 10)));
          var velX = (Math.random() * maxVelocity);
          var velY = (Math.random() * maxVelocity);
          var timestamp = null;

          var randSize = Math.floor((Math.random() * (50 - 20)) + 20);

          element.css({ "width": randSize, "height": randSize });

          // Move Object
          (function tick() {
            var now = new Date().getTime();
            var borderX = randSize;
            var borderY = randSize; 

            var maxX = parentContainer.clientWidth - borderX;
            var maxY = parentContainer.clientHeight - borderY;

            var elapsed = (timestamp || now) - now;
            timestamp = now;
            posX += elapsed * velX / 1000;
            posY += elapsed * velY / 1000;

            if (posX > maxX) {
                posX = 2 * maxX - posX;
                velX *= -1;
            }
            if (posX < 0) {
                posX = 0;
                velX *= -1;
            }
            if (posY > maxY) {
                posY = 2 * maxY - posY;
                velY *= -1;
            }
            if (posY < 0) {
                posY = 0;
                velY *= -1;
            }
            element.css({ "top": posY, "left": posX });
            // Set Position to $element top and left
            // Loop to Move object
            $timeout(tick, 30);
          })();
        }
      }
    }]);

})();
