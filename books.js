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

function printBooks(books) {
    bookList.innerHTML = "";

    books.map(book => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        const borrowBook = document.createElement("button");   
        borrowBook.id = book.id;
        borrowBook.borrowed = book.borrowed;
        button.innerText = "Mer info";
        button.id = book.id;
        button.title = book.title;
        button.author = book.author;
        button.available = book.borrowed;
        button.pages = book.pages
        li.id = book.id;
        li.innerText = book.title;
        bookList.appendChild(li);
        bookList.appendChild(button);
        bookList.appendChild(borrowBook);
        
        checkIfBookIsBorrowed(book);

        button.addEventListener("click, showBookInfo");
        borrowBook.addEventListener("click", changeToBorrowed);

        if (book.borrowed) {
            borrowBook.innerText = "Återlämna boken";
        }
        else {
            borrowBook.innerText = "Låna boken";
        }
    })
}

