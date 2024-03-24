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

    // Wywołujemy funkcję do wyświetlania książek
    displayBooks();
}

// Funkcja do wyświetlania książek
function displayBooks() {
    const booksContainer = document.getElementById("booksContainer");
    booksContainer.innerHTML = ""; // Czyszczenie zawartości kontenera

    myLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.textContent = `Title: ${book.title}, Author: ${book.author}, Pages: ${book.pages}, Read: ${book.read ? 'Yes' : 'No'}`;
        booksContainer.appendChild(bookDiv);
    });
}

const addBookButton = document.getElementById("addBookButton");
const newBookDialog = document.getElementById("newBookDialog");
const cancelButton = document.getElementById("cancelButton");


addBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

cancelButton.addEventListener("click", () => {
    newBookDialog.close();
});

// Obsługa zdarzenia submit formularza
document.getElementById("newBookForm").addEventListener("submit", addBookToLibrary);