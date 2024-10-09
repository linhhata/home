fetch('https://dummyjson.com/products/categories')
  .then(response => response.json())
  .then(categories => {
    const limitedCategories = categories.slice(0, 4);
    const categoryContainer = document.getElementById('categories');
    let firstCategorySlug = null;
    limitedCategories.forEach((category, index) => {
      const categoryElement = document.createElement('span');
      categoryElement.textContent = category.name;
      if (index === 0) {
        categoryElement.classList.add('active-category');
        firstCategorySlug = category.slug;
      }

      categoryElement.addEventListener('click', () => {

        document.querySelectorAll('#categories span').forEach(span => {
          span.classList.remove('active-category');
        });
        categoryElement.classList.add('active-category');
        showProducts(category.slug);
      });

      categoryContainer.appendChild(categoryElement);
    });

    if (firstCategorySlug) {
      showProducts(firstCategorySlug);
    }
  })
  .catch(error => console.error('Error:', error));
function showProducts(categorySlug) {
  fetch(`https://dummyjson.com/products/category/${categorySlug}`)
    .then(response => response.json())
    .then(data => {
      const productsContainer = document.getElementById('products');
      productsContainer.innerHTML = '';
      const limitedProducts = data.products.slice(0, 6);
      limitedProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
          <div class="image-container">
              <img src="${product.thumbnail}" alt="${product.title}" />
          <div class="icon-container">
              <img class="sale-icon" src="./assest/sale.png" alt="Sale" />
              <img class="cart-icon" src="./assest/hang.png" alt="Cart" />
              <img class="heart-icon" src="./assest/love.png" alt="Heart" />
              <img class="search-icon" src="./assest/plus.png" alt="Search" />
          </div>
        </div>
          <h2>${product.title}</h2>
          <div class="price-container">
            <p class="discount-price">$${product.discountPercentage}</p>
            <p class="original-price">$${product.price}</p>
        </div>
        `;

        productsContainer.appendChild(productElement);
      });
    })
    .catch(error => console.error('Error loading products:', error));
}

//Trending Products

const fetchTrendingProducts = async () => {
  try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      const products = data.products.slice(0, 4);
      const trendingProductContainer = document.getElementById('container-trending');
      trendingProductContainer.innerHTML = '';

      products.forEach(item => {
          const trendingProductCard = document.createElement('div');
          trendingProductCard.className = 'trending-product-card';
          trendingProductCard.innerHTML = `
              <div class="trending-product-image-container">
                  <img src="${item.thumbnail}" alt="${item.title}" class="trending-product-image">
                  <div class="thumbnail-images" style="display: none;">
                      <img src="./assest/hang.png"class="thumbnail-image1">
                      <img src="./assest/love.png" class="thumbnail-image2">
                      <img src="./assest/plus.png" class="thumbnail-image3">
                  </div>
                  <button class="view-now-button" style="display: none;">View Deails</button>
              </div>
              <h3 class="trending-product-title">${item.title}</h3>
              <div class="trending-product-price-discount">
                  <p class="trending-product-price">$${item.price}</p> 
                  <p class="trending-product-discount">$${item.discountPercentage}</p> 
              </div>
          `;

          // Thêm sự kiện hover
          trendingProductCard.addEventListener('mouseover', () => {
              const thumbnails = trendingProductCard.querySelector('.thumbnail-images');
              const viewNowButton = trendingProductCard.querySelector('.view-now-button');
              thumbnails.style.display = 'flex'; 
              viewNowButton.style.display = 'block'; 
          });

          trendingProductCard.addEventListener('mouseout', () => {
              const thumbnails = trendingProductCard.querySelector('.thumbnail-images');
              const viewNowButton = trendingProductCard.querySelector('.view-now-button');
              thumbnails.style.display = 'none'; 
              viewNowButton.style.display = 'none'; 
          });

          trendingProductContainer.appendChild(trendingProductCard);
      });
  } catch (error) {
      console.error('Error fetching products:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fetchTrendingProducts(); 
});





