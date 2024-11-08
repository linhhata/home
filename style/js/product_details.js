
//APi 2
const apiGetSingleProduct = "https://dummyjson.com/products";
const apiGetProductsByACategory = "https://dummyjson.com/products/category";

async function getProductData() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    const response = await fetch(`${apiGetSingleProduct}/${productId}`);
    const data = await response.json();
    return data;
}


function showProductInfo(data) {
    document.querySelector(".product-detail-name").textContent = data.title;
    document.querySelector(".product-price-sale").textContent = `$${parseFloat((data.price * (100 - data.discountPercentage) / 100).toFixed(2)).toLocaleString("en-US")}`;
    document.querySelector(".product-price").textContent = `$${data.price.toLocaleString("en-US")}`;
    document.querySelector(".des-details").textContent = data.description;
    document.querySelector(".product-categories-name").textContent = data.category.charAt(0).toUpperCase() + data.category.slice(1);
    document.querySelector(".product-tags-name").textContent = data.tags ? data.tags.join(', ') : 'N/A';

    
    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('product-rating-container');
    ratingContainer.innerHTML = `
        <span class="product-rating">${showRating(data.rating)}</span>
        <span class="num-of-review">(${data.reviews.length})</span>
    `;
    
    
    document.querySelector(".product-rating").innerHTML = ''; 
    document.querySelector(".product-rating").appendChild(ratingContainer);

   
    showProductImage(data.images);
}


function showProductImage(listImages) {
    if (listImages.length > 0) {
        const productImgLeft = document.querySelector(".product-img-left");
        const productImgRight = document.querySelector(".product-img-right");

        const imageBig = document.createElement("img");
        imageBig.src = listImages[0];
        productImgRight.appendChild(imageBig);

        listImages.slice(0, 3).forEach((src, index) => {
            const imgSmall = document.createElement("img");
            imgSmall.src = src;
            if (index === 0) imgSmall.classList.add("img-active");

            productImgLeft.appendChild(imgSmall);

            imgSmall.addEventListener("click", function () {
                const imgSmallActive = productImgLeft.querySelector(".img-active");
                imgSmallActive.classList.remove("img-active");
                imgSmall.classList.add("img-active");
                imageBig.src = src;
            });
        });
    }
}
function showRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < Math.floor(rating) ? '★' : '☆';
    }
    return stars;
}
async function showRelatedProducts(data) {
    try {
        const response = await fetch(`${apiGetProductsByACategory}/${data.category}?skip=0&limit=4`);
        if (!response.ok) throw new Error("Lỗi khi tải sản phẩm liên quan");

        const resData = await response.json();
        const relatedProductsContainer = document.getElementById("related-products");

        resData.products.forEach(element => {
            const relatedProductItem = document.createElement("div");
            relatedProductItem.classList.add("flex-column", "related-product-item");

            relatedProductItem.innerHTML = `
                <img class="related-product-item-thumb" src="${element.thumbnail}">
                <div class="flex justify-between align-baseline">
                    <span class="josefin-sans-semi-bold text-ellipsis related-product-item-name">${element.title}</span>
                    <div class="product-rating">
                        ${showRating(element.rating)}
                    </div>
                </div>
                <span class="josefin-sans related-product-item-price">$${element.price.toLocaleString("en-US")}</span>
            `;

            relatedProductsContainer.appendChild(relatedProductItem);

            relatedProductItem.addEventListener("click", function () {
                window.location.href = `pages/details.html?id=${element.id}`;
            });
        });
    } catch (error) {
        console.error("Lỗi khi tải sản phẩm liên quan:", error);
    }
}
async function showProductDetailsPage() {
    const data = await getProductData();
    if (data) {
        showProductInfo(data);
        showRelatedProducts(data);

        const addCartButton = document.getElementById("add-cart-btn");
        addCartButton.addEventListener("click", function (event) {
            event.stopPropagation();
            addCart(data);
            console.log("add cart success:", data);
        });
    }
}
document.addEventListener('DOMContentLoaded', showProductDetailsPage);

//Related Products
const fetchTrendingProducts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products/category/Smartphones');
        const data = await response.json();

        // Lấy 4 sản phẩm đầu tiên từ danh mục "Mens-shoes"
        const products = data.products.slice(0, 4);
        const trendingProductContainer = document.getElementById('container-trending');
        trendingProductContainer.innerHTML = '';

        products.forEach(item => {
            const trendingProductCard = document.createElement('div');
            trendingProductCard.className = 'trending-product-card';
            trendingProductCard.innerHTML = `
                <div class="trending-product-image-container">
                    <img src="${item.thumbnail}" alt="${item.title}" class="trending-product-image">
                </div>
                <div class="trending-product-title-rating">
                    <h3 class="trending-product-title">${item.title}</h3>
                    <div class="trending-product-rating">
                      
                    </div>
                </div>
                <p class="trending-product-price">$${item.price}</p> 
            `;

            trendingProductContainer.appendChild(trendingProductCard);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetchTrendingProducts(); 
});







