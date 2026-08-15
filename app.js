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
const scheduleDays = document.querySelectorAll('.schedule-day');

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

    scheduleDays.forEach((day) => {
      day.hidden = ![...day.querySelectorAll('[data-audience]')].some((session) => !session.hidden);
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

const enquiryForm = document.querySelector('[data-enquiry-form]');
const formStatus = document.querySelector('[data-form-status]');

enquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(enquiryForm);
  const name = String(data.get('name') || '').trim();
  const contact = String(data.get('contact') || '').trim();
  const interest = String(data.get('interest') || 'Not sure');
  const note = String(data.get('message') || '').trim();
  const message = [
    `Hi OSA, I’d like to enquire about a first class.`,
    `Name: ${name}`,
    `Contact: ${contact}`,
    `Interested in: ${interest}`,
    note ? `Message: ${note}` : '',
  ].filter(Boolean).join('\n');

  formStatus.textContent = 'Opening WhatsApp with your enquiry. You can check it before sending.';
  formStatus.classList.add('success');
  window.location.href = `https://wa.me/447753249450?text=${encodeURIComponent(message)}`;
});
