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

        button.addEventListener("click, bookInfo");
        borrowBook.addEventListener("click", changeToBorrowed);

        if (book.borrowed) {
            borrowBook.innerText = "Återlämna boken";
        }
        else {
            borrowBook.innerText = "Låna boken";
        }
    })
}

function changeToBorrowed(e) {
    let bookId = {bookId:e.currentTarget.id};
    console.log(bookId);

    fetch(`http://localhost:3000/library/borrowed`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",        
        },
        body: JSON.stringify(bookId)        
    })
    .then(data => {
        updateBookList(data);
    });
}

function checkIfBorrowed(book) {
    const pElement = document.createElement("p");
    bookList.appendChild(pElement);
    if (book.borrowed) {
        pElement.innerText = "Boken är utlånad"
    } else {
        pElement.innerText = "Boken finns tillgänglig"
    }
}

function bookInfo(e){
    let bookTitle = e.currentTarget.title;
    let bookAuthor = e.currentTarget.author;
    let bookId = e.currentTarget.id;
    let bookAvailable = e.currentTarget.borrowed;

    fetch(`http://localhost:3000/library/${bookId}`)
    .then(res => res.json())
    .then(data => {
    //console.log(data); 
    printBooks(data);
    });

    const container = document.querySelector('.bookInfo');
    container.innerHTML = `<h2>more information about chosen book</h2>
    <p class="info">Title: ${bookTitle}</p>
    <p class="info">Author: ${bookAuthor}</p>
    <p class="info">Available: ${bookAvailable}</p>`
    ;
    updateBookList();
}