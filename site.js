const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav-links');

function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}

menu.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
nav.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
    menu.focus();
  }
});

const interest = document.querySelector('#interest');
document.querySelectorAll('[data-interest]').forEach(link => {
  link.addEventListener('click', () => {
    interest.value = link.dataset.interest;
  });
});

const goal = document.querySelector('#goal');
const status = document.querySelector('#status');
goal.addEventListener('input', () => {
  goal.setCustomValidity('');
  status.textContent = '';
});
document.querySelector('#brief').addEventListener('submit', event => {
  event.preventDefault();
  if (!goal.value.trim()) {
    goal.setCustomValidity('Enter a business priority.');
    goal.reportValidity();
    return;
  }
  const content = [
    'P360 Strategic Advisors',
    'Consultation brief',
    '',
    'Area of interest: ' + interest.value,
    'Business priority: ' + goal.value.trim()
  ].join('\n');
  const downloadUrl = URL.createObjectURL(new Blob([content], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'P360-consultation-brief.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  status.textContent = 'Your brief is ready to download.';
});
