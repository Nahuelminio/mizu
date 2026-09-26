// ---- Product data ----
const products = [
  { brand:'ANUA',     cat:'Limpieza',    name:'Rice Enzyme Cleansing Powder', desc:'Polvo limpiador enzimático con arroz. Ilumina y suaviza la textura.',        price:'$ 39.520', img:'imagen1_anua_rice_enzyme_brightening_cleansing_powder_imagen1-Photoroom.png' },
  { brand:'Biodance', cat:'Tónico',      name:'Cera-Nol Gel Toner Pads',  desc:'Discos de tónico en gel con ceramidas. Hidratan y calman (60 u.).',              price:'$ 43.680', img:'biodance-cera-nol-gel-Photoroom.png' },
  { brand:'SKIN1004', cat:'Tratamiento', name:'Centella Ampoule',         desc:'Ampolla intensiva con centella pura de Madagascar. Calma y repara.',             price:'$ 56.160', img:'madagascar-centella-Photoroom.png' },
  { brand:'ANUA',     cat:'Tratamiento', name:'Peach 70+ Niacin Serum',   desc:'Serum con 70% de durazno y niacinamida. Ilumina y unifica el tono.',             price:'$ 39.520', img:'157784-a-peach-70-niacin-serum-30ml-Photoroom.png' },
  { brand:'Celimax',  cat:'Tratamiento', name:'Retinal Shot Booster',     desc:'Booster con retinal que reafirma y suaviza líneas finas (15 ml).',               price:'$ 37.440', img:'images-Photoroom.png' },
  { brand:'Medicube', cat:'Tratamiento', name:'Deep Vita C Capsule Cream',desc:'Crema con vitamina C y niacinamida para una piel luminosa y uniforme.',          price:'$ 47.840', img:'medicube-deep-vita-c-capsule-cream-b9d7f7818f5b22cbcf17574471340736-1024-1024-Photoroom.png' },
  { brand:'Dr.Althea',cat:'Hidratación', name:'345 Relief Cream',         desc:'Crema calmante con niacinamida y centella para piel sensible.',                  price:'$ 45.760', img:'drALTHEA345REFIEF-Photoroom.png' },
  { brand:'Medicube', cat:'Hidratación', name:'Collagen Jelly Cream',     desc:'Crema-jelly con colágeno. Hidrata y aporta elasticidad (50 ml).',                price:'$ 30.160', img:'medicube-collagen-jelly-cream-24c8d6754e8bec386617575368873121-1024-1024-Photoroom.png' },
  { brand:'Medicube', cat:'Tratamiento', name:'PDRN Collagen Gua Sha',    desc:'Crema con PDRN y colágeno + gua sha para cuello y contorno.',                    price:'$ 66.560', img:'PDRN_00_8ff884c9-74a9-495e-917f-d03f776b38aa-Photoroom.png' },
  { brand:'Biodance', cat:'Mascarilla',  name:'Bio-Collagen Real Deep Mask',desc:'Mascarilla de bio-colágeno que se adhiere a la piel. Hidrata y reafirma (x4).',  price:'$ 35.360', img:'collagenmask4-Photoroom.png' },
  { brand:'SKIN1004', cat:'Kit',         name:'Centella Travel Kit',      desc:'Rutina completa en tamaño viaje: limpieza, tónico, ampolla y crema.',            price:'$ 61.360', img:'CENTELLATRAVELKIT-2-Photoroom.png' },
  { brand:'SKIN1004', cat:'Kit',         name:'Hyalu-Cica Travel Kit',    desc:'Kit de viaje hidratante con ácido hialurónico y centella.',                     price:'$ 60.320', img:'centella-kit-1-Photoroom.png' }
];
document.getElementById('prod-grid').innerHTML = products.map(p => `
  <article class="prod reveal">
    <div class="prod-fig"><img src="img/productos/${p.img}" alt="${p.brand} ${p.name}" loading="lazy"></div>
    <span class="prod-cat">${p.cat} · ${p.brand}</span>
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <div class="prod-foot">
      <span class="prod-price">${p.price}</span>
      <button class="prod-add" type="button">Consultar</button>
    </div>
  </article>`).join('');

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

// ---- Reveal on scroll ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

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
