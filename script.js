// ---- WhatsApp ----
const WA = '5493764653908';

// ---- Reveal on scroll (defined first so async-added cards can be observed) ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .12 });
const observeReveals = (root) => (root || document).querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---- Products (from productos.json → minorista) ----
fetch('productos.json', { cache: 'no-store' })
  .then(r => r.json())
  .then(data => {
    const products = (data && data.minorista) || [];
    document.getElementById('prod-grid').innerHTML = products.map(p => {
      const msg = encodeURIComponent(`Hola MIZU! Me interesa el ${p.name} de ${p.brand} (${p.price}) 🤍`);
      return `
      <article class="prod reveal" data-sku="${p.sku || ''}">
        <div class="prod-fig"><img src="img/productos/${p.img}" alt="${p.brand} ${p.name}" loading="lazy"><span class="agotado-badge">Sin stock</span></div>
        <span class="prod-cat">${p.cat} · ${p.brand}</span>
        <h3>${p.name}</h3>
        <p>${p.desc || '&nbsp;'}</p>
        <div class="prod-foot">
          <span class="prod-price">${p.price}</span>
          <a class="prod-add" href="https://wa.me/${WA}?text=${msg}" target="_blank" rel="noopener">Consultar</a>
        </div>
      </article>`;
    }).join('');
    observeReveals(document.getElementById('prod-grid'));
    aplicarStock();
  })
  .catch(() => {
    document.getElementById('prod-grid').innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--ink-soft)">No se pudieron cargar los productos.</p>';
  });

// ---- Disponibilidad de stock (lee del sistema de gestión) ----
function aplicarStock(){
  fetch('estado.php', { cache: 'no-store' })
    .then(r => r.json())
    .then(d => {
      if (!d || !d.ok || !d.stock) return;
      let hayAgotados = false;
      document.querySelectorAll('#prod-grid .prod[data-sku]').forEach(el => {
        const sku = el.getAttribute('data-sku');
        if (sku && sku in d.stock && d.stock[sku] === false) {
          el.classList.add('agotado');
          hayAgotados = true;
          const b = el.querySelector('.prod-add');
          if (b) {
            const name = el.querySelector('h3')?.textContent || 'producto';
            const msg = encodeURIComponent(`Hola MIZU! El ${name} está sin stock, ¿lo pueden conseguir a pedido? 🤍`);
            b.textContent = 'Encargar';
            b.setAttribute('href', `https://wa.me/${WA}?text=${msg}`);
            b.classList.add('encargar');
          }
        }
      });
      const nota = document.getElementById('apedido-note');
      if (nota && hayAgotados) nota.hidden = false;
    })
    .catch(() => {}); // si no hay conexión, la tienda se ve normal
}

// ---- Routine steps ----
const steps = [
  { n:'01', jp:'洗', t:'Limpieza',   d:'Espuma suave para retirar impurezas y empezar de cero.' },
  { n:'02', jp:'水', t:'Esencia',    d:'Primera capa de hidratación que despierta la piel.' },
  { n:'03', jp:'美', t:'Serum',      d:'Tratamiento concentrado según lo que tu piel necesita.' },
  { n:'04', jp:'潤', t:'Hidratación',d:'Crema que sella la humedad y suaviza.' },
  { n:'05', jp:'陽', t:'Protección', d:'SPF cada mañana. El paso que nunca se saltea.' }
];
document.getElementById('steps').innerHTML = steps.map(s => `
  <div class="step">
    <span class="step-n">${s.n}</span>
    <span class="jp">${s.jp}</span>
    <h3>${s.t}</h3>
    <p>${s.d}</p>
  </div>`).join('');

// ---- Nav scroll state ----
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive:true });

// ---- Mobile menu ----
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const setMenu = (open) => {
  nav.classList.toggle('menu-open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
};
navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('menu-open')));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// ---- Observe existing reveal sections ----
observeReveals(document);

// ---- Newsletter (demo) ----
const form = document.getElementById('sub-form');
const note = document.getElementById('form-note');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!ok) { note.textContent = 'Ingresá un email válido para sumarte.'; return; }
  note.textContent = '¡Gracias! Ya sos parte del ritual MIZU. 🤍';
  form.reset();
});
