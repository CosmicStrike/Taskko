document.getElementsByClassName('add-task')[0].addEventListener('click', (e) => {
    let addButton = document.getElementsByClassName('add-task')[0];
    addButton.classList.add('hide')
    document.getElementsByClassName('create-task')[0].classList.toggle('hide')
})