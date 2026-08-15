const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelectorAll('.site-nav a');

function closeMenu() {
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

const tickerTrack = document.querySelector('[data-ticker-track]');
const tickerGroup = tickerTrack?.querySelector('.ticker-group');

if (tickerTrack && tickerGroup) {
  const repeatedGroup = tickerGroup.cloneNode(true);
  repeatedGroup.setAttribute('aria-hidden', 'true');
  tickerTrack.append(repeatedGroup);
}

const filters = document.querySelectorAll('[data-filter]');
const sessions = document.querySelectorAll('[data-audience]');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;

    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    sessions.forEach((session) => {
      session.hidden = selected !== 'all' && session.dataset.audience !== selected;
    });
  });
});

sessions.forEach((session) => {
  session.addEventListener('click', () => {
    const interest = session.dataset.interest;
    const matchingChoice = document.querySelector(`input[name="interest"][value="${interest}"]`);
    if (matchingChoice) matchingChoice.checked = true;
  });
});

const demoForm = document.querySelector('[data-demo-form]');
const formStatus = document.querySelector('[data-form-status]');

demoForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(demoForm);
  const name = String(data.get('name') || '').trim().split(' ')[0];
  const interest = data.get('interest');

  formStatus.textContent = `Nice one${name ? `, ${name}` : ''} — in the live site this would send a ${interest} enquiry to OSA.`;
  formStatus.classList.add('success');
});
