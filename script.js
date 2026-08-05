// Mobile nav
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', false);
}));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const ans = item.querySelector('.faq-a');
  const setState = (open) => {
    item.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '0px';
  };
  setState(item.classList.contains('open'));
  btn.addEventListener('click', () => setState(!item.classList.contains('open')));
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('show'));
}

// Quote form — submits to Formspree via fetch, no page reload
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  const statusEl = document.getElementById('quoteFormStatus');
  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = quoteForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusEl.style.display = 'block';
    statusEl.textContent = '';
    try {
      const res = await fetch(quoteForm.action, {
        method: 'POST',
        body: new FormData(quoteForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        statusEl.textContent = 'Thanks — your quote request has been sent. We\'ll be in touch soon.';
        statusEl.style.color = 'var(--field)';
        quoteForm.reset();
      } else {
        statusEl.textContent = 'Something went wrong sending that. Please call or email us directly.';
        statusEl.style.color = 'var(--usa-red, #b22234)';
      }
    } catch (err) {
      statusEl.textContent = 'Something went wrong sending that. Please call or email us directly.';
      statusEl.style.color = 'var(--usa-red, #b22234)';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request a quote';
    }
  });
}

// Other forms (e.g. email signup) — still a demo until a backend is connected
document.querySelectorAll('form').forEach(f => {
  if (f.id === 'quoteForm') return;
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('This is a demo form — connect it to an email service or backend to go live.');
  });
});
