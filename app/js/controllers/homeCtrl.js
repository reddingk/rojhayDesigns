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
