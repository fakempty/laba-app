export class Modal {
  public static alert(message: string, buttonText = 'Зрозуміло!'): void {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';

    const modal = document.createElement('div');
    modal.className = 'modal fade show d-block';
    modal.tabIndex = -1;

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-body text-dark py-4 px-4 fs-6">
            ${message}
          </div>
          <div class="modal-footer border-0 pt-0">
            <button type="button" class="btn btn-primary px-4 close-btn">${buttonText}</button>
          </div>
        </div>
      </div>
    `;

    const close = (): void => {
      if (document.body.contains(backdrop)) document.body.removeChild(backdrop);
      if (document.body.contains(modal)) document.body.removeChild(modal);
    };

    modal.querySelector('.close-btn')?.addEventListener('click', close);
    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
  }

  public static prompt(title: string, onConfirm: (val: string) => void): void {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';

    const modal = document.createElement('div');
    modal.className = 'modal fade show d-block';
    modal.tabIndex = -1;

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-header border-0 pb-0">
            <h6 class="modal-title fw-bold">${title}</h6>
            <button type="button" class="btn-close cancel-btn" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control modal-input" placeholder="ID">
            <div class="text-danger small mt-1 error-msg" style="display: none;">Поле має містити лише цифри</div>
          </div>
          <div class="modal-footer border-0 pt-0">
            <button type="button" class="btn btn-secondary cancel-btn">Скасувати</button>
            <button type="button" class="btn btn-primary confirm-btn">Зберегти</button>
          </div>
        </div>
      </div>
    `;

    const close = (): void => {
      if (document.body.contains(backdrop)) document.body.removeChild(backdrop);
      if (document.body.contains(modal)) document.body.removeChild(modal);
    };

    modal.querySelectorAll('.cancel-btn').forEach((b) => b.addEventListener('click', close));

    const input = modal.querySelector('.modal-input') as HTMLInputElement;
    const confirmBtn = modal.querySelector('.confirm-btn') as HTMLButtonElement;
    const errorMsg = modal.querySelector('.error-msg') as HTMLElement;

    confirmBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (!val || !/^\d+$/.test(val)) {
        errorMsg.style.display = 'block';
        return;
      }
      close();
      onConfirm(val);
    });

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
  }
}