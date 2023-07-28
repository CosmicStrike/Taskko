document.addEventListener('DOMContentLoaded', (e) => {
    main();
})

function Initialization() {
    const desktop = window.matchMedia("(min-width: 1200px)");
    if (!desktop.matches) {
        let navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('hide');
    }
}

function OnClick(e) {
    const desktop = window.matchMedia("(min-width: 1200px)");

    // Navbar
    let menu = document.getElementById('menu');
    let navbar = document.getElementsByTagName('nav')[0];
    if (!navbar.contains(e.target) && !menu.contains(e.target) && !desktop.matches) {
        navbar.classList.add('hide');
        document.getElementsByClassName('close')[0].classList.add('hide');
        document.getElementsByClassName('open')[0].classList.remove('hide');
    }
}

function reset() {
    // reset navbar
    window.addEventListener('resize', (e) => {
        const desktop = window.matchMedia("(min-width: 1200px)");
        let navbar = document.getElementsByTagName('nav')[0];
        if (desktop.matches) {
            // Desktop Screen
            if (navbar.classList.contains('hide')) navbar.classList.toggle('hide');
        } else {
            navbar.classList.add('hide');
        }
    })

}

function main() {
    Initialization();
    reset();
    document.getElementsByTagName('body')[0].addEventListener('click', OnClick);
}