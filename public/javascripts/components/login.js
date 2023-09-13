function Login() {
    let loginForm = document.getElementById('login');
    let login = loginForm.parentElement;
    let signup = document.getElementById('signup').parentElement;
    let forgotPassword = document.getElementById('forgotPassword').parentElement;

    document.getElementById('signup-button').addEventListener('click', (e) => {
        loginForm.reset();
        login.close();
        signup.showModal();
        let errs = signup.getElementsByClassName('error-message');
        for (let j = 0; j < errs.length; j++) {
            errs[j].innerHTML = "";
        }
    })

    document.getElementById('forgotPassword-button').addEventListener('click', (e) => {
        loginForm.reset();
        login.close();
        forgotPassword.showModal();
        let errs = forgotPassword.getElementsByClassName('error-message');
        for (let j = 0; j < errs.length; j++) {
            errs[j].innerHTML = "";
        }
    })

    document.getElementById('closeLogin').addEventListener('click', (e) => {
        loginForm.reset();
        login.close();
    })

    let back = document.getElementsByClassName('back');
    for (let i = 0; i < back.length; i++) {
        back[i].addEventListener('click', (e) => {
            let parent = back[i].parentElement;
            parent.reset();
            parent.parentElement.close();
            login.showModal();
        })
    }
}

if (document.readyState === 'complete')
    Login();
else
    document.addEventListener("DOMContentLoaded", (e) => {
        Login();
    })