export function setupAppLayout(): { container: HTMLElement } {
  const app = document.getElementById('app');
  if (!app) throw new Error('Root #app container not found');

  app.innerHTML = '';
  const mainWrapper = document.createElement('main');
  mainWrapper.className = 'container py-4';
  mainWrapper.style.maxWidth = '780px';

  const title = document.createElement('h3');
  title.className = 'text-center fw-bold mb-4';
  title.textContent = 'Система Управління Бібліотекою';

  const content = document.createElement('div');
  content.id = 'app-content';

  mainWrapper.appendChild(title);
  mainWrapper.appendChild(content);
  app.appendChild(mainWrapper);

  return { container: content };
}