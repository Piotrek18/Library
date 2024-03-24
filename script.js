const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary(){
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

//const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);

//console.log(theHobbit.info());

const addBookButton = document.getElementById("addBookButton");
const newBookDialog = document.getElementById("newBookDialog");
const cancelButton = document.getElementById("cancelButton");


addBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

cancelButton.addEventListener("click", () => {
    newBookDialog.close();
});