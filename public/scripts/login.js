const nameInput = document.getElementById('name');
const errorMessage = document.getElementById('error-message');
let loginUrl = 'http://localhost:3000/api';

function loginUser() {
    if (nameInput.value !== ''){
        loginUrl += `/login?username=${nameInput.value}`;
        
        fetch(loginUrl)
        .then(response => response.json())
        .then(data => {
            console.log("data:", data);
            if (data.result){
                errorMessage.innerHTML = '';
                window.location.replace('index.html');
            }
        }); 
    }
    else {
        errorMessage.innerHTML = 'El campo nombre está vacío!';
    }   
}