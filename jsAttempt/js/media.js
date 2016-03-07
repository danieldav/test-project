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

artwork.addEventListener('click', function() {
  audio.play();
  audio.classList.add('playing');
}, false);
