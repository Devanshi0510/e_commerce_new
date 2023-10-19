var quantity = 1;
function increaseQuantity() {
    quantity++;
    document.getElementById('quantity').value = quantity;
}
function decreaseQuantity() {
    if (quantity > 0) {
        quantity--;
        document.getElementById('quantity').value = quantity;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');
    // Fetch product details from the FakeStore API
    fetch("https://fakestoreapi.com/products/".concat(productId))
        .then(function (response) { return response.json(); })
        .then(function (product) {
        var productDetailContainer = document.getElementById('product-detail-container');
        productDetailContainer.innerHTML = "\n        <div class=\"product-image\">\n        <img id=\"product-image\" src=\"".concat(product.image, "\" class=\"img-fluid\">\n      </div>\n          <div class=\"product-info\">\n            <h2 id=\"product-title\">").concat(product.title, "</h2>\n            <p>Description: ").concat(product.description, "</p>\n            <p id=\"product-price\">$").concat(product.price, "</p>\n            <div class=\"quantity-control\">\n              <button class=\"btn btn-outline-primary quantity-btn\" onclick=\"decreaseQuantity()\">-</button>\n              <input type=\"text\" id=\"quantity\" value=\"").concat(quantity, "\" readonly>\n              <button class=\"btn btn-outline-primary quantity-btn\" onclick=\"increaseQuantity()\">+</button>\n            </div>\n            <button class=\"btn btn-success mt-3\" onclick=\"addToCart()\">Add to Cart</button>\n          </div>\n        ");
    })
        .catch(function (error) { return console.error('Error fetching product details:', error); });
});
function addToCart() {
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');
    var cartItem = {
        id: productId,
        image: document.getElementById('product-image').src,
        title: document.getElementById('product-title').innerText,
        price: document.getElementById('product-price').innerText,
        quantity: quantity
    };
    var cartItems = localStorage.getItem('cartItems');
    if (!cartItems) {
        cartItems = [];
    }
    else {
        cartItems = JSON.parse(cartItems);
        var existingItemIndex = cartItems.findIndex(function (item) { return item.id === productId; });
        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += quantity;
        }
        else {
            cartItems.push(cartItem);
        }
    }
    // Save the updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Item added to the cart!');
}
