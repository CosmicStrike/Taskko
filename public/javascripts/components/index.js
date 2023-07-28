function Index() {
    let login = document.getElementById('login').parentElement;

    document.getElementById('get-started').addEventListener('click', (e) => {
        login.showModal();
    });
}
console.log(document.readyState)

if (document.readyState === 'complete')
    Index();
else
    document.addEventListener("DOMContentLoaded", (e) => {
        Index();
    })