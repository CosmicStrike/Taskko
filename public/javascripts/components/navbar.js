document.getElementsByTagName('nav')[0].addEventListener('click', (e) => {
    const link = e.target;
    if (link.classList.contains('nav-tab') && link.innerText !== 'Logout') {
        window.location.href = '/' + (link.innerText === 'Tasks' ? ' ' : link.innerText);
    }
})