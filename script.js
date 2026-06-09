const tabs = [...document.querySelectorAll('.nav-tab')];
const panels = [...document.querySelectorAll('.tab-panel')];
const jumpers = [...document.querySelectorAll('[data-tab-jump]')];
const toast = document.getElementById('toast');

function showTab(id, updateHash = true) {
  tabs.forEach(tab => {
    const active = tab.dataset.tab === id;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  panels.forEach(panel => panel.classList.toggle('active', panel.id === id));
  if (updateHash) history.replaceState(null, '', `#${id}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach(tab => tab.addEventListener('click', () => showTab(tab.dataset.tab)));
jumpers.forEach(button => button.addEventListener('click', () => showTab(button.dataset.tabJump)));

const initial = location.hash.replace('#', '');
if (initial && panels.some(panel => panel.id === initial)) showTab(initial, false);

document.getElementById('trainerToggle').addEventListener('click', () => {
  document.body.classList.toggle('trainer-on');
});

document.getElementById('printBtn').addEventListener('click', () => window.print());

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max <= 0 ? 0 : (scrollY / max) * 100;
  document.documentElement.style.setProperty('--progress', `${pct}%`);
}, { passive: true });

const ideaSearch = document.getElementById('ideaSearch');
const ideaCards = [...document.querySelectorAll('.idea-card')];
if (ideaSearch) {
  ideaSearch.addEventListener('input', () => {
    const q = ideaSearch.value.trim().toLowerCase();
    ideaCards.forEach(card => {
      const haystack = `${card.innerText} ${card.dataset.tags}`.toLowerCase();
      card.classList.toggle('hidden', q && !haystack.includes(q));
    });
  });
}

function showToast(message = 'Copied') {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove('show'), 1600);
}

document.querySelectorAll('.copy').forEach(button => {
  button.addEventListener('click', async () => {
    const id = button.dataset.copy;
    const text = document.getElementById(id)?.innerText ?? '';
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied prompt');
    } catch {
      showToast('Copy failed');
    }
  });
});

window.addEventListener('keydown', (event) => {
  if (!event.altKey) return;
  const n = Number(event.key);
  if (n >= 1 && n <= tabs.length) showTab(tabs[n - 1].dataset.tab);
});
