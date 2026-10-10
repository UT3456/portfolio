const items = document.querySelectorAll('.reveal');
document.documentElement.classList.add('has-motion');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
} else { items.forEach((item) => item.classList.add('visible')); }
document.getElementById('year').textContent = new Date().getFullYear();

const progress = document.querySelector('.scroll-progress span');
const navLinks = [...document.querySelectorAll('nav [data-section]')];
const sections = [...document.querySelectorAll('main section[id]')];
let ticking = false;

const updatePageState = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;

  const marker = window.scrollY + window.innerHeight * 0.35;
  const active = [...sections].reverse().find((section) => section.offsetTop <= marker);
  navLinks.forEach((link) => {
    const selected = active && link.dataset.section === active.id;
    link.classList.toggle('active', Boolean(selected));
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  ticking = false;
};

window.addEventListener('scroll', () => {
  if (!ticking) { window.requestAnimationFrame(updatePageState); ticking = true; }
}, { passive: true });
window.addEventListener('resize', updatePageState);
updatePageState();
