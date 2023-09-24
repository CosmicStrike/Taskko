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
        document.getElementsByClassName('sMessage')[0].innerText = "";

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

    document.getElementById('login').addEventListener('submit', HandleLogin);
}

async function HandleLogin(e) {
    try {
        e.preventDefault();
        const form = e.target;

        let errs = document.getElementById('login').getElementsByClassName('error-message');
        for (let j = 0; j < errs.length; j++) {
            errs[j].innerHTML = "";
        }

        // Get the Login Data
        const login = new FormData(form);
        const loginData = Object.fromEntries(login.entries());
        document.getElementById('login-submit').disabled = true;
        
        const regexUsername = /[\w@#_-]{4,}/;
        const regexPassword = /[\w@#$=&%`~;,/\-\*]{6,}/;

        if (!regexUsername.test(loginData.username)) {
            document.getElementsByClassName('error-login')[0].innerText = "Username must be atleast 4 character long";
            return;
        }
        else if (!regexPassword.test(loginData.password)) {
            document.getElementsByClassName('error-login')[1].innerText = "Password must be atleast 6 character long";
            return;
        }

        // Send the api request
        const response = await fetch('/api/auth/login', {
            method: 'PUT',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ uname: loginData.username, passwd: loginData.password })
        }).then((resp) => resp.json());

        if (response.success) window.location.href = '/';
        
        document.getElementById('login').getElementsByClassName('sMessage')[0].innerText = response.message;

    }
    catch (err) {
        console.log(err);
        document.getElementById('login').getElementsByClassName('sMessage')[0].innerText = 'Failed to process the request';

    }
    finally {
        document.getElementById('login-submit').disabled = false;
    }
}

if (document.readyState === 'complete')
    Login();
else
    document.addEventListener("DOMContentLoaded", (e) => {
        Login();
    })