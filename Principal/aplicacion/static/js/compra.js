// Función para incrementar la cantidad
function increaseQuantity(button) {
    let input = button.parentElement.querySelector('.quantity-input');
    let currentValue = parseInt(input.value);
    input.value = currentValue + 1;
}

// Función para decrementar la cantidad
function decreaseQuantity(button) {
    let input = button.parentElement.querySelector('.quantity-input');
    let currentValue = parseInt(input.value);
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
}

// Función para agregar al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        let productCard = this.closest('.product-card');
        let productName = productCard.getAttribute('data-name');
        let productPrice = parseFloat(productCard.getAttribute('data-price'));
        let quantity = parseInt(productCard.querySelector('.quantity-input').value);

        addToCart(productName, productPrice, quantity);
    });
});

let cart = [];

function addToCart(name, price, quantity) {
    let existingProduct = cart.find(product => product.name === name);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    updateCartSummary();
}

function updateCartSummary() {
    let cartItemsList = document.getElementById('cart-items');
    let cartSubtotalElement = document.getElementById('cart-subtotal');
    let cartIvaElement = document.getElementById('cart-iva');
    let cartTotalElement = document.getElementById('cart-total');

    cartItemsList.innerHTML = '';
    let subtotal = 0;

    cart.forEach(product => {
        let itemTotal = product.price * product.quantity;
        subtotal += itemTotal;

        let li = document.createElement('li');
        li.innerHTML = `${product.name} x${product.quantity} - $${itemTotal.toFixed(2)} <button class="remove-btn" onclick="removeFromCart('${product.name}')">Eliminar</button>`;
        cartItemsList.appendChild(li);
    });

    let iva = subtotal * 0.15;
    let total = subtotal + iva;

    cartSubtotalElement.innerHTML = subtotal.toFixed(2);
    cartIvaElement.innerHTML = iva.toFixed(2);
    cartTotalElement.innerHTML = total.toFixed(2);

    if (cart.length > 0) {
        document.getElementById('payment-section').classList.remove('hidden');
    } else {
        document.getElementById('payment-section').classList.add('hidden');
    }
}

function removeFromCart(name) {
    cart = cart.filter(product => product.name !== name);
    updateCartSummary();
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartSummary();
});
