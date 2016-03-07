//galaApp.controller('SearchController', ['$scope', '$http', '$animateService', function($scope, $http, $animateService) {
galaApp.controller('HistoryController', ['$scope', '$rootScope', function($scope, $rootScope) {
//angular.element(e.target).siblings('#upload').trigger('click');
  var searchBtn = document.querySelector('#searchBtn');
  $scope.search = function() {
    
  }
}]);


// recentHistory.addEventListener('click', function(e) {
//   if(e.target.tagName === 'LI') {
//     searchTerm.value = e.target.innerText;
//     count = 0;
//     pushToHistory();
//     getData();
//   }
// }, false);

// function setStorage(key,value) {
//   localStorage.setItem(key, value);
// }
// function getStorage(key,value) {
//   localStorage.getItem(key, value);
// }
// function setupStorage() {
//   var storageItem, recentItems = '';
//   if(!localStorage.getItem('isTileView')) {
//     // no local storage yet - so set it up
//     setStorage('isTileView','false');
//     isTileView = false; //list view by default
//   }
//   else {
//     if(localStorage.getItem('isTileView') === 'true') {
//       main.classList.add('tile');
//       isTileView = true;
//     }
//     else {
//       isTileView = false;
//     }
//     for(var i=0;i<5;i++) {
//       storageItem = localStorage.getItem('recent' + i);
//       if(storageItem) {
//         recentItems += '<li>' + storageItem;
//       }
//       else { break; }
//     }
//     recentHistory.innerHTML = recentItems;
//   }
// }
// function updateLocalStorage() {
//   var searches = recentHistory.children;
//   for(var i=0;i<searches.length;i++) {
//     setStorage('recent' + i,searches[i].textContent);
//   }
// }
