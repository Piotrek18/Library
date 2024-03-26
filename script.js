const addBookButton = document.getElementById("addBookButton");
const newBookDialog = document.getElementById("newBookDialog");
const cancelButton = document.getElementById("cancelButton");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary(event) {
    event.preventDefault(); // Zapobiegamy domyślnemu zachowaniu formularza (czyli wysłaniu)
    
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const pages = document.getElementById("pagesInput").value;
    const read = document.getElementById("readCheckbox").checked;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    // Opcjonalnie, możemy wyczyścić pola formularza po dodaniu książki
    document.getElementById("titleInput").value = "";
    document.getElementById("authorInput").value = "";
    document.getElementById("pagesInput").value = "";
    document.getElementById("readCheckbox").checked = false;

    addBookToTable(newBook, myLibrary.length - 1);

    newBookDialog.close();
}

function addBookToTable(book, index) {

    if (!book.title && !book.author && !book.pages && !book.read){
        return;
    }

    const bookBody = document.getElementById("bookBody");

    const newRow = document.createElement("tr");

    newRow.dataset.index = index;

    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;
    newRow.appendChild(titleCell);

    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;
    newRow.appendChild(authorCell);

    const pagesCell = document.createElement("td");
    pagesCell.textContent = book.pages;
    newRow.appendChild(pagesCell);

    const readCell = document.createElement("td");
    const readCheckbox = document.createElement("input");
    readCheckbox.type = "checkbox";
    readCheckbox.checked = book.read;
    readCheckbox.addEventListener("change", () => {
        book.toggleReadStatus();
        displayLibrary();
    });
    readCell.appendChild(readCheckbox);
    newRow.appendChild(readCell);

    const removeButtonCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent =  "Remove";
    removeButton.addEventListener("click",  () => {
        removeBook(index);
    });

    removeButtonCell.appendChild(removeButton);
    newRow.appendChild(removeButtonCell);
    bookBody.appendChild(newRow);
}

function removeBook(index){
    myLibrary.splice(index, 1);

    displayLibrary();
}

function displayLibrary() {
    const bookBody = document.getElementById("bookBody");
    bookBody.innerHTML = "";
    myLibrary.forEach((book, index) => {
        addBookToTable(book, index);
    });
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

addBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

cancelButton.addEventListener("click", () => {

    document.getElementById("titleInput").value = "";
    document.getElementById("authorInput").value = "";
    document.getElementById("pagesInput").value = "";
    document.getElementById("readCheckbox").checked = false;
    newBookDialog.close();
});

document.getElementById("newBookForm").addEventListener("submit", addBookToLibrary);