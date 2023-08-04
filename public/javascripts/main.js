if (document.getElementsByClassName('add-task')[0])
    document.getElementsByClassName('add-task')[0].addEventListener('click', (e) => {
        document.getElementById('create-task-dialog').showModal();
    })