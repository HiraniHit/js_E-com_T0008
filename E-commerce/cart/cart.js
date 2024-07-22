function cartProduct() {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    let cart = "";
    let totalPrice = 0;
    cartData.forEach((value) => {
        let itemTotal = value.price * (value.quantity || 1);
        totalPrice += itemTotal;
        cart += `
        <div data-id="${value.id}">
            <img src="${value.mainImage}"/>
            <div class="cart-title">
                <h3>${value.name}</h3>
                <p>${value.category}</p>
            </div>
            <p class="item-price">${itemTotal.toFixed(2)}</p>
            <div class="quantity">
                <button onclick="decreaseQuantity(${value.id})">-</button>
                <p class="quantity-number">${value.quantity || 1}</p>
                <button onclick="increaseQuantity(${value.id})">+</button>
            </div>
            <button class="delete-cart-btn" onclick="deleteItem(${value.id})"><span class="material-symbols-outlined">delete</span></button>
        </div>`;
    });
    cart += `<div class="total-price">Total Amount : $ ${ totalPrice.toFixed(2) } only</div>`;
    document.querySelector(".cart-product").innerHTML = cart;
}

function increaseQuantity(id) {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cartData.find(item => item.id === id);
    if (item) {
        item.quantity = (item.quantity || 1) + 1;
        updateCartDisplay(item);
        localStorage.setItem("cart", JSON.stringify(cartData));
        updateTotalPrice();
    }
}

function decreaseQuantity(id) {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cartData.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCartDisplay(item);
        localStorage.setItem("cart", JSON.stringify(cartData));
        updateTotalPrice();
    }
}

function updateCartDisplay(item) {
    let itemElement = document.querySelector(`.cart-product [data-id="${item.id}"]`);
    if (itemElement) {
        itemElement.querySelector('.quantity-number').textContent = item.quantity;
        let priceElement = itemElement.querySelector('.item-price');
        let basePrice = item.price;
        priceElement.textContent = (basePrice * item.quantity).toFixed(2);
    }
}

function deleteItem(id) {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData = cartData.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cartData));
    cartProduct();
}

function updateTotalPrice() {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = cartData.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    document.querySelector(".total-price").textContent = `Total Amount : $ ${totalPrice.toFixed(2)} only`;
}

cartProduct();