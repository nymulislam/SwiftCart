// Load Categories
const loadCategories = () => {
    const url = `https://fakestoreapi.com/products/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data));
}

// Load Products
const loadProducts = () => {
    const url = `https://fakestoreapi.com/products`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayProducts(data))
}

// Load Products by category
const loadProductsByCategory = (category) => {
    const url = `https://fakestoreapi.com/products/category/${category}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayProducts(data));
}

// Category Display
const displayCategory = (categories) => {
    categories.unshift("All")

    const btnContainer = document.getElementById("btn-container").addEventListener("click", function (e) {
        if (e.target.classList.contains("btn")) {

            document.querySelectorAll("#category-btn").forEach(btn => btn.classList.add("btn-soft"))

            e.target.classList.remove("btn-soft");
        }

        e.target.innerText === "All" ? loadProducts() : loadProductsByCategory(e.target.innerText)
    });

    for (const category of categories) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        
        <button id="category-btn" class="btn btn-soft btn-primary rounded-full">${category}</button>
        `

        btnContainer.append(btnDiv)
    }

    // First btn active by default
    const firstBtn = document.getElementById("category-btn")
    firstBtn.classList.remove("btn-soft");

}





// All Products Display

const displayProducts = (products) => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");

        productDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm h-96 ">
        <figure class="bg-gray-400/15 py-2">
        <img class="w-32 h-36 " src="${product.image}" />
                </figure>
                <div class="card-body">
                <div class="flex justify-between items-center">
                <span class="badge badge-xs bg-indigo-500/25 text-indigo-700 font-semibold text-md">${product.category}</span>
                <span class="flex items-center gap-1">
                <i class="fa-solid fa-star text-orange-400"></i>
                <p>
                ${product.rating.rate}
                </p>
                <p>(${product.rating.count})</p>
                </span>
                </div>
                <h2 class="card-title">${product.title.length > 38 ? product.title.slice(0, 38) + "..." : product.title}</h2>
                <h2 class="text-2xl font-bold">$${product.price}</h2>
                <div class="flex justify-between gap-10 mt-5">
                <button class="btn btn-gost flex-grow"><i class="fa-regular fa-eye"></i>Details</button>
                <button class="btn btn-primary flex-grow"><i class="fa-solid fa-cart-plus"></i>Add</button>
                </div>
                
                </div>
                </div>
                
                `

        productsContainer.append(productDiv);
    });
}

loadCategories()
loadProducts()
displayProducts();