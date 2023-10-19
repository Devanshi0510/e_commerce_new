function addToCart(productId: string): void {
  console.log(String(productId));
  let quantity: number = 1;
  const productCard: HTMLElement | null = document.querySelector(`[data-product-id="${productId}"]`);
  console.log(productCard);
  const cartItem: {
    id: string;
    image: string;
    title: string;
    price: string;
    quantity: number;
  } = {
    id: String(productId),
    image: productCard.querySelector('.card-img-top').src,
    title: productCard.querySelector('.card-title').innerText,
    price: productCard.querySelector('.card-text').innerText,
    quantity: quantity
  };
  console.log(cartItem)

  let cartItems: string | null = localStorage.getItem('cartItems');
  if (!cartItems) {
    cartItems = "[]";
  } else {
    cartItems = JSON.parse(cartItems);
    const existingItemIndex: number = cartItems.findIndex((item: { id: string }) => item.id === String(productId));

    if (existingItemIndex !== -1) {
      alert('Item already in the cart!');
      return;
    } else {
      cartItems.push(cartItem);
      alert('Item added to the cart!');
    }
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function addToWishlist(productId: string): void {
  console.log(String(productId));
  let quantity: number = 1;
  const productCard: HTMLElement | null = document.querySelector(`[data-product-id="${productId}"]`);
  const wishItem: {
    id: string;
    image: string;
    title: string;
    price: string;
    quantity: number;
  } = {
    id: String(productId),
    image: productCard.querySelector('.card-img-top').src,
    title: productCard.querySelector('.card-title').innerText,
    price: productCard.querySelector('.card-text').innerText,
    quantity: quantity
  };
  console.log(wishItem)

  let wishItems: string | null = localStorage.getItem('wishItems');
  if (!wishItems) {
    wishItems = "[]";
  } else {
    wishItems = JSON.parse(wishItems);
    const existingItemIndex: number = wishItems.findIndex((item: { id: string }) => item.id === String(productId));

    if (existingItemIndex !== -1) {
      alert('Item already in the Wishlist!');
      return;
    } else {
      wishItems.push(wishItem);
      alert('Item added to the wishlist!');
    }
  }

  localStorage.setItem('wishItems', JSON.stringify(wishItems));
}

document.addEventListener('DOMContentLoaded', function () {
  fetch('https://fakestoreapi.com/products')
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((products: Array<any>) => {

      const filterSelect: HTMLElement | null = document.getElementById('filter-by');
      const sortSelect: HTMLElement | null = document.getElementById('sort-by');
      const filterProducts = (option: string): Array<any> => {
        switch (option) {
          case 'none':
            return products;
          case 'rating>3':
            return products.filter((product: { rating: { rate: number } }) => product.rating.rate > 3);
          case 'rating>4':
            return products.filter((product: { rating: { rate: number } }) => product.rating.rate > 4);
          case 'count':
            return products.filter((product: { count: number }) => product.count > 0);
          default:
            return products;
        }
      };


      const sortProducts = (option: string): Array<any> => {
        const productsCopy: Array<any> = JSON.parse(JSON.stringify(products));
        switch (option) {
          case 'none':
            return productsCopy;
          case 'price-high':
            return productsCopy.sort((a: { price: number }, b: { price: number }) => b.price - a.price);
          case 'price-low':
            return productsCopy.sort((a: { price: number }, b: { price: number }) => a.price - b.price);
          case 'rating-high':
            return productsCopy.sort((a: { rating: { rate: number } }, b: { rating: { rate: number } }) => b.rating.rate - a.rating.rate);
          case 'rating-low':
            return productsCopy.sort((a: { rating: { rate: number } }, b: { rating: { rate: number } }) => a.rating.rate - b.rating.rate);
          default:
            return productsCopy;
        }
      };

      const displayProducts = (products: Array<any>): void => {

        document.getElementById('women-s-clothing-container').innerHTML = '';
        document.getElementById('men-s-clothing-container').innerHTML = '';
        document.getElementById('jewelery-container').innerHTML = '';
        document.getElementById('electronics-container').innerHTML = '';


        products.forEach((product: any) => {
          const card: HTMLElement = document.createElement('div');
          card.classList.add('col-md-4', 'product-card');
          card.innerHTML = `
            <div class="card" data-product-id="${product.id}">
              <a href="product-detail.html?id=${product.id}" target="_blank">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
              </a>
              <footer class="card-body">
                <h6 class="card-title">${product.title}</h6>
                <p class="card-text">$${product.price}</p>
                <button class="btn btn-success mt-3" onclick="addToCart(${product.id})" >Add to Cart</button>
                <button class="btn btn-success mt-3" onclick="addToWishlist(${product.id})" >Wishlist</button>
              </footer>
            </div>
          `;

          const categoryName: string = product.category.toLowerCase().replace(/[\s']/g, '-');
          const container: HTMLElement | null = document.getElementById(`${categoryName}-container`);

          if (container) {
            container.appendChild(card);
          }
        });
      };
      filterSelect?.addEventListener('change', function () {
        const selectedOption: string = this.value;
        const filteredProducts: Array<any> = filterProducts(selectedOption);

        displayProducts(filteredProducts);
      });

      sortSelect?.addEventListener('change', function () {
        const selectedOption: string = this.value;
        const sortedProducts: Array<any> = sortProducts(selectedOption);
        displayProducts(sortedProducts);
      });

      displayProducts(products);

    })
    .catch((error: Error) => console.error('Error fetching data:', error));


});