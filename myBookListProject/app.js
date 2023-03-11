const form = document.querySelector('form');
const bookContainer = document.querySelector('tbody');

const books = JSON.parse(localStorage.getItem('saved')) || [];

class Book {
    constructor(title, author, ISBN){
        this.title = title;
        this.author = author;
        this.isbn = ISBN;
    }
    static delete(name) {
        books.splice(books.indexOf(name), 1); 
        localStorage.setItem('saved', JSON.stringify(books));
    }
    static add(name) {
        books.push(name);
        localStorage.setItem('saved', JSON.stringify(books));
    }
}

class UI {
    static display(){
        books.forEach(book => UI.addBookToList(book))
    }

    static addBookToList(book){
        const newRow = document.createElement('tr');
        const title = document.createElement('td');
        const author = document.createElement('td');
        const ISBN = document.createElement('td');
        const closeButton = document.createElement('button');
        
        title.innerText = book.title;
        author.innerText = book.author;
        ISBN.innerText = book.isbn;
        closeButton.innerHTML = '&#10006'
        closeButton.classList.add('closeButton')
        
        newRow.append(title, author, ISBN, closeButton);
        bookContainer.append(newRow);
        
        closeButton.addEventListener('click', (e) => {
            UI.deleteBook(e.target);
            Book.delete(book);
            UI.showAlert('Book Removed', 'success');            
        })
    }

    static deleteBook(e){
        e.parentElement.remove();
    }

    static showAlert(message, style){
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert');
        alertDiv.classList.add(style);
       
        alertDiv.appendChild(document.createTextNode(message));
        
        form.prepend(alertDiv);

        setTimeout(() => alertDiv.remove(), 2000);
    }
}

document.addEventListener('DOMContentLoaded',UI.display);

form.addEventListener('submit', (e) => {
    e.preventDefault();
if (form[0].value === '' || form[1].value === '' || form[2].value === '') {
    UI.showAlert('Fill all the details!!!', 'danger');
} else {
    const book = new Book(form[0].value, form[1].value, +form[2].value);

    UI.addBookToList(book);

    Book.add(book);

    UI.showAlert('Book Added', 'success')
    
    form[0].value = '';
    form[1].value = '';
    form[2].value = '';
}
})

