const myLibrary = [];

const table = document.querySelector("table");
const shelfOne = document.querySelector("#shelfOne");
const shelfTwo = document.querySelector("#shelfTwo");
const shelfThree = document.querySelector("#shelfThree");
const newBooks = document.querySelector("#newBooks");
const submitButton = document.querySelector(".cancel");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookRead = document.querySelector("#read");
const form = document.querySelector("form");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (form.checkValidity()) {
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = bookPages.value;
    let read = bookRead.checked;
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    let newBook = document.createElement("div");
    newBook.classList.add("book");
    let random = Math.random();
    if (random < 0.33) {
      shelfOne.append(newBook);
    } else if (random > 0.66) {
      shelfThree.append(newBook);
    } else {
      shelfTwo.append(newBook);
    }
  } else {
    form.reportValidity();
  }
});

function removeShelf() {
  if (
    shelfOne.hasChildNodes() &&
    shelfTwo.hasChildNodes() &&
    shelfThree.hasChildNodes()
  ) {
    let random = Math.random();
    if (random <= 0.33) {
      shelfOne.removeChild(shelfOne.lastChild);
    } else if (random >= 0.66) {
      shelfThree.removeChild(shelfThree.lastChild);
    } else {
      shelfTwo.removeChild(shelfTwo.lastChild);
    }
  } else if (shelfOne.hasChildNodes() && shelfTwo.hasChildNodes()) {
    let random = Math.random();
    if (random <= 0.5) {
      shelfOne.removeChild(shelfOne.lastChild);
    } else {
      shelfTwo.removeChild(shelfTwo.lastChild);
    }
  } else if (shelfOne.hasChildNodes() && shelfThree.hasChildNodes()) {
    let random = Math.random();
    if (random <= 0.5) {
      shelfOne.removeChild(shelfOne.lastChild);
    } else {
      shelfThree.removeChild(shelfThree.lastChild);
    }
  } else if (shelfTwo.hasChildNodes() && shelfThree.hasChildNodes()) {
    let random = Math.random();
    if (random <= 0.5) {
      shelfTwo.removeChild(shelfTwo.lastChild);
    } else {
      shelfThree.removeChild(shelfThree.lastChild);
    }
  } else if (shelfOne.hasChildNodes()) {
    shelfOne.removeChild(shelfOne.lastChild);
  } else if (shelfTwo.hasChildNodes()) {
    shelfTwo.removeChild(shelfTwo.lastChild);
  } else {
    shelfThree.removeChild(shelfThree.lastChild);
  }
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
  newBooks.innerHTML = "";
  for (let book of myLibrary) {
    let newRow = document.createElement("tr");
    let index = myLibrary.indexOf(book);
    newRow.classList.add(`${index}`);
    newBooks.append(newRow);
    for (let property in book) {
      if (property !== "toggleRead" && property !== "read") {
        let newProp = document.createElement("td");
        newRow.append(newProp);
        newProp.textContent = `${book[property]}`;
      } else if (property !== "toggleRead" && book[property] === true) {
        let newProp = document.createElement("td");
        newRow.append(newProp);
        let newChecked = document.createElement("input");
        newChecked.type = "checkbox";
        newChecked.id = `${index}`;
        newChecked.checked = true;
        newChecked.addEventListener("click", () => {
          book.toggleRead();
          displayBooks();
        });
        newProp.append(newChecked);
      } else if (property !== "isRead" && book[property] === false) {
        let newProp = document.createElement("td");
        newRow.append(newProp);
        let newChecked = document.createElement("input");
        newChecked.type = "checkbox";
        newChecked.id = `${index}`;
        newChecked.checked = false;
        newChecked.addEventListener("click", () => {
          book.toggleRead();
          displayBooks();
        });
        newProp.append(newChecked);
      }
    }
    let newRemove = document.createElement("td");
    newRow.append(newRemove);
    let removeButton = document.createElement("button");
    newRemove.append(removeButton);
    removeButton.classList.add(`${index}`);
    removeButton.addEventListener("click", () => {
      let number = removeButton.classList.value;
      let realNumber = Number(number);
      for (book of myLibrary) {
        let index = myLibrary.indexOf(book);
        if (index === realNumber) {
          myLibrary.splice(index, 1);
          displayBooks();
        }
      }
      removeShelf();
    });
  }
}
