
//API2
const apiUrl = 'https://dummyjson.com/products';
const productsPerPage = 12; 
let currentPage = 1; 
let allProducts = []; 
let isGridView = true; 

// Hàm lấy tất cả sản phẩm từ API
async function fetchAllProducts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    allProducts = data.products;
    displayProducts(allProducts, currentPage); 
    createPagination(Math.ceil(allProducts.length / productsPerPage)); 
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}


function displayProducts(products, page) {
  const productContainer = document.getElementById('product-list');
  productContainer.innerHTML = ''; 

  
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  paginatedProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    if (!isGridView) {
      productCard.style.width = "100%"; 
      productCard.style.display = "flex";
      productCard.style.justifyContent = "space-between";
    }

    
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const productImage = document.createElement('img');
    productImage.src = product.thumbnail; 
    productImage.alt = product.title;

    imageContainer.appendChild(productImage);

   
    const productTitle = document.createElement('h3');
    productTitle.textContent = product.title;

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');

    
    const discountedPrice = document.createElement('p');
    const discountAmount = (product.price * (1 - (product.discountPercentage / 100))).toFixed(2);
    discountedPrice.textContent = `$${discountAmount}`; 
    discountedPrice.classList.add('discounted-price'); 

    const originalPrice = document.createElement('p');
    originalPrice.textContent = `$${product.price}`; 
    originalPrice.classList.add('original-price'); 

    priceContainer.appendChild(discountedPrice);
    priceContainer.appendChild(originalPrice);

    const colorOptions = document.createElement('div');
    colorOptions.classList.add('color-options');
    
    const color1 = document.createElement('span');
    color1.classList.add('color-1');
    const color2 = document.createElement('span');
    color2.classList.add('color-2');
    const color3 = document.createElement('span');
    color3.classList.add('color-3');
    colorOptions.appendChild(color1);
    colorOptions.appendChild(color2);
    colorOptions.appendChild(color3);
    productCard.appendChild(imageContainer);  
    productCard.appendChild(productTitle);    
    productCard.appendChild(colorOptions);    
    productCard.appendChild(priceContainer);  

    productContainer.appendChild(productCard);
  });
}
function createPagination(totalPages) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = ''; 

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.classList.add('pagination-button');

    if (i === currentPage) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      currentPage = i;
      displayProducts(allProducts, currentPage);
      updateActivePage();
    });

    paginationContainer.appendChild(button);
  }
}
function updateActivePage() {
  const buttons = document.querySelectorAll('.pagination button');
  buttons.forEach(button => {
    button.classList.remove('active');
    if (parseInt(button.textContent) === currentPage) {
      button.classList.add('active');
    }
  });
}

// Chuyển đổi chế độ hiển thị (grid/list view)
const gridViewButton = document.querySelector('.grid-view');
const listViewButton = document.querySelector('.list-view');

gridViewButton.addEventListener('click', () => {
  isGridView = true;
  document.getElementById('product-list').classList.add('product-grid');
  document.getElementById('product-list').classList.remove('product-list');
  displayProducts(allProducts, currentPage); 
});

listViewButton.addEventListener('click', () => {
  isGridView = false;
  document.getElementById('product-list').classList.remove('product-grid');
  document.getElementById('product-list').classList.add('product-list');
  displayProducts(allProducts, currentPage); 
});

window.onload = fetchAllProducts;
