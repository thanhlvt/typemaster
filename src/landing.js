const hint = document.getElementById('scroll-hint');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (hint) hint.classList.toggle('hidden', window.scrollY > 60);
    backToTop.classList.toggle('hidden', window.scrollY <= 200);
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
