document.addEventListener('DOMContentLoaded', init);

function init () {
  const booksUl = document.getElementById('content');
  const request = new XMLHttpRequest();
  booksUl.innerHTML = '';
  
  request.addEventListener('load', onLoad);
  request.open('GET', 'https://neto-api.herokuapp.com/book/', true);
  request.send();
  
  function onLoad() {
    if (request.status === 200) {
      let response = [];
      try {
        response = JSON.parse(request.responseText);
      } catch (err) {
        console.log('Ошибка парсинга JSON');
      };
  
      response.forEach((book, index) => {
        booksUl.innerHTML += `<li></li>`;
        const bookLi = booksUl.getElementsByTagName('li')[index]
        bookLi.dataset.title = book.title;
        bookLi.dataset.author = book.author.name;
        bookLi.dataset.info = book.info;
        bookLi.dataset.price = book.price;
        bookLi.innerHTML = `<img>`;
        bookLi.getElementsByTagName('img')[0].src = book.cover.small;
      });
    } else {
      console.log(`Ответ ${request.status}: ${request.statusText}`);
    };
  };
};