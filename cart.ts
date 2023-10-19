document.addEventListener('DOMContentLoaded', function () {
  let cartItems: string[] | null = localStorage.getItem('cartItems');
  if (!cartItems) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(cartItems);
  }
  
  const cartItemsContainer: HTMLElement | null = document.getElementById('cart-items-container');
  let totalCost: number = 0;
  
  for (let i: number = 0; i < cartItems.length; i++) {
    console.log(cartItems);
    const cartItem: string = cartItems[i];
  
    const itemRow: HTMLDivElement = document.createElement('div');
    itemRow.className = 'row';
  
    const imageCol: HTMLDivElement = document.createElement('div');
    imageCol.className = 'col';
  
    const productImage: HTMLImageElement = document.createElement('img');
    productImage.src = cartItem.image;
    productImage.style.width = "220px";
    productImage.style.height = "220px";
    imageCol.appendChild(productImage);
  
    const detailsCol: HTMLDivElement = document.createElement('div');
    detailsCol.className = 'col';
    const productTitle: HTMLHeadingElement = document.createElement('h3');
    productTitle.innerText = cartItem.title;
    const productPrice: HTMLParagraphElement = document.createElement('p');
    productPrice.innerText = "Price: " + cartItem.price;
    productPrice.classList.add('item-price');
    const quantityControl: HTMLDivElement = document.createElement('div');
    quantityControl.className = 'quantity-control';
    const decreaseButton: HTMLButtonElement = document.createElement('button');
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
    const quantityInput: HTMLInputElement = document.createElement('input');
    quantityInput.type = 'text';
    quantityInput.value = cartItem.quantity;
    quantityInput.readOnly = true;
  
  
    const increaseButton: HTMLButtonElement = document.createElement('button');
    increaseButton.className = 'btn btn-outline-primary quantity-btn';
    increaseButton.innerText = '+';
    increaseButton.addEventListener('click', function () {
      cartItem.quantity++;
      updateCartItem(cartItem);
    });
  
    const totalCostLabel: HTMLParagraphElement = document.createElement('p');
    totalCostLabel.classList.add('item-tot');
    totalCostLabel.innerText = "Total-Price: " + '$' + (Number(cartItem.price.replace('$', '')) * cartItem.quantity);
  
  
    const removeButton: HTMLButtonElement = document.createElement('button');
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
  }
  
  function updateTotalCost(): void {
    let totalCostEl: HTMLElement | null = document.getElementById('total-cost');
    if (totalCostEl) {
      totalCost = 0;
      for (let i: number = 0; i < cartItems.length; i++) {
        totalCost += Number(cartItems[i].price.replace('$', '')) * cartItems[i].quantity;
      }
      totalCostEl.innerText = '$' + totalCost;
  
    }
  
  }
  
  function updateCartItem(item: string): void {
    console.log(item);
    const index: number = cartItems.findIndex(i => i.id === item.id);
    console.log(cartItems[index]);
    cartItems[index] = item;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log(item.quantity);
    const row: HTMLElement | null = cartItemsContainer.children[index];
    const quantityInput: HTMLInputElement | null = row.querySelector('input');
    if (quantityInput) {
      quantityInput.value = item.quantity;
    }
    const totalCostLabel: HTMLElement | null = row.querySelector('p.item-tot');
    if (totalCostLabel) {
      let tot: number = 0;
      tot = Number(item.price.replace('$', '')) * item.quantity;
    }
    totalCostLabel.innerText = "Total-Price: " + '$' + tot;
    console.log(totalCostLabel);
    updateTotalCost();
  }
  
  function removeCartItem(item: string): void {
    const index: number = cartItems.findIndex(i => i.id === item.id);
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateTotalCost();
  }
  
  updateTotalCost();