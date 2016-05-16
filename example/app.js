angular
    .module('app',["pukRating"])
    .controller('appController',appController);


function appController() {
    var vm = this;

    vm.puk = 5;
    vm.selectedPuk = 2;
}