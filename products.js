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
        .then(data => displayProducts(data, "products-container"))
}

// Load Products by category
const loadProductsByCategory = (category) => {
    const url = `https://fakestoreapi.com/products/category/${category}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayProducts(data, "products-container"));
}

// Trending Products
const trendingProduct = () => {
    const url = `https://fakestoreapi.com/products`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const trending = [...data]
                .sort((a, b) => b.rating.rate - a.rating.rate)
                .slice(0, 3);
            displayProducts(trending, "trending-container")
        })
}



// Category Display
const displayCategory = (categories) => {

    categories.unshift("All")

    const btnContainer = document.getElementById("btn-container");

    for (const [index, category] of categories.entries()) {
        const btnDiv = document.createElement("div");

        btnDiv.innerHTML = `
        <button class="category-btn btn ${index === 0 ? "btn-primary" : "btn-soft btn-primary"}   rounded-full">${category}</button>
        `
        btnContainer.append(btnDiv)
    }

    btnContainer.addEventListener("click", function (e) {

        const clickedBtn = e.target.closest(".category-btn");

        if (!clickedBtn) return;

        document.querySelectorAll(".category-btn").forEach(btn => btn.classList.add("btn-soft"))

        clickedBtn.classList.remove("btn-soft");

        const category = clickedBtn.innerText;

        category === "All" ? loadProducts() : loadProductsByCategory(category)

    });

}

// Modal Open
const modal = document.getElementById("my_modal_5")
document.addEventListener('click', function (e) {

    const btn = e.target.closest(".detail-btn")
    if (!btn) return;

    const img = btn.dataset.image
    const category = btn.dataset.category
    const rating = btn.dataset.rating
    const count = btn.dataset.count
    const title = btn.dataset.title
    const description = btn.dataset.description;


    console.log(count, title, description)

    modal.showModal();

    document.getElementById("modal-img").src = img;
    document.getElementById("modal-category").innerText = category;
    document.getElementById("modal-rating").innerText = rating;
    document.getElementById("modal-product-count").innerText = `(${count})`;
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-description").innerText = description;

})


// All Products Display
const displayProducts = (products, containerId) => {
    const productsContainer = document.getElementById(containerId)

    productsContainer.innerHTML = "";

    products.forEach((product) => {
        const productDiv = document.createElement("div");

        productDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm h-96">
        <figure class="bg-gray-400/15">
        <img class="w-36 h-40 py-4" src="${product.image}" />
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
                <button class="btn btn-ghost flex-grow detail-btn"
                data-image = "${product.image}"
                data-category = "${product.category}"
                data-rating = "${product.rating.rate}"
                data-count = "${product.rating.count}"
                data-title = "${product.title}"
                data-description = "${product.description}"
                ><i class="fa-regular fa-eye"
                ></i>Details</button>
                <button class="btn btn-primary flex-grow" ><i class="fa-solid fa-cart-plus"></i>Add</button>
                </div>
                
                </div>
                </div>
                
                `

        productsContainer.append(productDiv);
    });
}

loadCategories()
loadProducts()
trendingProduct()