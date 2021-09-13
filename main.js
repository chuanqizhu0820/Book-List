const books = document.querySelector("#book-list");
let booklist = [];
let bookHtml = "";
if (JSON.parse(localStorage.getItem('books')) == null) {

    const bookObj = { allbook: booklist };
    localStorage.setItem('books', JSON.stringify(bookObj));
} else {
    booklist = JSON.parse(localStorage.getItem('books')).allbook;

    booklist.forEach((item, index) => {
        bookHtml += `
    <p>${item.title}</p>
    <p>${item.author}</p>
    <button type="button" class="remove-btn" id="${index}">Remove</button>
    <hr>`;
    })
    books.innerHTML = bookHtml;
}

const bookForm = document.querySelector("#book-form");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");

bookForm.addEventListener('submit', () => {
    let newBook = {
        title: bookTitle.value,
        author: bookAuthor.value
    };

    let obj = JSON.parse(localStorage.getItem('books'));

    obj.allbook.push(newBook);

    booklist = obj.allbook;

    localStorage.setItem("books", JSON.stringify(obj));
})

const removeBtn = document.querySelectorAll(".remove-btn");

removeBtn.forEach((item) => item.addEventListener('click', () => {
    let idx = parseInt(item.id);
    console.log(idx);
    let obj = JSON.parse(localStorage.getItem('books'));
    booklist = obj.allbook;
    booklist = booklist.filter((ele, ind) => ind !== idx);
    obj.allbook = booklist;
    localStorage.setItem("books", JSON.stringify(obj));
    location.reload()
}));





