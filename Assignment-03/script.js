let products = [];
let cart = [];

function addProduct() {
    let productName = document.getElementById('productName').value;
    if (productName) {
        products.push({ name: productName, price: 0 });
        updateProductList();
        document.getElementById('productName').value = '';
        document.getElementById('productList').value = productName;
        document.getElementById('productPrice').value = '';
    }
}

function setPrice() {
    let selectedProduct = document.getElementById('productList').value;
    let price = document.getElementById('productPrice').value;
    let product = products.find(p => p.name === selectedProduct);
    if (product) {
        product.price = price;
        document.getElementById('productList').value = '';
        document.getElementById('productPrice').value = '';
    }
}

function updateProductList() {
    let productList = document.getElementById('productList');
    let checkoutProductList = document.getElementById('checkoutProductList');
    productList.innerHTML = '';
    //Stored the sleected value
    let selectedValue = checkoutProductList.value;

    checkoutProductList.innerHTML = '';
    products.forEach(product => {
        let option = document.createElement('option');
        option.text = product.name;
        productList.add(option);
        checkoutProductList.add(option.cloneNode(true));
    });

    //Set back the selected value
    checkoutProductList.value = selectedValue;
}

function startNewTransaction() {
    cart = [];
    document.getElementById('dateTime').innerHTML = '';
    document.getElementById('cartItems').innerHTML = '';
    document.getElementById('totalAmount').innerHTML = '';


    // Clear the selection and input value
    document.getElementById('checkoutProductList').value = '';
    document.getElementById('quantity').value = '';
}

function addToCart() {
    let selectedProduct = document.getElementById('checkoutProductList').value;
    let quantity = parseInt(document.getElementById('quantity').value);
    let product = products.find(p => p.name === selectedProduct);
    if (product && quantity > 0) {
        cart.push({ product: product, quantity: quantity });
        updateCartDisplay();

        // Clear the selection and input value
        document.getElementById('checkoutProductList').value = '';
        document.getElementById('quantity').value = '';

    }

}

// script.js

function updateCartDisplay() {
    let cartItems = document.getElementById('cartItems');
    let total = 0;

    //Create table to store the date and time
    let date = new Date();
    let dateTimeTable = document.createElement('table');
    let dateRow = dateTimeTable.insertRow();
    dateRow.insertCell().textContent = 'Date: ' + date.toLocaleDateString();
    let timeRow = dateTimeTable.insertRow();
    timeRow.insertCell().textContent = 'Time: ' + date.toLocaleTimeString();
    document.getElementById('dateTime').innerHTML = dateTimeTable.outerHTML;

    // Create a table
    let table = document.createElement('table');

    // Add headers
    let headers = table.insertRow();
    headers.insertCell().textContent = 'Product';
    headers.insertCell().textContent = '$/unit';
    headers.insertCell().textContent = 'Unit(s)';
    headers.insertCell().textContent = 'Price';

    cart.forEach(item => {
        let itemTotal = item.product.price * item.quantity;
        total += itemTotal;

        // Add a row for the item
        let row = table.insertRow();
        row.insertCell().textContent = item.product.name;
        row.insertCell().textContent = '$' + item.product.price;
        row.insertCell().textContent = item.quantity;
        row.insertCell().textContent = '$' + itemTotal;
    });

    // Set the innerHTML of the cartItems div to the outerHTML of the table
    cartItems.innerHTML = table.outerHTML;

    let tax = total * 0.05;
    let grandTotal = total + tax;
    // Create a table for the tax and grand total
    let totalTable = document.createElement('table');
    let totalRow = totalTable.insertRow();
    totalRow.insertCell().textContent = 'Total: ' + '$' + total.toFixed(2);
    let taxRow = totalTable.insertRow();
    taxRow.insertCell().textContent = 'Tax (5%): ' + '$' + tax.toFixed(2);
    let grandTotalRow = totalTable.insertRow();
    grandTotalRow.insertCell().textContent = 'Grand Total: ' + '$' + grandTotal.toFixed(2);

    document.getElementById('totalAmount').innerHTML = totalTable.outerHTML;

}

function processPayment() {
    alert("Thank you for your payment!");
    startNewTransaction();
}

// Generate numeric buttons
window.onload = function () {
    let numberPad = document.getElementById('numberPad');
    for (let i = 1; i <= 9; i++) {
        let button = document.createElement('button');
        button.textContent = i;
        button.onclick = function () {
            document.getElementById('quantity').value += i;
        };
        numberPad.appendChild(button);
    }
};

