function pushToHistory() {
  var item = document.createElement('li');
  item.textContent = searchTerm.value;
  if(history.children.length === 5) {
    history.removeChild(history.lastElementChild);
  }
  history.insertBefore(item,history.firstElementChild);
  updateLocalStorage();
}

history.addEventListener('click', function(e) {
  if(e.target.tagName === 'LI') {
    searchTerm.value = e.target.innerText;
    count = 0;
    pushToHistory();
    getData();
  }
}, false);
