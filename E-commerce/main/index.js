// start

let button = document.getSelection("button");
let loader = document.querySelector(".loader")
let page = document.querySelector(".page")

setTimeout(()=>{
    loader.classList.add("hide")
    page.classList.remove("hide")
},2000)

function showProduct() {
    let productData = JSON.parse(localStorage.getItem("e-com_product-data"));
    let product = document.querySelector(".product-div");
    product = "";
    productData.map((value) => {
        product += `<div>
            <img src="${value.mainImage}"onclick="showAllDetailsOfProduct(${
            value.id
        })" alt="product-img" title="if you like this product click add to cart"/>
            <h3>${value.name}</h3>
            <p>${value.description.substring(0, 40) + "..."}</p>
            <p>rating : ${value.rating}/5</p>
            <p>Price : ${value.price}</p>
            <button onclick="addToCart(${
                value.id
            })"><span class="material-symbols-outlined">shopping_cart</span></button>
        </div>`;
    });
    document.querySelector(".product-div").innerHTML = product;
}

function searchProduct() {
    let searchInput = document.querySelector(".searchBox").value.trim();
    let productData = JSON.parse(localStorage.getItem("e-com_product-data"));
    let product = document.querySelector(".product-div");
    product = "";
    productData.map((value) => {
        if (value.name.toLowerCase().includes(searchInput)) {
            product += `<div>
            <img src="${
                value.mainImage
            }" alt="product-img" title="if you like this product click add to cart" onclick="showAllDetailsOfProduct(${value.id})"/>
            <h3>${value.name}</h3>
            <p>${value.description.substring(0, 40) + "..."}</p>
            <p>rating : ${value.rating}/5</p>
            <p>Price : ${value.price}</p>
            <button onclick="addToCart(${
                value.id
            })"><span class="material-symbols-outlined">shopping_cart</span></button>
        </div>`;
        }
    });
    document.querySelector(".product-div").innerHTML = product;
}

function showAllDetailsOfProduct(id) {
    let productData = JSON.parse(localStorage.getItem("e-com_product-data"));
    let product = productData.find((value) => value.id == id);
    localStorage.setItem("particular-product", JSON.stringify(product));
    window.location.href = "../productDetalis/productDetails.html";
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let productData = JSON.parse(localStorage.getItem("e-com_product-data"));
    let cartProduct = productData.find((value) => value.id == id);
    let existingIem = cart.find((value) => value.id == id);
    let userData = JSON.parse(localStorage.getItem("user-data")) || [];
    console.log("users :", userData);

    if (userData == "") {
        alert("first you need to login");
        window.location.href = "../login/login.html";
    } else {
        if (existingIem) {
            alert("already added");
        } else {
            cart.push(cartProduct);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
}

function openFilterMenu() {
    const filterDisplay = document.querySelector(".filter-display");
    filterDisplay.classList.toggle("hidden");
}

function showCategoryFilter() {
    let productData = JSON.parse(localStorage.getItem("e-com_product-data"));
    let category = Array.from(
        new Set(productData.map((value) => value.category))
    );
    let categoryDiv = "";
    category.forEach((value) => {
        categoryDiv += `
        <div>
            <input type="checkbox" id="category-${value}" value="${value}" onchange="showfilteredProduct('${value}')">
            <label for="category-${value}">${value}</label>
        </div>`;
    });
    document.querySelector(".category-filter").innerHTML = categoryDiv;
}

let selectedCategories = [];

function showfilteredProduct(category) {
    let checkbox = document.getElementById(`category-${category}`);

    if (checkbox.checked) {
        if (!selectedCategories.includes(category)) {
            selectedCategories.push(category);
        }
    } else {
        selectedCategories = selectedCategories.filter(
            (item) => item !== category
        );
    }

    updateProductDisplay();
}

function updateProductDisplay() {
    let productData = JSON.parse(localStorage.getItem("e-com_product-data"));
    let filteredProducts;

    if (selectedCategories.length === 0) {
        filteredProducts = productData;
    } else {
        filteredProducts = productData.filter((product) =>
            selectedCategories.includes(product.category)
        );
    }

    let productHTML = "";
    filteredProducts.forEach((value) => {
        productHTML += `<div>
            <img src="${
                value.mainImage
            }" alt="product-img" title="if you like this product click add to cart" onclick="showAllDetailsOfProduct(${value.id})"/>
            <h3>${value.name}</h3>
            <p>${value.description.substring(0, 40) + "..."}</p>
            <p>rating : ${value.rating}/5</p>
            <p>Price : ${value.price}</p>
            <button onclick="addToCart(${
                value.id
            })"><span class="material-symbols-outlined">shopping_cart</span></button>
        </div>`;
    });

    document.querySelector(".product-div").innerHTML = productHTML;
    console.log("Filtered products:", filteredProducts);
}

showCategoryFilter();
updateProductDisplay();

function filterPrice() {
    let priceDiv = document.querySelector(".price-filter");
    priceDiv.innerHTML = `
        <div>
            <input type="range" id="priceRange" min="0" max="1299" value="1299" step="1" 
                   class="inputRange">
            <p class="range-price">Price :1299</p>
        </div>
    `;
    console.log(document.querySelector(".inputRange").value);
    document
        .querySelector(".inputRange")
        .addEventListener("input", displayPriceFilter);
}

function displayPriceFilter() {
    let rangeValue = document.querySelector(".inputRange").value;
    let productData = JSON.parse(localStorage.getItem("e-com_product-data"));
    let pricefilterproduct = productData.filter(
        (value) => value.price < rangeValue
    );
    let product = document.querySelector(".product-div");
    product = "";
    pricefilterproduct.map((value) => {
        product += `<div>
            <img src="${
                value.mainImage
            }" alt="product-img" title="if you like this product click add to cart" onclick="showAllDetailsOfProduct(${value.id})"/>
            <h3>${value.name}</h3>
            <p>${value.description.substring(0, 40) + "..."}</p>
            <p>rating : ${value.rating}/5</p>
            <p>Price : ${value.price}</p>
            <button onclick="addToCart(${
                value.id
            })"><span class="material-symbols-outlined">shopping_cart</span></button>
        </div>`;
    });
    document.querySelector(".range-price").textContent = `Price :${rangeValue}`
    document.querySelector(".product-div").innerHTML = product;
}

filterPrice();

function getColor(color) {
    let filteredData;
    let productData = JSON.parse(localStorage.getItem("e-com_product-data"));
    let coloredProduct = productData.filter((value) =>
        value.colors.includes(color)
    );
    if (color == "Refresh") {
        filteredData = productData;
    } else {
        filteredData = coloredProduct;
    }
    let product = "";
    console.log(filteredData);
    filteredData.map((value) => {
        console.log(coloredProduct);

        product += `<div>
        <img src="${
            value.mainImage
        }" onclick="showAllDetailsOfProduct(${value.id})" alt="product-img" title="if you like this product click add to cart"/>
        <h3>${value.name}</h3>
        <p>${value.description.substring(0, 40) + "..."}</p>
        <p>rating : ${value.rating}/5</p>
        <p>Price : ${value.price}</p>
        <button onclick="addToCart(${
            value.id
        })"><span class="material-symbols-outlined">shopping_cart</span></button>
    </div>`;
    });
    document.querySelector(".product-div").innerHTML = product;
}

function userDataDeleted() {
    localStorage.removeItem("user-data");
}

//for Web3Forms js (direct acquired)

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
    })
        .then(async (response) => {
            let json = await response.json();
        })
        .catch((error) => {
            console.log(error);
        })
        .then(function () {
            form.reset();
        });
});

