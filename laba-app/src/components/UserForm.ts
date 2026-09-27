import { Validation } from '../utils/validators';
import { generateNumericId } from '../utils/idGenerator';
import { User } from '../models/User';

export function createUserForm(onSubmit: (user: User) => void): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';

  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title fw-bold mb-3">Додати Користувача</h5>
      <form id="user-form" novalidate>
        <div class="mb-3">
          <input type="text" class="form-control" id="user-name" placeholder="Ім'я">
          <div class="text-danger small mt-1 err-name" style="display: none;">Це поле є обов'язковим</div>
        </div>
        <div class="mb-3">
          <input type="email" class="form-control" id="user-email" placeholder="Email">
          <div class="text-danger small mt-1 err-email" style="display: none;">Введіть коректну електронну адресу</div>
        </div>
        <button type="submit" class="btn btn-success">Додати Користувача</button>
      </form>
    </div>
  `;

  const form = card.querySelector('#user-form') as HTMLFormElement;
  const nameInput = card.querySelector('#user-name') as HTMLInputElement;
  const emailInput = card.querySelector('#user-email') as HTMLInputElement;
  const errName = card.querySelector('.err-name') as HTMLElement;
  const errEmail = card.querySelector('.err-email') as HTMLElement;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (!Validation.isNotEmpty(nameInput.value)) {
      errName.style.display = 'block';
      isValid = false;
    } else {
      errName.style.display = 'none';
    }

    if (!Validation.isValidEmail(emailInput.value)) {
      errEmail.style.display = 'block';
      isValid = false;
    } else {
      errEmail.style.display = 'none';
    }

    if (!isValid) return;

    const newUser = new User(
      generateNumericId(),
      nameInput.value.trim(),
      emailInput.value.trim(),
    );

    onSubmit(newUser);
    form.reset();
  });

  return card;
}