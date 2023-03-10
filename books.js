let bookTitle = document.querySelector("bookTitle");
let bookBorrowed = document.querySelector("bookBorrowed");
let showIfBorrowed = document.querySelector("showIfBorrowed");
let bookList = document.querySelector("bookList");

function updateBookList() {
    fetch("http://localhost:3000/library")
    .then(res => res.json())
    .then(data => {
        //console.log(data); 
        printBooks(data);
    });
}

updateBookList();

