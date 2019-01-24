// U3

let updateButton = document.getElementById("button1");
updateButton.addEventListener("click", function (){
  let search_term = document.getElementById("search").value;
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://127.0.0.1:3000/search?type=user&name=" + search_term);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onload = function (event) {

    var userSearch = JSON.parse(this.response);
    let xhttp2 = new XMLHttpRequest();
    let queryURL = 'http://127.0.0.1:3000/users/' + userSearch[0].id + '/loans';
    xhttp2.open("GET", queryURL);
    xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp2.onload = function (event) {
      var bookID = JSON.parse(this.response);
      let xhttp3 = new XMLHttpRequest ();
      for (let i = 0; i !== bookID["UserID"]; i++) {
            let query2URL = 'http://127.0.0.1:3000/loans/' + bookID[0].id;
      xhttp3.open("GET", query2URL);
      xhttp3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp3.onload = function (event) {
        let bookTitle = JSON.parse(this.response);
        let xhttp4 = new XMLHttpRequest ();
        let query3URL = 'http://127.0.0.1:3000/books/' + bookTitle['BookId'];
        xhttp4.open("GET", query3URL);
        xhttp4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp4.onload = function (event) {
        let bookResults = JSON.parse(this.response);
        let resultsContainer = document.getElementById("resultscontainer")
        resultsContainer.innerHTML = 'User ' + userSearch[0].name;
        let booksList = document.createElement('ul');
        resultsContainer.append(booksList);
        for (let i = 0; i !== userSearch["id"]; i ++) {
          let bookBullet = document.createElement('li');
          bookBullet.innerHTML = bookResults['title'][i].title;
          booksList.append(bookBullet);

        }
      }
