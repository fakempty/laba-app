import { Validation } from '../utils/validators';
import { generateNumericId } from '../utils/idGenerator';
import { Book } from '../models/Book';

export function createBookForm(onSubmit: (book: Book) => void): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';

  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title fw-bold mb-3">Додати Книгу</h5>
      <form id="book-form" novalidate>
        <div class="mb-3">
          <input type="text" class="form-control" id="book-title" placeholder="Назва книги">
          <div class="text-danger small mt-1 err-title" style="display: none;">Це поле є обов'язковим</div>
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="book-author" placeholder="Автор">
          <div class="text-danger small mt-1 err-author" style="display: none;">Це поле є обов'язковим</div>
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="book-year" placeholder="Рік видання">
          <div class="text-danger small mt-1 err-year" style="display: none;">Введіть коректний рік (чотири цифри)</div>
        </div>
        <button type="submit" class="btn btn-success">Додати Книгу</button>
      </form>
    </div>
  `;

  const form = card.querySelector('#book-form') as HTMLFormElement;
  const titleInput = card.querySelector('#book-title') as HTMLInputElement;
  const authorInput = card.querySelector('#book-author') as HTMLInputElement;
  const yearInput = card.querySelector('#book-year') as HTMLInputElement;

  const errTitle = card.querySelector('.err-title') as HTMLElement;
  const errAuthor = card.querySelector('.err-author') as HTMLElement;
  const errYear = card.querySelector('.err-year') as HTMLElement;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (!Validation.isNotEmpty(titleInput.value)) {
      errTitle.style.display = 'block';
      isValid = false;
    } else {
      errTitle.style.display = 'none';
    }

    if (!Validation.isNotEmpty(authorInput.value)) {
      errAuthor.style.display = 'block';
      isValid = false;
    } else {
      errAuthor.style.display = 'none';
    }

    if (!Validation.isValidYear(yearInput.value)) {
      errYear.style.display = 'block';
      isValid = false;
    } else {
      errYear.style.display = 'none';
    }

    if (!isValid) return;

    const newBook = new Book(
      generateNumericId(),
      titleInput.value.trim(),
      authorInput.value.trim(),
      parseInt(yearInput.value.trim(), 10),
    );

    onSubmit(newBook);
    form.reset();
  });

  return card;
}