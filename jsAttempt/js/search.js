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
