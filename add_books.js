const addNewBook = document.querySelector(".addNewBook");
addNewBook.addEventListener("click", addBookToLibrary);

function addBookToLibrary() {
    const divElement = document.createElement("div");
    divElement.classList.add("addBook");
    document.body.appendChild(divElement);

    const formElement = document.createElement("form");
    divElement.appendChild(formElement);

    const title = document.createElement("p");
    const author = document.createElement("p");

    title.innerText = "Title";
    const titleInput = document.createElement("input")
    formElement.appendChild(title);
    title.appendChild(titleInput);

    author.innerText = "Author";
    const authorInput = document.createElement("input")
    formElement.appendChild(author);
    author.appendChild(authorInput);

    const addNewBookBtn = document.createElement("button");
    addNewBookBtn.innerText = "Lägg till boken ";
    formElement.appendChild(addNewBookBtn);

    addNewBookBtn.addEventListener("click", (e) => {
        e.preventDefault(addNewBookBtn);
        let book = {
            title: titleInput.value,
            author: authorInput.value
        }
        console.log(book);

        fetch("http://localhost:3000/library", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",        
            },
            body: JSON.stringify(book)        
        })
        .then(res => res.json ())
        .then(data => {
            addBookToLibrary(data);
        });
    })
}