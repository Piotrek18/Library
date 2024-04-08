const addBookButton = document.getElementById("addBookButton");
const newBookDialog = document.getElementById("newBookDialog");
const cancelButton = document.getElementById("cancelButton");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    } 

    toggleReadStatus() {
        this.read = !this.read;
    }
}

class Library {
    constructor(){
        this.myLibrary = [];
    }

    addBookToLibrary(event) {
        event.preventDefault();     
        const title = document.getElementById("titleInput").value;
        const author = document.getElementById("authorInput").value;
        const pages = document.getElementById("pagesInput").value;
        const read = document.getElementById("readCheckbox").checked;

        const newBook = new Book(title, author, pages, read);
        this.myLibrary.push(newBook);

        document.getElementById("titleInput").value = "";
        document.getElementById("authorInput").value = "";
        document.getElementById("pagesInput").value = "";
        document.getElementById("readCheckbox").checked = false;

        this.addBookToTable(newBook, this.myLibrary.length - 1);

        newBookDialog.close();  
    }       

    addBookToTable(book, index) {

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
            this.displayLibrary();
        });
        readCell.appendChild(readCheckbox);
        newRow.appendChild(readCell);

        const removeButtonCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent =  "Remove";
        removeButton.addEventListener("click",  () => {
            this.removeBook(index);
        });

        removeButtonCell.appendChild(removeButton);
        newRow.appendChild(removeButtonCell);
        bookBody.appendChild(newRow);
    }

    removeBook(index){
        this.myLibrary.splice(index, 1);
        this.displayLibrary();
    }

    displayLibrary() {
        const bookBody = document.getElementById("bookBody");
        bookBody.innerHTML = "";
        this.myLibrary.forEach((book, index) => {
            this.addBookToTable(book, index);
        });
    }
}

const myLibraryInstance = new Library();

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

document.getElementById("newBookForm").addEventListener("submit", (event) => {
    myLibraryInstance.addBookToLibrary(event);
}); 