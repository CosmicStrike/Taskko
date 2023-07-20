// navbar
document.getElementById('menu').addEventListener('click', (e) => {
    document.getElementsByClassName('open')[0].classList.toggle('hide');
    document.getElementsByClassName('close')[0].classList.toggle('hide');
    document.getElementsByClassName('navbar')[0].classList.toggle('hide');
})