// create book class as a template of book object
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

// create BookList class as a template of booklist
class BookList {
    constructor() {
        this.books = [];
    }
    set(arr) {
        this.books = arr;
    }
    add(book) {
        this.books.push(book);
    }
    remove(index) {
        this.books = this.books.filter((ele, ind) => ind !== index);
    }
}

// retrieve data from local storage and generate html for book list
let bookHtml = "";

let arr = JSON.parse(localStorage.getItem('books')).books;

arr.forEach((item, index) => {
    bookHtml += `
    <tr>
    <th scope="row">${index + 1}</th>
    <td>${item.title}</td>
    <td>${item.author}</td>
    <td><button type="button" class="remove-btn" id="${index}">Remove</button></td>
    </tr>`;
})
const books = document.querySelector("#book-list");

books.innerHTML = bookHtml;


// create an instance of BookList, retrieve data in localstorage and store them in this instance
let booklist = new BookList();
if (JSON.parse(localStorage.getItem('books')) == null) {
    localStorage.setItem("books", JSON.stringify(booklist));
} else {
    booklist.set(JSON.parse(localStorage.getItem('books')).books);
}


const formbtn = document.querySelector("#book-form button");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");

// create a new book object and add it to the booklist after submitting the form
formbtn.addEventListener('click', () => {
    let newbook = new Book(bookTitle.value, bookAuthor.value);
    booklist.add(newbook);
    localStorage.setItem("books", JSON.stringify(booklist));
    location.reload();
})

const removeBtn = document.querySelectorAll(".remove-btn");

// delete the book object in the booklist by referring to the book id
removeBtn.forEach((item) => item.addEventListener('click', () => {
    let idx = parseInt(item.id);
    console.log(idx);
    booklist.remove(idx);
    localStorage.setItem("books", JSON.stringify(booklist));
    location.reload();
}));