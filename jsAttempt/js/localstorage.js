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
setupStorage();
