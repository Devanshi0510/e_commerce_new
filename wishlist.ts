import React from 'react';

document.addEventListener('DOMContentLoaded', function () {
  let wishItems: any[] = localStorage.getItem('wishItems');
  if (!wishItems) {
    wishItems = [];
  } else {
    wishItems = JSON.parse(wishItems);
  }

  const cartItemsContainer = document.getElementById('wishlist-items-container');
  let totalCost = 0;

  for (let i = 0; i < wishItems.length; i++) {
    console.log(wishItems);
    const wishItem = wishItems[i];

    const itemRow = document.createElement('div');
    itemRow.className = 'row';

    const imageCol = document.createElement('div');
    imageCol.className = 'col';

    const productImage = document.createElement('img');
    productImage.src = wishItem.image;
    productImage.style.width = "220px";
    productImage.style.height = "220px";
    imageCol.appendChild(productImage);

    const detailsCol = document.createElement('div');
    detailsCol.className = 'col';
    const productTitle = document.createElement('h3');
    productTitle.innerText = wishItem.title;
    const productPrice = document.createElement('p');
    productPrice.innerText = "Price: " + wishItem.price;
    productPrice.classList.add('item-price');

    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'btn btn-outline-primary quantity-btn';
    addToCartButton.innerText = 'Add To Cart';
    addToCartButton.addEventListener('click', function () {
      addToCart(wishItem);
    });

    const removeButton = document.createElement('button');
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
  }

  function removeCartItem(item: any) {
    const index = wishItems.findIndex(i => i.id === item.id);
    wishItems.splice(index, 1);
    localStorage.setItem('wishItems', JSON.stringify(wishItems));
  }

  function addToCart(wishItem: any) {
    let cartItems: any[] = localStorage.getItem('cartItems');
    if (!cartItems) {
      cartItems = [];
    } else {
      cartItems = JSON.parse(cartItems);
      const existingItemIndex = cartItems.findIndex(item => item.id === wishItem.id);

      if (existingItemIndex !== -1) {
        alert('Item already in the cart!');
        return;
      } else {
        cartItems.push(wishItem);
        wishItems.splice(existingItemIndex, 1);
        localStorage.setItem('wishItems', JSON.stringify(wishItems));
        alert('Item added to the cart!');
      }
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
});