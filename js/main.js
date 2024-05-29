var nameInput = document.getElementById('nameInput');
var signUpEmailInput = document.getElementById('signUpEmailInput');
var signUpPasswordInput = document.getElementById('signUpPasswordInput');
var loginEmailInput = document.getElementById('loginEmailInput');
var loginPasswordInput = document.getElementById('loginPasswordInput');
var SignUpButton = document.getElementById('SignUpButton');
var LoginButton = document.getElementById('LoginButton');
var alertElement = document.getElementById('alertElement');
var SignIn = document.getElementById('SignIn');
var SignUp = document.getElementById('SignUp');
var welcomeMessageElement = document.getElementById("welcomeMessage");
var logOutButton = document.getElementById("logOutButton");


var regex_isvalid = false;


var usersList = []

if (localStorage.getItem('users'))
    usersList = JSON.parse(localStorage.getItem("users"))


SignUpButton?.addEventListener('click', AddUser);

function AddUser() {
    var user = {
        name: nameInput.value,
        email: signUpEmailInput.value,
        password: signUpPasswordInput.value
    };

    if (!isEmpty() && !emailIsExist() && regex_isvalid) {
        usersList.push(user);
        localStorage.setItem('users', JSON.stringify(usersList));
    }
}


SignIn?.addEventListener('click', function () {
    nameInput.classList.add('d-none');
    SignUp.classList.remove('d-none');
    SignIn.classList.add('d-none');
    alertElement.classList.add('d-none');
    LoginButton.classList.remove('d-none');
    SignUpButton.classList.add('d-none');
    signUpEmailInput.classList.add('d-none');
    signUpPasswordInput.classList.add('d-none');
    loginEmailInput.classList.remove('d-none');
    loginPasswordInput.classList.remove('d-none');
})


SignUp?.addEventListener('click', function () {
    nameInput.classList.remove('d-none');
    SignUp.classList.add('d-none');
    SignIn.classList.remove('d-none');
    alertElement.classList.add('d-none');
    LoginButton.classList.add('d-none');
    SignUpButton.classList.remove('d-none');
    signUpEmailInput.classList.remove('d-none');
    signUpPasswordInput.classList.remove('d-none');
    loginEmailInput.classList.add('d-none');
    loginPasswordInput.classList.add('d-none');
})


nameInput?.addEventListener('change', function () {
    isvalid(this)
})

signUpEmailInput?.addEventListener('change', function () {
    isvalid(this)
})

signUpPasswordInput?.addEventListener('change', function () {
    isvalid(this)
})

function isvalid(element) {
    var regex = {
        nameInput: /^[A-Z][a-z]+(?:[-'\s][A-Za-z]+)*$/,
        signUpEmailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        signUpPasswordInput: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    };

    if (regex[element.id].test(element.value)) {
        if (element.id == "signUpEmailInput") {
            emailIsExist();
        } else {
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
            regex_isvalid = true;
        }


    }
    else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        regex_isvalid = false;
    }

}

SignUpButton?.addEventListener('click', isEmpty)

function isEmpty() {
    if (nameInput.value == "" || signUpEmailInput.value == "" || signUpPasswordInput.value == "") {
        alertElement.classList.remove('d-none');
        alertElement.classList.replace('text-success', 'text-danger')
        alertElement.innerHTML = "All inputs is required"
        return true;
    }
    else {
        if (regex_isvalid) {
            alertElement.classList.remove('d-none');
            alertElement.classList.replace('text-danger', 'text-success')
            alertElement.innerHTML = "Success"
            return false;
        }
    }
}

function emailIsExist() {
    if (usersList.find(i => i.email == signUpEmailInput.value)) {
        alertElement.classList.remove('d-none');
        signUpEmailInput.classList.remove('is-valid');
        signUpEmailInput.classList.remove('is-invalid');
        alertElement.classList.replace('text-success', 'text-danger')
        alertElement.innerHTML = "email already exists"
        return true;
    } else {
        alertElement.classList.add('d-none');
        signUpEmailInput.classList.add('is-valid');
        signUpEmailInput.classList.remove('is-invalid');
        return false;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    var message = sessionStorage.getItem('welcomeMessage');
    if (message && welcomeMessageElement) {
        welcomeMessageElement.innerText = message;
    }


    if (logOutButton) {
        logOutButton?.addEventListener('click', function () {
            sessionStorage.removeItem('welcomeMessage');
            window.location.href = 'index.html';
        });
    }
});



LoginButton?.addEventListener('click', userIsExist);

function userIsExist() {
    var userIndex = usersList.findIndex(i => i.email === loginEmailInput.value && i.password === loginPasswordInput.value);
    if (userIndex !== -1) {
        var message = `Welcome ${usersList[userIndex].name}`;
        sessionStorage.setItem('welcomeMessage', message);
        window.location.href = 'home.html';
    } else {
        if (loginEmailInput.value == "" || loginPasswordInput.value == "") {
            alertElement.classList.remove('d-none');
            alertElement.classList.replace('text-success', 'text-danger')
            alertElement.innerHTML = "All inputs is required"
        } else {
            alertElement.classList.remove('d-none');
            alertElement.classList.replace('text-success', 'text-danger')
            alertElement.innerHTML = "incorrect email or password"
        }
    }
}




