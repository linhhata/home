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
                <img class="cart-icon" src="./assest/hang.png" alt="Cart" data-id="${product.id}" />
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
  
         
          const cartIcon = productElement.querySelector('.cart-icon');
          cartIcon.addEventListener('click', () => {
            addToCart(product);
            alert(`${product.title} đã được thêm vào giỏ hàng!`);
          });
        });
      })
      .catch(error => console.error('Error loading products:', error));
  }
  

  function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  
  function saveCartItems(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
  
  
  function addToCart(product) {
    const cartItems = getCartItems();
    const existingProduct = cartItems.find(item => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity += 1; 
    } else {
      
      const productToAdd = {
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        quantity: 1
      };
      cartItems.push(productToAdd);
    }
  
    saveCartItems(cartItems); 
    displayCartItems(); 
  }
  
  // Hàm để hiển thị sản phẩm trong giỏ hàng
  function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const cartItems = getCartItems();
  
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
  
    cartItems.forEach(product => {
      const totalProductPrice = product.price * product.quantity;
      subtotal += totalProductPrice;
  
      const cartItem = document.createElement('tr');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <td>
          <div class="product-details">
            <img src="${product.thumbnail}" alt="${product.title}" style="width: 83px; height: 87px; border-radius: 3px;">
            <div>
              <p style="margin: 0; font-weight: bold;">${product.title}</p>
              <p style="margin: 0; color: #a1a8c1;">Size: XL</p>
            </div>
          </div>
        </td>
        <td>$${product.price.toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td>$${totalProductPrice.toFixed(2)}</td>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${subtotal.toFixed(2)}`;
  }
  
  
  document.addEventListener('DOMContentLoaded', displayCartItems);
  

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
                      <img src="./assest/hang.png" class="thumbnail-image1">
                      <img src="./assest/love.png" class="thumbnail-image2">
                      <img src="./assest/plus.png" class="thumbnail-image3">
                  </div>
                  <button class="view-now-button" style="display: none;">View Details</button>
              </div>
              <h3 class="trending-product-title">${item.title}</h3>
              <div class="trending-product-price-discount">
                  <p class="trending-product-price">$${item.price}</p> 
                  <p class="trending-product-discount">${item.discountPercentage}</p> 
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

         
          const viewNowButton = trendingProductCard.querySelector('.view-now-button');
          viewNowButton.addEventListener('click', () => {
             
              window.location.href = `details.html?id=${item.id}`;
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


//Discount Item

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getRandomCategories() {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  const products = data.products;

  const uniqueCategories = getUniqueCategories(products);
  const randomCategories = selectRandomCategories(uniqueCategories, 3);
  displayCategories(randomCategories, products);
  if (randomCategories.length > 0) {
      showRandomProduct(randomCategories[0], products); 
  }
}
function getUniqueCategories(products) {
  const categories = products.map(product => product.category);
  return [...new Set(categories)]; 
}
function selectRandomCategories(categories, count) {
  const selectedCategories = [];
  while (selectedCategories.length < count) {
      const randomIndex = Math.floor(Math.random() * categories.length);
      const selectedCategory = categories[randomIndex];
      if (!selectedCategories.includes(selectedCategory)) {
          selectedCategories.push(selectedCategory);
      }
  }
  return selectedCategories;
}
function displayCategories(categories, products) {
  const container = document.getElementById('categories-container');
  container.innerHTML = ''; 

  categories.forEach((category, index) => {
      const categoryItem = `
      <div class="category-item ${index === 0 ? 'active' : ''}" data-category="${category}">
          ${capitalizeFirstLetter(category)} 
      </div>
      `;
      container.innerHTML += categoryItem; 
  });
  addCategoryClickEvent(products);
}

function addCategoryClickEvent(products) {
  const categoryItems = document.querySelectorAll('.category-item');
  categoryItems.forEach(item => {
      item.addEventListener('click', function() {
          categoryItems.forEach(c => c.classList.remove('active'));
          this.classList.add('active');

          const selectedCategory = this.getAttribute('data-category');
          showRandomProduct(selectedCategory, products);
      });
  });
}

function showRandomProduct(category, products) {
  const filteredProducts = products.filter(product => product.category === category);
  const randomProduct = filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
  document.getElementById('random-product-image').src = randomProduct.thumbnail; 
}

getRandomCategories();

//Top Categories

fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
        
        const firstCategory = data.products[0].category;

        
        const filteredProducts = data.products.filter(product => product.category === firstCategory);

        
        displayProducts(filteredProducts);
    })
    .catch(error => console.error('Lỗi API:', error));

    function displayProducts(products) {
      const productContainer = document.getElementById('product-list');
      productContainer.innerHTML = ''; 
      products.forEach(product => {
          const productHTML = `
          <div class="product-item">
              <div class="product-img">
                  <img src="${product.thumbnail}" alt="${product.title}" />
                  <div class="view-shop" onclick="viewProductDetails(${product.id})">View Shop</div>
              </div>
              <h4>${product.title}</h4>
              <p>$${product.price.toFixed(2)}</p>
          </div>
          `;
          productContainer.innerHTML += productHTML;
      });
  }
  
  function viewProductDetails(productId) {
   
      window.location.href = `details.html?id=${productId}`;
  }
  

  










