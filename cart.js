document.addEventListener('DOMContentLoaded', function () {
    var cartItems = localStorage.getItem('cartItems');
    if (!cartItems) {
        cartItems = [];
    }
    else {
        // localStorage.removeItem('cartItems');
        cartItems = JSON.parse(cartItems);
    }
    var cartItemsContainer = document.getElementById('cart-items-container');
    var totalCost = 0;
    var _loop_1 = function (i) {
        console.log(cartItems);
        var cartItem = cartItems[i];
        var itemRow = document.createElement('div');
        itemRow.className = 'row';
        var imageCol = document.createElement('div');
        imageCol.className = 'col';
        var productImage = document.createElement('img');
        productImage.src = cartItem.image;
        productImage.style.width = "220px";
        productImage.style.height = "220px";
        // productImage.alt = cartItem.title;
        imageCol.appendChild(productImage);
        var detailsCol = document.createElement('div');
        detailsCol.className = 'col';
        var productTitle = document.createElement('h3');
        productTitle.innerText = cartItem.title;
        var productPrice = document.createElement('p');
        productPrice.innerText = "Price: " + cartItem.price;
        productPrice.classList.add('item-price');
        var quantityControl = document.createElement('div');
        quantityControl.className = 'quantity-control';
        var decreaseButton = document.createElement('button');
        decreaseButton.className = 'btn btn-outline-primary quantity-btn';
        decreaseButton.innerText = '-';
        decreaseButton.addEventListener('click', function () {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                updateCartItem(cartItem);
            }
            else {
                removeCartItem(cartItem);
                itemRow.remove();
            }
        });
        var quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.value = cartItem.quantity;
        quantityInput.readOnly = true;
        var increaseButton = document.createElement('button');
        increaseButton.className = 'btn btn-outline-primary quantity-btn';
        increaseButton.innerText = '+';
        increaseButton.addEventListener('click', function () {
            cartItem.quantity++;
            updateCartItem(cartItem);
        });
        var totalCostLabel = document.createElement('p');
        totalCostLabel.classList.add('item-tot');
        totalCostLabel.innerText = "Total-Price: " + '$' + (Number(cartItem.price.replace('$', '')) * cartItem.quantity);
        var removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger';
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', function () {
            removeCartItem(cartItem);
            itemRow.remove();
        });
        quantityControl.appendChild(decreaseButton);
        quantityControl.appendChild(quantityInput);
        quantityControl.appendChild(increaseButton);
        detailsCol.appendChild(productTitle);
        detailsCol.appendChild(productPrice);
        detailsCol.appendChild(quantityControl);
        detailsCol.appendChild(totalCostLabel);
        detailsCol.appendChild(removeButton);
        itemRow.appendChild(imageCol);
        itemRow.appendChild(detailsCol);
        cartItemsContainer.appendChild(itemRow);
        totalCost += Number(cartItem.price.replace('$', '')) * cartItem.quantity;
    };
    for (var i = 0; i < cartItems.length; i++) {
        _loop_1(i);
    }
    function updateTotalCost() {
        var totalCostEl = document.getElementById('total-cost');
        if (totalCostEl) {
            totalCost = 0;
            for (var i = 0; i < cartItems.length; i++) {
                totalCost += Number(cartItems[i].price.replace('$', '')) * cartItems[i].quantity;
            }
            totalCostEl.innerText = '$' + totalCost;
        }
    }
    function updateCartItem(item) {
        console.log(item);
        var index = cartItems.findIndex(function (i) { return i.id === item.id; });
        console.log(cartItems[index]);
        cartItems[index] = item;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log(item.quantity);
        var row = cartItemsContainer.children[index];
        var quantityInput = row.querySelector('input');
        if (quantityInput) {
            quantityInput.value = item.quantity;
        }
        var totalCostLabel = row.querySelector('p.item-tot');
        if (totalCostLabel) {
            tot = 0;
            tot = Number(item.price.replace('$', '')) * item.quantity;
        }
        totalCostLabel.innerText = "Total-Price: " + '$' + tot;
        console.log(totalCostLabel);
        updateTotalCost();
    }
    function removeCartItem(item) {
        var index = cartItems.findIndex(function (i) { return i.id === item.id; });
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateTotalCost();
    }
    updateTotalCost();
});
