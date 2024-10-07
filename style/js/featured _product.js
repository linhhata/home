
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

