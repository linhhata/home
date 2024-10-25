document.addEventListener('DOMContentLoaded', () => {
  let currentPage = 0;
  const limit = 4; // Số sản phẩm trên mỗi trang
  const totalDots = 3; // Tổng số hình chữ nhật

  const productContainer = document.getElementById('product-container');
  const paginationContainer = document.getElementById('pagination');

  function fetchProducts(page) {
    const skip = page * limit;

    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then(response => response.json())
      .then(data => {
        productContainer.innerHTML = '';
        const products = data.products;

        products.forEach(product => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');

          productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.thumbnail}" alt="${product.title}" style="width: 100%; height: 100%; border-radius: 8px;">
                    </div>
                    <div class="small-images">
                        <img src="./assest/hang.png" alt="Image 1" class="small-img1">
                        <img src="./assest/love.png" alt="Image 2" class="small-img2">
                        <img src="./assest/plus.png" alt="Image 3" class="small-img3">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="dots-container">
                            <div class="dot" style="background-color: #05E6B7;"></div>
                            <div class="dot" style="background-color: #F701A8;"></div>
                            <div class="dot" style="background-color: #00009D;"></div>
                        </div>
                        <p class="product-code">Code - ${product.sku}</p>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button class="view-details">View Details</button> 
                    </div>
                `;

          // Thêm sự kiện click cho nút View Details
          productCard.querySelector('.view-details').addEventListener('click', () => {
            window.location.href = `product-details.html?id=${product.id}`;
          });

          productContainer.appendChild(productCard);
        });

        updatePagination(page);
      })
      .catch(error => {
        console.error('Error fetching the products:', error);
      });
  }

  function updatePagination(page) {
    paginationContainer.innerHTML = '';

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
