function displayProduct(){
    
    let product = JSON.parse(localStorage.getItem("particular-product"))
    console.log(product);
    let displayPro = ""
   
        displayPro += `
        <div class="main-product">
            <div class="product-img">
                <div class="main-img">
                    <img src="${product.mainImage}"/>
                </div>
                <div class="sub-img">
                    <img src="${product.subImages[0]}"/>
                    <img src="${product.subImages[1]}"/>
                    <img src="${product.subImages[2]}"/>
                </div>
            </div>
            <div class="product-info">
                <div class="product-details-div"><p class="product-detalis-name"><b>${product.name}</b></p><p class="product-detalis-company">By ${product.brand}</p></div>
                <div>${product.description}</div>
                <div>Colors : ${product.colors}</div>
                <div>Price :${product.price}</div>
                <div>Rating : ${product.rating}</div>
                <div>Stock : ${product.stock}</div>
                <div>
                    <button>
                        <a href="../main/index.html">
                            Add To Cart
                        </a>
                    </button>
                </div>
            </div>
        </div>`
    
    document.querySelector(".product").innerHTML = displayPro
}
displayProduct()