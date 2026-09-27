import { User } from '../models/User';

export function createUserList(
  users: User[],
  currentPage: number,
  totalPages: number,
  onDelete: (userId: string) => void,
  onPageChange: (page: number) => void,
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';

  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title fw-bold mb-3">Список Користувачів</h5>
      <div class="list-group list-group-flush user-items-container"></div>
      <div class="d-flex justify-content-between align-items-center mt-3 pagination-controls"></div>
    </div>
  `;

  const container = card.querySelector('.user-items-container') as HTMLElement;
  if (users.length === 0) {
    container.innerHTML = '<div class="py-3 text-muted">Користувачів немає</div>';
  } else {
    users.forEach((user) => {
      const item = document.createElement('div');
      item.className =
        'list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-light';

      const info = document.createElement('span');
      info.textContent = `${user.id} ${user.name} (${user.email}) [Взято книг: ${user.borrowedBooksCount}]`;

      const delBtn = document.createElement('button');
      delBtn.className = 'btn btn-outline-danger btn-sm';
      delBtn.textContent = 'Видалити';
      delBtn.addEventListener('click', () => onDelete(user.id));

      item.appendChild(info);
      item.appendChild(delBtn);
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