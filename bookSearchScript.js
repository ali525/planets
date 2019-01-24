// B2

let authorSearchButton = document.getElementById("button1");
authorSearchButton.addEventListener("click", function (){
  let search_term = document.getElementById("search").value;
  let xhttp2 = new XMLHttpRequest();
  xhttp2.open("GET", "http://127.0.0.1:3000/search?type=author&name=" + search_term);

  xhttp2.onload = function (event) {

    var userSearch = JSON.parse(this.response);
    let xhttp = new XMLHttpRequest();
    let queryURL = 'http://127.0.0.1:3000/authors/' + userSearch[0].id + '?allEntities=true';
    xhttp.open("GET", queryURL);
    xhttp.onload = function (event) {
      let bookResults = JSON.parse(this.response);
      let resultsContainer = document.getElementById("resultscontainer")
      resultsContainer.innerHTML = 'Author name ' + userSearch[0].name;
      let booksList = document.createElement('ul');
      resultsContainer.append(booksList);
      for (let i = 0; i < bookResults['Books'].length; i ++) {
        let bookBullet = document.createElement('li');
        bookBullet.innerHTML = bookResults['Books'][i].title + '; its ID is ' + bookResults['Books'][i].id;
        booksList.append(bookBullet);
      }

    }
    xhttp.send();

  }
  xhttp2.send();
});


let titleSearchButton = document.getElementById("button2");
titleSearchButton.addEventListener("click", function (){
  let search_term = document.getElementById("search").value;
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://127.0.0.1:3000/search?type=book&title=" + search_term);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.onload = function (event) {
    var userSearch = JSON.parse(this.response);
    let bookID = userSearch[0].id;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:3000/books/" + bookID + "/authors");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onload = function (event) {
      let authorSearch = JSON.parse(this.response);
      let resultsContainer = document.getElementById("resultscontainer")
      resultsContainer.innerHTML = 'Title of the book: ' + userSearch[0].title + " its ISBN is " + userSearch[0].isbn + " and its ID is " + userSearch[0].id;
      let authorsList = document.createElement('ul');
      resultsContainer.append(authorsList);
      for (let i = 0; i < authorSearch.length; i ++) {
        let authorBullet = document.createElement('li');
        authorBullet.innerHTML = authorSearch[i].name;
        authorsList.append(authorBullet);
      }
      //document.getElementById("resultscontainer").innerHTML = authorSearch[0]["name"] + " is a the author of " + userSearch[0]["books"] + " and the ID is " + userSearch[0]["id"]
    }
    xhttp.send();

  }
    xhttp.send();

});
