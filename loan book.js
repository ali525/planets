// L1



const encodeParameters = function(params) {
    var strArray = [];
    Object.keys(params).forEach(function(key) {
        var paramString = encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        strArray.push(paramString);
    });
    return strArray.join("&");
};

let addButton = document.getElementById("submitbutton");
addButton.addEventListener("click", function (){
  var userID = document.getElementById("userid").value;
  var bookID = document.getElementById("bookid").value;
  let xhttp = new XMLHttpRequest();
  xhttp.open('GET', "http://127.0.0.1:3000/books/" + bookID + "/loans", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onload = function (event) {
  var bookSearch = JSON.parse(this.response);
  if (bookSearch.length>0){
    alert("Book already borrowed")
  }
  else {
    let loanDate = document.querySelector('input[type=date]').value;
    var parameters = {
      "dueDate": loanDate
    }
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', "http://127.0.0.1:3000/users/" + userID + "/loans/" + bookID, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(encodeParameters(parameters));
  alert('Successful Loan')
  }
}
  xhttp.send();
});
