const socket = io.connect();

const title = document.getElementById('title');
const price = document.getElementById('price');
const thumbnail = document.getElementById('thumbnail');
const container = document.getElementById('container-table');
const containerFaker = document.getElementById('container-table-faker');
const userNameTitle = document.getElementById('user-name-title');

function clearForm() {
    title.value = '';
    price.value = '';
    thumbnail.value = '';
}

function addProduct(e) {
    fetch('http://localhost:3000/api/info')
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                if (title.value !== '' && price.value !== '' && thumbnail.value !== '') {
                    const product = {
                        title: title.value,
                        price: price.value,
                        thumbnail: thumbnail.value
                    };

                    socket.emit('add-new-product', product);
                    clearForm();
                    return false;
                }
            }
            else {
                window.location.replace('login.html');
            }
        });
}

function renderAllProducts() {
    fetch('http://localhost:3000/api/tableProd')
        .then(response => response.text())
        .then(data => {
            container.innerHTML = data;
        });
}

function renderAllProductsFaker() {
    fetch('http://localhost:3000/api/productos-test')
        .then(response => response.text())
        .then(data => {
            containerFaker.innerHTML = data;
        });
}

function renderNewProduct(data) {
    const html = `  <tr>
                        <th>${data.id}</th>
                        <td>${data.title}</td>
                        <td>${data.price}</td>
                        <td><img src="${data.thumbnail}" alt="imagen de producto" class="img-size"></td>
                    </tr>`;

    document.getElementById('tbody').innerHTML += html;
}

socket.on('render-new-product', function (data) {
    renderNewProduct(data);
});

function redirectToLogin() {
    window.location.replace('logout.html');
}

function renderInfoIfLoggedIn() {
    fetch('http://localhost:3000/api/info')
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                console.log(data.username);
                userNameTitle.innerHTML += ` ${data.username}`
                socket.emit('user-logged-in', true);
                renderAllProducts();
                renderAllProductsFaker();
            }
            else {
                window.location.replace('login.html');
            }
        })
}

renderInfoIfLoggedIn();