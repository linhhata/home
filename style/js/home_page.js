
document.addEventListener('DOMContentLoaded', () => {
  let currentPage = 0;
  const limit = 4;
  const totalDots = 4; 

  const productContainer = document.getElementById('product-container');
  const paginationContainer = document.getElementById('pagination');

  function fetchProducts(page) {
      const skip = page * limit;

      fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
          .then(response => response.json())
          .then(data => {
              productContainer.innerHTML = ""; 
              const products = data.products;

              products.forEach(product => {
                  const productCard = document.createElement('div');
                  productCard.classList.add('product-card');

                  productCard.innerHTML = `
                      <img src="${product.thumbnail}" alt="${product.title}" style="width: 100%; border-radius: 8px;">
                      <h3 class="product-title">${product.title}</h3>
                      <p class="product-code">Code - ${product.id}</p>
                      <p class="product-price">$${product.price.toFixed(2)}</p>
                      
                  `;

                  productContainer.appendChild(productCard);
              });

              updatePagination(page);
          })
          .catch(error => {
              console.error('Error fetching the products:', error);
          });
  }

  function updatePagination(page) {
      paginationContainer.innerHTML = ""; 

      for (let i = 0; i < totalDots; i++) {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (i === page % totalDots) {
              dot.classList.add('active');
          }

          dot.addEventListener('click', () => {
              currentPage = i;
              fetchProducts(currentPage);
          });

          paginationContainer.appendChild(dot);
      }
  }
  fetchProducts(currentPage);
});

