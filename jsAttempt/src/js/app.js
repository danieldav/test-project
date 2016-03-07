var galaApp = angular.module('galaApp', [])
.factory('audio',function ($document) {
  var audioElement = document.querySelector('#audio');
  return {
    audioElement: audioElement,

    play: function(filename) {
        audioElement.src = filename;
        audioElement.play();
    },
    // reset: function() {
    //   audioElement.src = '';
    // },
    // pause: function(filename) {
    //   audioElement.src = filename;
    //   audioElement.pause();
    // }

  }
})
.run(function($rootScope) {
    $rootScope.showArtwork = false;
    $rootScope.fadeinArtwork = false;
    $rootScope.isPlaying = false;
    $rootScope.artworkSrc = '';
    $rootScope.audioSrc = '';
    $rootScope.recentItems = [];
    //$rootScope.art = '';
});

// .factory('animateService', function() {
//   var _showImg = false;
//
//   // public API
//   return {
//     showImg: _showImg;
// };

// .controller('MainController', ['$scope', '$http', 'audio', function($scope, $http, audio) {
//   var main = document.querySelector('#main'),
//     artwork = document.querySelector('#artwork'),
//     //audio = document.querySelector('#audio'),
//     baseURL = 'https://api.soundcloud.com/tracks/',
//     clientID = '?client_id=d652006c469530a4a7d6184b18e16c81';
//     console.log('artwork',artwork);
//     console.log('main',main);
//   function getIndex(elem){
//     return Array.prototype.indexOf.call(elem.parentNode.children, elem);
//   }
//   function getCenterCoords(elem) {
//     var clientRect = elem.getBoundingClientRect(),
//         coords = {};
//     coords.x = clientRect.left + clientRect.width / 2;
//     coords.y = clientRect.top + clientRect.height / 2;
//     return coords;
//   }
//   function getComputed(elem,prop) {
//     return getComputedStyle(elem,null).getPropertyValue(prop);
//   }
//   function animateItem(item) {
//     console.log('moving...',item);
//     setTimeout(function() {
//       console.log('artwork',artwork);
//       var diffX = getCenterCoords(artwork).x - getCenterCoords(item).x;
//       var diffY = getCenterCoords(artwork).y - getCenterCoords(item).y;
//       //console.log(diffX,diffY);
//       item.style.left = parseInt(getComputed(item,'left'), 10) + diffX + 'px';
//       item.style.top = parseInt(getComputed(item,'top'), 10) + diffY + 'px';
//       item.style.opacity = 0;
//       //artwork.classList.add('show');
//     }, 0);
//   }
//   // function cloneItem(item) {
//   //
//   // }
//   function removeClone(clone) {
//     setTimeout(function() {
//       clone.parentNode.removeChild(clone);
//     }, 700);
//   }
//   function showArtwork() {
//     setTimeout(function() {
//       //artwork.classList.add('show');
//       //$rootScope.fadeinArtwork = true;
//       //$scope.fadeinArtwork = true;
//       artwork.classList.add('fadein');
//     }, 500);
//   }
//   if(localStorage.getItem('isTile') === 'true') {
//     $scope.isTile = true;
//     //main.classList.add('tile'); //TODO: find a way around this
//     //console.log('hi there0');
//   }
//   else {
//     $scope.isTile = false;
//     //console.log('hi there1');
//   }
//   $scope.trackIndex = 0;
//   $scope.isPlaying = false;
//
//   $scope.getData = function() {
//     $http.get(baseURL + clientID).success(function (data) {
//       $scope.tracks = data.filter(function (track) {
//           return track.artwork_url && track.stream_url;
//       });
//       //$scope.numAllTracks = data.length;
//       $scope.numTracks = $scope.tracks.length;
//       resetMedia();
//       //console.log('data', data);
//       //console.log('data length', $scope.numAllTracks);
//
//       //console.log('filtered tracks', $scope.tracks);
//       //console.log('filtered tracks length', $scope.numTracks);
//     });
//   };
//   $scope.getNextData = function() {
//     $scope.trackIndex = ($scope.trackIndex + 6) % $scope.numTracks;
//     //console.log('track index', $scope.trackIndex);
//     resetMedia();
//   }
//
//   $scope.setListView = function($event) {
//     $scope.isTile = false;
//     localStorage.setItem('isTile', 'false');
//     //main.classList.remove('tile'); //TODO: find a way around this
//   };
//   $scope.setTileView = function($event) {
//     $scope.isTile = true;
//     localStorage.setItem('isTile', 'true');
//     //main.classList.add('tile'); //TODO: find a way around this
//   };
//   function resetMedia() {
//     //audio.classList.remove('playing');
//     $scope.isPlaying = false;
//     //$rootScope.artworkSrc = '';
//     //$rootScope.audioSrc = '';
//     //audio.src = '';
//     artwork.src = '';
//     audio.reset();
//     console.log('reseting audio');
//   }
//   $scope.cloneAndAnimate = function($event) {
//     console.log('this = ', $event.currentTarget);
//     var item = $event.currentTarget,
//         index = getIndex(item);
//         itemClone = item.cloneNode(true);
//
//
//     // $rootScope.fadeinArtwork = false;
//     // $rootScope.showArtwork = false;
//     // $rootScope.artworkSrc = $scope.tracks[index].artwork_url;
//     // $rootScope.audioSrc = $scope.tracks[index].stream_url + clientID;
//     // $rootScope.artworkSrc = $scope.tracks[index].artwork_url;
//     // $rootScope.audioSrc = $scope.tracks[index].stream_url + clientID;
//     //$scope.fadeinArtwork = false;
//     //$scope.showArtwork = false;
//     artwork.style.display = 'none'; // I only want fade-in transition
//     artwork.classList.remove('fadein');
//     $scope.artworkSrc = $scope.tracks[$scope.trackIndex + index].artwork_url;
//     $scope.audioSrc = $scope.tracks[$scope.trackIndex + index].stream_url + clientID;
//     console.log('$scope.artworkSrc',$scope.artworkSrc);
//     console.log('$scope.audioSrc',$scope.audioSrc);
//     // artwork.classList.remove('show');
//     // artwork.style.display = 'none'; // I only want fade-in transition
//     // artwork.src = currentResults[index].image;
//     // audio.src = currentResults[index].audio + clientID;
//
//     console.log('cloning...',item);
//     //itemClone = item.cloneNode(true);
//     itemClone.classList.add('clone');
//     console.log(item.getBoundingClientRect().left,item.getBoundingClientRect().top);
//     itemClone.style.left = item.getBoundingClientRect().left + 'px';
//     itemClone.style.top = item.getBoundingClientRect().top + 'px';
//     item.parentNode.appendChild(itemClone);
//     animateItem(itemClone);
//     //$rootScope.showArtwork = true;
//     //$scope.showArtwork = true;
//     artwork.style.display = 'block';
//     showArtwork();
//     removeClone(itemClone);
//   };
//   $scope.playTrack = function() {
//     $scope.isPlaying = true;
//     //console.log('audio',audio);
//     //console.log('audioSrc',$rootScope.audioSrc);
//     audio.play($scope.audioSrc);
//     //audio.play();
//
//   };
//
//
// }]);
