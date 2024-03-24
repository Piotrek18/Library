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

    addBookToTable(newBook);

    newBookDialog.close();
}

function addBookToTable(book) {

    if (!book.title && !book.author && !book.pages && !book.read){
        return;
    }

    const bookBody = document.getElementById("bookBody");

    const newRow = document.createElement("tr");
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
    readCell.textContent = book.read? 'Yes' : 'No';
    newRow.appendChild(readCell);

    bookBody.appendChild(newRow);
}




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

const sampleBook = {
    title: "Sample Title",
    author: "Sample Author",
    pages: 200,
    read: true
}

addBookToTable(sampleBook);