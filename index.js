function addToCart(productId) {
    console.log(String(productId));
    var quantity = 1;
    var productCard = document.querySelector("[data-product-id=\"".concat(productId, "\"]"));
    console.log(productCard);
    var cartItem = {
        id: String(productId),
        image: productCard.querySelector('.card-img-top').src,
        title: productCard.querySelector('.card-title').innerText,
        price: productCard.querySelector('.card-text').innerText,
        quantity: quantity
    };
    console.log(cartItem);
    var cartItems = localStorage.getItem('cartItems');
    if (!cartItems) {
        cartItems = [];
    }
    else {
        cartItems = JSON.parse(cartItems);
        var existingItemIndex = cartItems.findIndex(function (item) { return item.id === String(productId); });
        if (existingItemIndex !== -1) {
            alert('Item already in the cart!');
            return;
        }
        else {
            cartItems.push(cartItem);
            alert('Item added to the cart!');
        }
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
function addToWishlist(productId) {
    console.log(String(productId));
    var quantity = 1;
    var productCard = document.querySelector("[data-product-id=\"".concat(productId, "\"]"));
    var wishItem = {
        id: String(productId),
        image: productCard.querySelector('.card-img-top').src,
        title: productCard.querySelector('.card-title').innerText,
        price: productCard.querySelector('.card-text').innerText,
        quantity: quantity
    };
    console.log(wishItem);
    var wishItems = localStorage.getItem('wishItems');
    if (!wishItems) {
        wishItems = [];
    }
    else {
        wishItems = JSON.parse(wishItems);
        var existingItemIndex = wishItems.findIndex(function (item) { return item.id === String(productId); });
        if (existingItemIndex !== -1) {
            alert('Item already in the Wishlist!');
            return;
        }
        else {
            wishItems.push(wishItem);
            alert('Item added to the wishlist!');
        }
    }
    localStorage.setItem('wishItems', JSON.stringify(wishItems));
}
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://fakestoreapi.com/products')
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(function (products) {
        var filterSelect = document.getElementById('filter-by');
        var sortSelect = document.getElementById('sort-by');
        var filterProducts = function (option) {
            switch (option) {
                case 'none':
                    return products;
                case 'rating>3':
                    return products.filter(function (product) { return product.rating.rate > 3; });
                case 'rating>4':
                    return products.filter(function (product) { return product.rating.rate > 4; });
                case 'count':
                    return products.filter(function (product) { return product.count > 0; });
                default:
                    return products;
            }
        };
        var sortProducts = function (option) {
            var productsCopy = JSON.parse(JSON.stringify(products));
            switch (option) {
                case 'none':
                    return productsCopy;
                case 'price-high':
                    return productsCopy.sort(function (a, b) { return b.price - a.price; });
                case 'price-low':
                    return productsCopy.sort(function (a, b) { return a.price - b.price; });
                case 'rating-high':
                    return productsCopy.sort(function (a, b) { return b.rating.rate - a.rating.rate; });
                case 'rating-low':
                    return productsCopy.sort(function (a, b) { return a.rating.rate - b.rating.rate; });
                default:
                    return productsCopy;
            }
        };
        var displayProducts = function (products) {
            document.getElementById('women-s-clothing-container').innerHTML = '';
            document.getElementById('men-s-clothing-container').innerHTML = '';
            document.getElementById('jewelery-container').innerHTML = '';
            document.getElementById('electronics-container').innerHTML = '';
            products.forEach(function (product) {
                var card = document.createElement('div');
                card.classList.add('col-md-4', 'product-card');
                card.innerHTML = "\n            <div class=\"card\" data-product-id=\"".concat(product.id, "\">\n              <a href=\"product-detail.html?id=").concat(product.id, "\" target=\"_blank\">\n                <img src=\"").concat(product.image, "\" class=\"card-img-top\" alt=\"").concat(product.title, "\">\n              </a>\n              <footer class=\"card-body\">\n                <h6 class=\"card-title\">").concat(product.title, "</h6>\n                <p class=\"card-text\">$").concat(product.price, "</p>\n                <button class=\"btn btn-success mt-3\" onclick=\"addToCart(").concat(product.id, ")\" >Add to Cart</button>\n                <button class=\"btn btn-success mt-3\" onclick=\"addToWishlist(").concat(product.id, ")\" >Wishlist</button>\n              </footer>\n            </div>\n          ");
                var categoryName = product.category.toLowerCase().replace(/[\s']/g, '-');
                var container = document.getElementById("".concat(categoryName, "-container"));
                if (container) {
                    container.appendChild(card);
                }
            });
        };
        filterSelect.addEventListener('change', function () {
            var selectedOption = this.value;
            var filteredProducts = filterProducts(selectedOption);
            displayProducts(filteredProducts);
        });
        sortSelect.addEventListener('change', function () {
            var selectedOption = this.value;
            var sortedProducts = sortProducts(selectedOption);
            displayProducts(sortedProducts);
        });
        displayProducts(products);
    })
        .catch(function (error) { return console.error('Error fetching data:', error); });
});
