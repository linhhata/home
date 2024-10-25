document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    console.log('Product ID:', productId); 

    if (productId) {
        fetchProductDetails(productId);
    } else {
        console.error('Product ID not found in URL');
        document.getElementById('product-details-container').innerHTML = '<p>Không tìm thấy ID sản phẩm trong URL.</p>';
    }

    function fetchProductDetails(id) {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(product => {
                const productDetailsContainer = document.getElementById('product-details-container');

                if (product) {
                    productDetailsContainer.innerHTML = `
                        <div class="product-detail-image">
                            <img src="${product.thumbnail}" alt="${product.title}" class="main-img">
                        </div>
                        <div class="product-info">
                            <h1 class="product-title">${product.title}</h1>
                            <p class="product-price">$${product.price.toFixed(2)}</p>
                            <p class="product-description">${product.description}</p>
                            <button class="add-to-cart">Add To Cart</button>
                        </div>
                    `;
                } else {
                    console.error('Sản phẩm không tồn tại.');
                    productDetailsContainer.innerHTML = '<p>Sản phẩm không tồn tại.</p>';
                }
            })
            .catch(error => {
                console.error('Lỗi khi tìm kiếm thông tin chi tiết sản phẩm:', error);
                document.getElementById('product-details-container').innerHTML = '<p>Có lỗi khi tải thông tin chi tiết sản phẩm.</p>';
            });
    }
});
