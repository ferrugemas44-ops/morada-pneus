document.documentElement.classList.add('js');
const header = document.querySelector('.header');
const menuButton = document.querySelector('#menuButton');
const mobileMenu = document.querySelector('#mobileMenu');
const revealElements = document.querySelectorAll('.reveal');
const year = document.querySelector('#year');

function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute(
        'aria-label',
        isOpen ? 'Abrir menu' : 'Fechar menu'
    );

    mobileMenu.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
});

mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) {
        closeMenu();
    }
});

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach((element) => {
    observer.observe(element);
});

year.textContent = new Date().getFullYear();