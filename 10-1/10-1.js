const btn = document.querySelector('.btn');
const svg1 = document.querySelector('.svg1');
const svg2 = document.querySelector('.svg2');

btn.addEventListener('click', () => {
    svg1.classList.toggle('hide');
    svg2.classList.toggle('active');

});