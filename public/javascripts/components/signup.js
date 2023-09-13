document.addEventListener('DOMContentLoaded', (e) => {
    SignUp();
})

async function HandleSignUp(e) {
    e.preventDefault();
    // Pre-Process
    document.getElementsByClassName('signup-password')[0].style.border = '1px solid #C200FF';
    let errs = document.getElementById('signup').getElementsByClassName('error-message');
    for (let j = 0; j < errs.length; j++) {
        errs[j].innerHTML = "";
    }

    // Get the form fields 
    const form = new FormData(document.getElementById('signup'));
    const formdata = Object.fromEntries(form.entries())
    document.getElementById('signup').disabled = true;
    const regexUsername = /[\w@#_-]{4,}/;
    const regexPassword = /[\w@#$=&%`~;,/\-\*]{6,}/;
    const regexEmail = /\b[A-Za-z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z.]+\b/;

    // Verify Username Pattern
    if (!regexUsername.test(formdata.username)) {
        document.getElementsByClassName('error-signup')[0].innerText = "Username must be atleast 4 character long";
        document.getElementById('signup').disabled = false;
        return;
    }
    else if (!regexEmail.test(formdata.email)) {
        document.getElementsByClassName('error-signup')[1].innerText = "Invalid Email Address";
        document.getElementById('signup').disabled = false;
        return;
    }
    else if (!regexPassword.test(formdata.password)) {
        document.getElementsByClassName('error-signup')[2].innerText = "Password must be atleast 6 character long";
        document.getElementById('signup').disabled = false;
        return;
    }
    else if (!regexPassword.test(formdata['confirm-password'])) {
        document.getElementsByClassName('error-signup')[3].innerText = "Password must be atleast 6 character long";
        document.getElementById('signup').disabled = false;
        return;
    }
    else if (formdata.password !== formdata['confirm-password']) {
        document.getElementsByClassName('signup-password')[0].style.border = '1px solid red';
        document.getElementsByClassName('error-signup')[3].innerText = "Re-Enter Password does not match";
        return;
    }

    // Perform SignUp
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ uname: formdata.username, passwd: formdata.password, email: formdata.email })
    }).then(resp => resp.json());
    document.getElementsByClassName('error-signup')[3].innerText = response.message;
    document.getElementById('signup').disabled = false;
}


function SignUp() {
    document.getElementById('signup-submit').addEventListener('click', HandleSignUp);
}