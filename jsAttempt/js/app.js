(function() {
  var main = document.getElementById('main'),
    searchBtn = document.getElementById('searchBtn'),
    searchTerm = document.getElementById('searchInput'),
    resultList = document.getElementById('results'),
    nextBtn = document.getElementById('nextBtn'),
    listViewBtn = document.getElementById('listViewBtn'),
    tileViewBtn = document.getElementById('tileViewBtn'),
    artwork = document.getElementById('artwork'),
    audio = document.getElementById('audio'),
    history = document.getElementById('history'),
    baseURL = 'https://api.soundcloud.com/tracks/',
    clientID = '?client_id=d652006c469530a4a7d6184b18e16c81',
    data,
    isTileView,
    currentResults,
    count = 0;

    // get nearest parent element matching selector
    // taken from here: http://stackoverflow.com/a/16430350/703717
    function closest(el, selector) {
        var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        while (el) {
            if (matchesSelector.call(el, selector)) {
                break;
            }
            el = el.parentElement;
        }
        return el;
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

    function pushToHistory() {
      var item = document.createElement('li');
      item.textContent = searchTerm.value;
      if(history.children.length === 5) {
        history.removeChild(history.lastElementChild);
      }
      history.insertBefore(item,history.firstElementChild);
      updateLocalStorage();
    }
    function setStorage(key,value) {
      localStorage.setItem(key, value);
    }
    function getStorage(key,value) {
      localStorage.getItem(key, value);
    }
    function setupStorage() {
      var storageItem, recentItems = '';
      if(!localStorage.getItem('isTileView')) {
        // no local storage yet - so set it up
        setStorage('isTileView','false');
        isTileView = false; //list view by default
      }
      else {
        if(localStorage.getItem('isTileView') === 'true') {
          main.classList.add('tile');
          isTileView = true;
        }
        else {
          isTileView = false;
        }
        for(var i=0;i<5;i++) {
          storageItem = localStorage.getItem('recent' + i);
          if(storageItem) {
            recentItems += '<li>' + storageItem;
          }
          else { break; }
        }
        history.innerHTML = recentItems;
      }
    }
    function updateLocalStorage() {
      var searches = history.children;
      for(var i=0;i<searches.length;i++) {
        setStorage('recent' + i,searches[i].textContent);
      }
    }
    function createItemClone(item) {
      console.log('cloning...',item);
      var itemClone = item.cloneNode(true);
      itemClone.classList.add('clone');
      //console.log(item.getBoundingClientRect().left,item.getBoundingClientRect().top);
      itemClone.style.left = item.getBoundingClientRect().left + 'px';
      itemClone.style.top = item.getBoundingClientRect().top + 'px';
      results.appendChild(itemClone);
      animateItem(itemClone);
      artwork.style.display = 'block';
      showArtwork();
      removeClone(itemClone);
    }
    function removeClone(clone) {
      setTimeout(function() {
        results.removeChild(clone);
      }, 700);
    }
    function showArtwork() {
      setTimeout(function() {
        artwork.classList.add('show');
      }, 500);
    }
    function animateItem(item) {
      console.log('moving...',item);
      setTimeout(function() {
        var diffX = getCenterCoords(artwork).x - getCenterCoords(item).x;
        var diffY = getCenterCoords(artwork).y - getCenterCoords(item).y;
        //console.log(diffX,diffY);
        item.style.left = parseInt(getComputed(item,'left'), 10) + diffX + 'px';
        item.style.top = parseInt(getComputed(item,'top'), 10) + diffY + 'px';
        item.style.opacity = 0;
        //artwork.classList.add('show');
      }, 0);
    }
    function resetMedia() {
      audio.classList.remove('playing');
      audio.src = '';
      artwork.src = '';
    }
    function getData() {
      var request = new XMLHttpRequest(),
      requestURL = baseURL + clientID + '&tag_list=' + searchTerm.value;
      request.open('GET', requestURL, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          data = JSON.parse(request.responseText).filter(
            function(elem) {
              //return elem.artwork_url && elem.stream_url && elem.title.indexOf('at') !== -1;
              return elem.artwork_url && elem.stream_url;
            }
          );
          console.log(data);
          console.log('no results found : '+ data.length);
          populateResults();
        } else {
          // We reached our target server, but it returned an error
          console.log('server returned error');
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
        console.log('request error');
      };
      request.send();
    }

    function populateResults() {
      var results = "", resultObj;
      currentResults = [];
      resetMedia();
      enableBtns();
      for(var i=count;i<count+6;i++) {
        resultObj = {};
        results += '<li><figure><img src="' +
          data[i % data.length].artwork_url +
          '"><figcaption>' +
          data[i % data.length].title +
          '</figcaption></li>';
        resultObj.image = data[i % data.length].artwork_url;
        resultObj.audio = data[i % data.length].stream_url;
        currentResults.push(resultObj);
      }
      resultList.innerHTML = results;
      console.log(currentResults);
    }

    function enableBtns() {
      nextBtn.disabled = false;
      listViewBtn.disabled = false;
      tileViewBtn.disabled = false;
    }
    function disableBtns() {
      nextBtn.disabled = true;
      listViewBtn.disabled = true;
      tileViewBtn.disabled = true;
    }
    history.addEventListener('click', function(e) {
      if(e.target.tagName === 'LI') {
        searchTerm.value = e.target.innerText;
        count = 0;
        pushToHistory();
        getData();
      }
    }, false);

    artwork.addEventListener('click', function() {
      audio.play();
      audio.classList.add('playing');
    }, false);

    searchBtn.addEventListener('click', function() {
      count = 0;
      pushToHistory();
      getData();
    }, false);

    nextBtn.addEventListener('click', function() {
      count += 6;
      populateResults();
    }, false);

    listViewBtn.addEventListener('click', function() {
      console.log('list button clicked');
        if(isTileView) {
          isTileView = false;
          main.classList.remove('tile');
          setStorage('isTileView','false');
        }
    }, false);

    tileViewBtn.addEventListener('click', function() {
      console.log('tile button clicked');
      if(!isTileView) {
        isTileView = true;
        main.classList.add('tile');
        setStorage('isTileView','true');
      }
    }, false);

    results.addEventListener('click', function(e) {
      console.log('event object =',e);
      var listItem = closest(e.target, 'li');
      console.log('listItem',listItem);
      //if(e.target.tagName === 'LI') {
        var index = getIndex(listItem);
        console.log(index,currentResults[index]);
        artwork.classList.remove('show');
        artwork.style.display = 'none'; // I only want fade-in transition
        artwork.src = currentResults[index].image;
        audio.src = currentResults[index].audio + clientID;
        createItemClone(listItem);

      //}
    }, false);

    disableBtns();
    setupStorage();
}());
