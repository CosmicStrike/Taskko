function Index() {
    let login = document.getElementById('login').parentElement;

    document.getElementById('get-started').addEventListener('click', (e) => {
        login.showModal();
        let errs = login.getElementsByClassName('error-message');
        for (let j = 0; j < errs.length; j++) {
            errs[j].innerHTML = "";
        }
    });
}

if (document.readyState === 'complete')
    Index();
else
    document.addEventListener("DOMContentLoaded", (e) => {
        Index();
    })