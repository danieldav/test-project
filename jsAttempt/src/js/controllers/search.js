//galaApp.controller('SearchController', ['$scope', '$http', '$animateService', function($scope, $http, $animateService) {
galaApp.controller('SearchController', ['$scope', '$http', '$rootScope','audio', function($scope, $http, $rootScope, audio) {
  var main = document.querySelector('#main'),
    artwork = document.querySelector('#artwork'),
    searchInput = document.querySelector('#searchInput'),
    //audio = document.querySelector('#audio'),
    baseURL = 'https://api.soundcloud.com/tracks/',
    clientID = '?client_id=d652006c469530a4a7d6184b18e16c81';
    console.log('artwork',artwork);
    console.log('main',main);

  function setupStorage() {
    var storageItem;
    // if(localStorage.getItem('isTile') === 'true') {
    //   $scope.isTile = true;
    //   main.classList.add('tile'); //TODO: find a way around this
    //   //console.log('hi there0');
    // }
    // else {
    //   $scope.isTile = false;
    //   //console.log('hi there1');
    // }
    if(!localStorage.getItem('isTile')) {
      // no local storage yet - so set it up
      localStorage.setItem('isTile', 'false');
      $scope.isTile = false; //list view by default
    }
    else {
      if(localStorage.getItem('isTile') === 'true') {
        main.classList.add('tile');
        $scope.isTile = true;
      }
      else {
        $scope.isTile = false;
      }
      for(var i=0;i<5;i++) {
        storageItem = localStorage.getItem('recent' + i);
        if(storageItem) {
          //recentItems += '<li>' + storageItem;
          $rootScope.recentItems[i] = storageItem;
        }
        else { break; }
      }
      //recentHistory.innerHTML = recentItems;
    }
  }
  function updateLocalStorage() {
    //var searches = recentHistory.children;
    for(var i=0;i<$rootScope.recentItems.length;i++) {
      //setStorage('recent' + i,$scope.recentItems[i].textContent);
      localStorage.setItem('recent' + i, $rootScope.recentItems[i]);
    }
  }
  function pushToHistory() {
    // var item = document.createElement('li');
    // item.textContent = searchTerm.value;
    // if(recentHistory.children.length === 5) {
    //   recentHistory.removeChild(recentHistory.lastElementChild);
    // }
    // recentHistory.insertBefore(item,recentHistory.firstElementChild);
    if($rootScope.recentItems.length == 5) {
      $rootScope.recentItems.pop();
    }
    $rootScope.recentItems.unshift($scope.query);
    updateLocalStorage();
  }
  function getIndex(elem){
    return Array.prototype.indexOf.call(elem.parentNode.children, elem);
  }
  function getCenterCoords(elem) {
    var clientRect = elem.getBoundingClientRect(),
        coords = {};
    coords.x = clientRect.left + clientRect.width / 2;
    coords.y = clientRect.top + clientRect.height / 2;
    return coords;
  }
  function getComputed(elem,prop) {
    return getComputedStyle(elem,null).getPropertyValue(prop);
  }
  function animateItem(item) {
    console.log('moving...',item);
    setTimeout(function() {
      console.log('artwork',artwork);
      var diffX = getCenterCoords(artwork).x - getCenterCoords(item).x;
      var diffY = getCenterCoords(artwork).y - getCenterCoords(item).y;
      //console.log(diffX,diffY);
      item.style.left = parseInt(getComputed(item,'left'), 10) + diffX + 'px';
      item.style.top = parseInt(getComputed(item,'top'), 10) + diffY + 'px';
      item.style.opacity = 0;
      //artwork.classList.add('show');
    }, 0);
  }

  function removeClone(clone) {
    setTimeout(function() {
      clone.parentNode.removeChild(clone);
    }, 700);
  }
  function showArtwork() {
    setTimeout(function() {
      //$rootScope.fadeinArtwork = true;
      artwork.classList.add('fadein');
    }, 500);
  }
  function resetMedia() {
    //audio.classList.remove('playing');
    //audio.pause($rootScope.audioSrc);
    $rootScope.isPlaying = false;
    $rootScope.artworkSrc = '';
    $rootScope.audioSrc = '';
    //audio.src = '';
    artwork.src = '';
    //audio.reset();

    console.log('reseting audio');
  }
  setupStorage();
  $scope.query = '';
  $scope.trackIndex = 0;

  $scope.getData = function() {

    //$scope.query = query; //??
    $scope.query = searchInput.value;
    console.log('searchInput.value: ',searchInput.value);
    $http.get(baseURL + clientID).success(function (data) {
      $scope.tracks = data.filter(function (track) {
          return track.artwork_url && track.stream_url;
      });
      //$scope.numAllTracks = data.length;
      $scope.numTracks = $scope.tracks.length;
      //console.log('data', data);
      //console.log('data length', $scope.numAllTracks);

      //console.log('filtered tracks', $scope.tracks);
      //console.log('filtered tracks length', $scope.numTracks);

      resetMedia();
      pushToHistory();

    });
  };
  $scope.getNextData = function() {
    $scope.trackIndex = ($scope.trackIndex + 6) % $scope.numTracks;
    resetMedia();
    //console.log('track index', $scope.trackIndex);
  }

  $scope.setListView = function($event) {
    $scope.isTile = false;
    localStorage.setItem('isTile', 'false');
    main.classList.remove('tile'); //TODO: find a way around this
  };
  $scope.setTileView = function($event) {
    $scope.isTile = true;
    localStorage.setItem('isTile', 'true');
    main.classList.add('tile'); //TODO: find a way around this
  };
  $scope.cloneAndAnimate = function($event) {
    console.log('this = ', $event.currentTarget);
    var item = $event.currentTarget,
        index = getIndex(item);
        itemClone = item.cloneNode(true);
        currentTrack = $scope.tracks[$scope.trackIndex + index];
    //resetMedia();
    //$rootScope.fadeinArtwork = false;
    artwork.style.display = 'none'; // I only want fade-in transition
    artwork.classList.remove('fadein');
    //$rootScope.showArtwork = false;
    $rootScope.artworkSrc = currentTrack.artwork_url;
    $rootScope.audioSrc = currentTrack.stream_url + clientID;
    // artwork.src = currentResults[index].image;
    // audio.src = currentResults[index].audio + clientID;
    //console.log('$rootScope.artworkSrc',$rootScope.artworkSrc);
    //console.log('$rootScope.audioSrc',$rootScope.audioSrc);

    console.log('cloning...',item);
    //itemClone = item.cloneNode(true);
    itemClone.classList.add('clone');
    console.log(item.getBoundingClientRect().left,item.getBoundingClientRect().top);
    itemClone.style.left = item.getBoundingClientRect().left + 'px';
    itemClone.style.top = item.getBoundingClientRect().top + 'px';
    item.parentNode.appendChild(itemClone);
    animateItem(itemClone);
    //$rootScope.showArtwork = true;
    artwork.style.display = 'block';
    showArtwork();
    removeClone(itemClone);
  };


}]);

// function createItemClone(item) {
//   console.log('cloning...',item);
//   var itemClone = item.cloneNode(true);
//   itemClone.classList.add('clone');
//   //console.log(item.getBoundingClientRect().left,item.getBoundingClientRect().top);
//   itemClone.style.left = item.getBoundingClientRect().left + 'px';
//   itemClone.style.top = item.getBoundingClientRect().top + 'px';
//   results.appendChild(itemClone);
//   animateItem(itemClone);
//   artwork.style.display = 'block';
//   showArtwork();
//   removeClone(itemClone);
// }




// function resetMedia() {
//   audio.classList.remove('playing');
//   audio.src = '';
//   artwork.src = '';
// }


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
