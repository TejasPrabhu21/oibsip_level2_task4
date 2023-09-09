
// Function for showing toast
function showToast(message) {
    var toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("active");
    setTimeout(function () { toast.classList.remove('active'); }, 3000);
}

// Fuction for encrypting data
function encryptData(data, key) {
    const encrypted = CryptoJS.AES.encrypt(data, key);
    return encrypted.toString();
}
// Function for decrypting data
function decryptData(data, key) {
    const decrypted = CryptoJS.AES.decrypt(data, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}


// SignUp function
function signUp(e) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cPassword = document.getElementById('confirmPassword').value;

    const cypher = encryptData(password, 'NeW');

    if (!(localStorage.getItem(username))) {
        if (password === cPassword) {
            const user = {
                name: name,
                username: username,
                email: email,
                password: cypher,
            }
            try {
                const json = JSON.stringify(user);
                localStorage.setItem(username, json);
                console.log("user Added");
                showToast("Successful");
            } catch {
                showToast("Unsuccessful");
            }
        } else {
            showToast("Password mismatched..");
        }
    } else {
        showToast("User already exists");
    }
}


// Login function
function login(e) {
    event.preventDefault();

    const usernameL = document.getElementById('usernameL').value;
    const passwordL = document.getElementById('passwordL').value;

    const userL = localStorage.getItem(usernameL);
    const data = JSON.parse(userL);

    if (userL == null) {
        showToast("Invalid user");
    } else {
        const decryptPass = decryptData(data.password, 'NeW');
        if (usernameL == data.username && passwordL == decryptPass) {
            showToast("Login success");
            window.location.href = "securedPage.html";
        } else {
            showToast("Wrong password");
        }
    }
}


