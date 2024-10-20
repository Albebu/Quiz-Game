document.addEventListener("DOMContentLoaded", () => {
    const firstH1 = document.querySelector('.landingPage-first-h1');
    const secondH1 = document.querySelector('.landingPage-second-h1');
    const input = document.querySelector('.landingPage-input');
    const thirdH1 = document.querySelector('.landingPage-third-h1');

    // Escuchar cuando la animación ha terminado
    firstH1.addEventListener('animationend', () => {
        firstH1.style.opacity = 1; // Restablecer opacidad a 0
    });
    secondH1.addEventListener('animationend', () => {
        secondH1.style.opacity = 1; // Restablecer opacidad a 0
    });
    thirdH1.addEventListener('animationend', () => {
        thirdH1.style.opacity = 1; // Restablecer opacidad a 0
    });
    input.addEventListener('animationend', () => {
        input.style.opacity = 1; // Restablecer opacidad a 0
    });
});


