document.getElementsByClassName('create-task-close')[0].addEventListener('click', (e) => {
    let form = document.getElementsByClassName('create-task')[0];
    form.reset();
    form.classList.toggle('hide');
    let addButton = document.getElementsByClassName('add-task')[0];
    addButton.classList.remove('hide')
})

function Reset() {
    let form = document.getElementsByClassName('create-task')[0];
    form.reset();
}

