import { Book } from '../models/Book';

export function createBookList(
  books: Book[],
  currentPage: number,
  totalPages: number,
  onBorrow: (bookId: string) => void,
  onReturn: (bookId: string) => void,
  onDelete: (bookId: string) => void,
  onSearch: (query: string) => void,
  onPageChange: (page: number) => void,
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';

  card.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title fw-bold m-0">Список Книг</h5>
        <div class="w-50">
          <input type="text" class="form-control form-control-sm book-search" placeholder="Пошук за назвою або автором...">
        </div>
      </div>
      <div class="list-group list-group-flush book-items-container"></div>
      <div class="d-flex justify-content-between align-items-center mt-3 pagination-controls"></div>
    </div>
  `;

  const searchInput = card.querySelector('.book-search') as HTMLInputElement;
  searchInput.addEventListener('input', () => onSearch(searchInput.value));

  const container = card.querySelector('.book-items-container') as HTMLElement;
  if (books.length === 0) {
    container.innerHTML = '<div class="py-3 text-muted">Книг не знайдено</div>';
  } else {
    books.forEach((book) => {
      const item = document.createElement('div');
      item.className =
        'list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-light';

      const info = document.createElement('span');
      info.textContent = `${book.title} by ${book.author} (${book.year})`;

      const actions = document.createElement('div');

      const actionBtn = document.createElement('button');
      if (book.isBorrowed) {
        actionBtn.className = 'btn btn-warning btn-sm me-2';
        actionBtn.textContent = 'Повернути';
        actionBtn.addEventListener('click', () => onReturn(book.id));
      } else {
        actionBtn.className = 'btn btn-primary btn-sm me-2';
        actionBtn.textContent = 'Позичити';
        actionBtn.addEventListener('click', () => onBorrow(book.id));
      }

      const delBtn = document.createElement('button');
      delBtn.className = 'btn btn-outline-danger btn-sm';
      delBtn.textContent = 'Видалити';
      delBtn.addEventListener('click', () => onDelete(book.id));

      actions.appendChild(actionBtn);
      actions.appendChild(delBtn);

      item.appendChild(info);
      item.appendChild(actions);
      container.appendChild(item);
    });
  }

  const pagination = card.querySelector('.pagination-controls') as HTMLElement;
  pagination.innerHTML = `
    <span class="small text-muted">Сторінка ${currentPage} з ${totalPages}</span>
    <div>
      <button class="btn btn-outline-secondary btn-sm me-1 prev-btn" ${
        currentPage <= 1 ? 'disabled' : ''
      }>Назад</button>
      <button class="btn btn-outline-secondary btn-sm next-btn" ${
        currentPage >= totalPages ? 'disabled' : ''
      }>Вперед</button>
    </div>
  `;

  pagination.querySelector('.prev-btn')?.addEventListener('click', () => onPageChange(currentPage - 1));
  pagination.querySelector('.next-btn')?.addEventListener('click', () => onPageChange(currentPage + 1));

  return card;
}