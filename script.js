class Book {
    constructor (
        title = '',
        author = '',
        pages = '0',
        hasRead = false
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }
}

class Library {
    constructor () {
        this.books = [];
    }

    addBookToLibrary (newBook) { 
        if (!this.inLibrary(newBook)) {
            this.books.push(newBook);
        }
    }

    removeBookFromLibrary (title) {
        this.books = this.books.filter((book) => book.title !== title);
    }

    getBookFromLibrary (title) {
        return this.books.find((book) => book.title === title);
    }

    inLibrary (newBook) { 
        return this.books.some((book) => book.title === newBook.title 
        && book.author === newBook.autho 
        && book.pages === newBook.pages);
    }
}

const library = new Library();
const addBookBtn = document.getElementById('addbook-btn');
const booksGrid = document.querySelector('.book-grid');
const addBookForm = document.getElementById('addBookForm');
const addBookModal = document.getElementById('addBookModal');
const overlay = document.getElementById('overlay');
const errorMsg = document.getElementById('error-msg');

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const hasRead = document.getElementById('hasRead').checked
    return new Book(title, author, pages, hasRead)
}

const closeAddBookModal = () => {
    addBookModal.classList.remove('active');
    errorMsg.classList.remove('active');
    overlay.classList.remove('active');
}

const addBook =  (e) => {
    e.preventDefault();
    const newBook = getBookFromInput();
    if (!library.inLibrary(newBook)) {
        library.addBookToLibrary(newBook);
        updateBooksGrid();
    }
    else {
        errorMsg.textContent = "Book is already in library";
        errorMsg.classList.add('active');
        return;
    }
    closeAddBookModal();
}

const closeAllModals = () => {
    closeAddBookModal();
}

const openAddBookModal = () => {
    // console.log("into open add book modal");
    addBookForm.reset();
    addBookModal.classList.add('active');
    overlay.classList.add('active');
}

const handleKeyboardInput = (e) => {
    if (e.key === 'Escape') closeAllModals()
}

addBookBtn.onclick = openAddBookModal;
addBookForm.onsubmit = addBook;
window.onkeydown = handleKeyboardInput;

const resetBooksGrid = () => {
    booksGrid.innerHTML = '';
}

const updateBooksGrid = () => {
    resetBooksGrid();
    for (let book of library.books) {
        createBookCard(book);
    }
}

const toggleRead = (e) => {
    const tmptitle = e.target.parentNode.parentNode.firstChild.textContent;
    const title = tmptitle.substring(7, tmptitle.length);
    const book = library.getBookFromLibrary(title);
    book.hasRead = !book.hasRead;
    updateBooksGrid();
}

const toggleRemoveBook = (e) => {
    const tmptitle = e.target.parentNode.parentNode.firstChild.textContent;
    const title = tmptitle.substring(7, tmptitle.length);
    library.removeBookFromLibrary(title);
    updateBooksGrid();
}

// create book card
const createBookCard = (book) => {

    // create needed Element
    const bookCard = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const buttonGroup = document.createElement('div');
    const hasReadBtn = document.createElement('button');
    const removeBookBtn = document.createElement('button');

    // set up parent/child
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    buttonGroup.appendChild(hasReadBtn);
    buttonGroup.appendChild(removeBookBtn);
    bookCard.appendChild(buttonGroup);
    booksGrid.appendChild(bookCard);

    // add needed classes
    bookCard.classList.add('book-card');
    buttonGroup.classList.add('button-group')
    hasReadBtn.classList.add('btn');
    removeBookBtn.classList.add('btn');

    // set button onclick function
    hasReadBtn.onclick = toggleRead;
    removeBookBtn.onclick = toggleRemoveBook;

    // set card content
    title.innerHTML= "<b>title: </b>" + `${book.title}`;
    author.innerHTML = "<b>author: </b>" + `${book.author}`;
    pages.innerHTML = "<b>number of pages: </b>" + `${book.pages}`;
    removeBookBtn.textContent = 'Remove';

    if (book.hasRead) {
        hasReadBtn.textContent = 'Read';
        hasReadBtn.classList.add('btn-green');
    }
    else
    {
        hasReadBtn.textContent = 'Not Read';
        hasReadBtn.classList.add('btn-red');        
    }

}