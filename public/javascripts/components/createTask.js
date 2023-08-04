document.getElementsByClassName('create-task-close')[0].addEventListener('click', (e) => {
    let form = document.getElementsByClassName('create-task')[0];
    form.reset();
    document.getElementById('create-task-dialog').close();
})

function Reset() {
    let form = document.getElementsByClassName('create-task')[0];
    form.reset();
}

