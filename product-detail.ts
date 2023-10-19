
let quantity: number = 1;

function increaseQuantity(): void {
  quantity++;
  (document.getElementById('quantity') as HTMLInputElement).value = quantity.toString();
}

function decreaseQuantity(): void {
  if (quantity > 0) {
    quantity--;
    (document.getElementById('quantity') as HTMLInputElement).value = quantity.toString();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
  const productId: string | null = urlParams.get('id');

  // Fetch product details from the FakeStore API
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      const productDetailContainer: HTMLElement | null = document.getElementById('product-detail-container');

      if (productDetailContainer) {
        productDetailContainer.innerHTML = `
          <div class="product-image">
            <img id="product-image" src="${product.image}" class="img-fluid">
          </div>
          <div class="product-info">
            <h2 id="product-title">${product.title}</h2>
            <p>Description: ${product.description}</p>
            <p id="product-price">$${product.price}</p>
            <div class="quantity-control">
              <button class="btn btn-outline-primary quantity-btn" onclick="decreaseQuantity()">-</button>
              <input type="text" id="quantity" value="${quantity}" readonly>
              <button class="btn btn-outline-primary quantity-btn" onclick="increaseQuantity()">+</button>
            </div>
            <button class="btn btn-success mt-3" onclick="addToCart()">Add to Cart</button>
          </div>
        `;
      }
    })
    .catch(error => console.error('Error fetching product details:', error));
});

function addToCart(): void {
  const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
  const productId: string | null = urlParams.get('id');

  const cartItem = {
    id: productId,
    image: (document.getElementById('product-image') as HTMLImageElement).src,
    title: (document.getElementById('product-title') as HTMLElement).innerText,
    price: (document.getElementById('product-price') as HTMLElement).innerText,
    quantity: quantity
  };

  let cartItems: string | null = localStorage.getItem('cartItems');
  if (!cartItems) {
    cartItems = '[]';
  } else {
    const parsedCartItems: any[] = JSON.parse(cartItems);
    const existingItemIndex: number = parsedCartItems.findIndex(item => item.id === productId);

    if (existingItemIndex !== -1) {
      parsedCartItems[existingItemIndex].quantity += quantity;
    } else {
      parsedCartItems.push(cartItem);
    }

    cartItems = JSON.stringify(parsedCartItems);
  }

  // Save the updated cart items to local storage
  localStorage.setItem('cartItems', cartItems);

  alert('Item added to the cart!');
}
