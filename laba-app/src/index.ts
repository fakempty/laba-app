import 'bootstrap/dist/css/bootstrap.min.css';
import { Book } from './models/Book';
import { User } from './models/User';
import { Library } from './services/Library';
import { Storage } from './services/Storage';
import { setupAppLayout } from './components/render';
import { createBookForm } from './components/BookForm';
import { createUserForm } from './components/UserForm';
import { createBookList } from './components/BookList';
import { createUserList } from './components/UserList';
import { Modal } from './components/Modal';
import { IBook } from './interfaces/IBook';
import { IUser } from './interfaces/IUser';

const STORAGE_KEYS = {
  BOOKS: 'lib_books',
  USERS: 'lib_users',
};

const savedBooks = Storage.getItem<IBook[]>(STORAGE_KEYS.BOOKS) || [
  { id: '1', title: 'Code Complete', author: 'Steve McConnell', year: 2004, isBorrowed: false, borrowedByUserId: null },
  { id: '2', title: 'Clean Code: A Handbook of Agile Software Craftsmanship', author: 'Роберт Мартін', year: 2008, isBorrowed: false, borrowedByUserId: null },
  { id: '3', title: 'The Pragmatic Programmer: Your Journey to Mastery', author: 'Ендрю Хансон, Девід Томас', year: 1999, isBorrowed: false, borrowedByUserId: null },
];

const savedUsers = Storage.getItem<IUser[]>(STORAGE_KEYS.USERS) || [
  { id: '1725533394038', name: 'Артем', email: 'artemkarachevtsev@gmail.com', borrowedBooksCount: 0 },
  { id: '1725533437798', name: 'Мартін', email: 'softwar@gmail.com', borrowedBooksCount: 0 },
];

const bookLibrary = new Library<Book>(
  savedBooks.map((b) => new Book(b.id, b.title, b.author, b.year, b.isBorrowed, b.borrowedByUserId)),
);
const userLibrary = new Library<User>(
  savedUsers.map((u) => new User(u.id, u.name, u.email, u.borrowedBooksCount)),
);

let currentBookPage = 1;
let currentUserPage = 1;
let bookSearchQuery = '';
const PAGE_SIZE = 5;

function persist(): void {
  Storage.setItem(STORAGE_KEYS.BOOKS, bookLibrary.getAll().map((b) => b.toJSON()));
  Storage.setItem(STORAGE_KEYS.USERS, userLibrary.getAll().map((u) => u.toJSON()));
}

const { container } = setupAppLayout();

function render(): void {
  container.innerHTML = '';

  container.appendChild(
    createBookForm((book) => {
      bookLibrary.add(book);
      persist();
      render();
    }),
  );

  container.appendChild(
    createUserForm((user) => {
      userLibrary.add(user);
      persist();
      render();
    }),
  );

  const filteredBooks = bookLibrary.search(
    (b) =>
      b.title.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(bookSearchQuery.toLowerCase()),
  );
  const paginatedBooks = bookLibrary.getPaginated(currentBookPage, PAGE_SIZE, filteredBooks);

  container.appendChild(
    createBookList(
      paginatedBooks.data,
      currentBookPage,
      paginatedBooks.totalPages,
      (bookId) => {
        Modal.prompt('Введіть ID користувача для позичення книги:', (userId) => {
          const user = userLibrary.findById(userId);
          if (!user) {
            Modal.alert('Користувача з таким ID не знайдено!');
            return;
          }
          if (user.borrowedBooksCount >= 3) {
            Modal.alert('Користувач не може позичити більше 3-х книг одночасно!');
            return;
          }

          const book = bookLibrary.findById(bookId);
          if (book) {
            book.borrowBook(user.id);
            user.incrementBorrowed();
            persist();
            render();
            Modal.alert(
              `${book.title} (${book.year}) has been borrowed by ${user.id} ${user.name} (${user.email}).`,
            );
          }
        });
      },
      (bookId) => {
        const book = bookLibrary.findById(bookId);
        if (book && book.isBorrowed && book.borrowedByUserId) {
          const user = userLibrary.findById(book.borrowedByUserId);
          if (user) user.decrementBorrowed();
          book.returnBook();
          persist();
          render();
          Modal.alert(`${book.title} (${book.year}) has been returned.`, 'Закрити');
        }
      },
      (bookId) => {
        const book = bookLibrary.findById(bookId);
        if (book?.isBorrowed && book.borrowedByUserId) {
          const user = userLibrary.findById(book.borrowedByUserId);
          if (user) user.decrementBorrowed();
        }
        bookLibrary.remove(bookId);
        persist();
        render();
      },
      (query) => {
        bookSearchQuery = query;
        currentBookPage = 1;
        render();
      },
      (page) => {
        currentBookPage = page;
        render();
      },
    ),
  );

  const paginatedUsers = userLibrary.getPaginated(currentUserPage, PAGE_SIZE);
  container.appendChild(
    createUserList(
      paginatedUsers.data,
      currentUserPage,
      paginatedUsers.totalPages,
      (userId) => {
        const hasBorrowed = bookLibrary.getAll().some((b) => b.borrowedByUserId === userId);
        if (hasBorrowed) {
          Modal.alert('Неможливо видалити користувача, який має неповернені книги!');
          return;
        }
        userLibrary.remove(userId);
        persist();
        render();
      },
      (page) => {
        currentUserPage = page;
        render();
      },
    ),
  );
}

render();