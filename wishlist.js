document.addEventListener('DOMContentLoaded', function () {
    var wishItems = localStorage.getItem('wishItems');
    if (!wishItems) {
        wishItems = [];
    }
    else {
        // localStorage.removeItem('cartItems');
        wishItems = JSON.parse(wishItems);
    }
    var cartItemsContainer = document.getElementById('wishlist-items-container');
    var totalCost = 0;
    var _loop_1 = function (i) {
        console.log(wishItems);
        var wishItem = wishItems[i];
        var itemRow = document.createElement('div');
        itemRow.className = 'row';
        var imageCol = document.createElement('div');
        imageCol.className = 'col';
        var productImage = document.createElement('img');
        productImage.src = wishItem.image;
        productImage.style.width = "220px";
        productImage.style.height = "220px";
        // productImage.alt = cartItem.title;
        imageCol.appendChild(productImage);
        var detailsCol = document.createElement('div');
        detailsCol.className = 'col';
        var productTitle = document.createElement('h3');
        productTitle.innerText = wishItem.title;
        var productPrice = document.createElement('p');
        productPrice.innerText = "Price: " + wishItem.price;
        productPrice.classList.add('item-price');
        var addToCartButton = document.createElement('button');
        addToCartButton.className = 'btn btn-outline-primary quantity-btn';
        addToCartButton.innerText = 'Add To Cart';
        addToCartButton.addEventListener('click', function () {
            addToCart(wishItem);
        });
        var removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger';
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', function () {
            removeCartItem(wishItem);
            itemRow.remove();
        });
        detailsCol.appendChild(productTitle);
        detailsCol.appendChild(productPrice);
        detailsCol.appendChild(addToCartButton);
        detailsCol.appendChild(removeButton);
        itemRow.appendChild(imageCol);
        itemRow.appendChild(detailsCol);
        cartItemsContainer.appendChild(itemRow);
    };
    for (var i = 0; i < wishItems.length; i++) {
        _loop_1(i);
    }
    function removeCartItem(item) {
        var index = wishItems.findIndex(function (i) { return i.id === item.id; });
        wishItems.splice(index, 1);
        localStorage.setItem('wishItems', JSON.stringify(wishItems));
    }
    function addToCart(wishItem) {
        var cartItems = localStorage.getItem('cartItems');
        if (!cartItems) {
            cartItems = [];
        }
        else {
            cartItems = JSON.parse(cartItems);
            var existingItemIndex = cartItems.findIndex(function (item) { return item.id === wishItem.id; });
            if (existingItemIndex !== -1) {
                alert('Item already in the cart!');
                return;
            }
            else {
                cartItems.push(wishItem);
                wishItems.splice(existingItemIndex, 1);
                localStorage.setItem('wishItems', JSON.stringify(wishItems));
                alert('Item added to the cart!');
                // itemRow.remove();
            }
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
});
