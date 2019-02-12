document.addEventListener('DOMContentLoaded', init);

function init () {
  const tabs = document.querySelectorAll('nav a');
  Array.from(tabs).forEach((tab) => {
    if (tab.classList.contains('active')) sendRequest(tab.href);
    tab.addEventListener('click', loadTab);
  });
};

function loadTab(event) {
  event.preventDefault();
  Array.from(document.querySelectorAll('.tabs a')).forEach((tab) => {
    tab === this ? tab.classList.add('active') : tab.classList.remove('active');
  });
  sendRequest(this.href);
};

function sendRequest(link) {
  const request = new XMLHttpRequest(),
        preloader = document.getElementById('preloader');
  
  request.addEventListener('load' , onLoad);
  request.addEventListener('progress', onProgress);
  request.open('GET', link, true);
  request.send();
  
  function onLoad() {
    preloader.classList.add('hidden');
    if (request.status === 200) {
      document.getElementById('content').innerHTML = request.responseText;
    };
  };
  
  function onProgress(event) {
    preloader.classList.remove('hidden');
  };
};