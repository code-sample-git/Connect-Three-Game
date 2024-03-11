//Listerner for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();

    document.getElementById('sort-asc').addEventListener('click', function() {
        fetchProducts('asc');
    });

    document.getElementById('sort-desc').addEventListener('click', function() {
        fetchProducts('desc');
    });

    document.getElementById('filter-category').addEventListener('change', function() {
        fetchProducts(null, this.value);
    });
});

// Fetches the products from the API
function fetchProducts(sortOrder = null, category = '') {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            if (sortOrder) {
                data.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
            }
            if (category) {
                data = data.filter(item => item.category === category);
            }
            displayProducts(data);
        })
        .catch(error => console.log(error));
}

// Displays the products on the page
function displayProducts(products) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
        `;
        productsDiv.appendChild(productDiv);
    });
}
