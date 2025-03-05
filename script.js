// Khởi tạo XMLHttpRequest để lấy dữ liệu JSON
let http = new XMLHttpRequest();
http.open('GET', 'products.json', true);
http.send();

http.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
        let products = JSON.parse(this.responseText);

        // Hiển thị tất cả sản phẩm ban đầu
        displayProducts('all', products);

        // Xử lý bộ lọc khi thay đổi
        document.getElementById("categoryFilter").addEventListener("change", function () {
            displayProducts(this.value, products);
        });
    }
};

// Hàm hiển thị sản phẩm theo danh mục
// Hàm hiển thị sản phẩm theo danh mục
function displayProducts(category, products) {
    let container = document.querySelector(".product-container");
    
    // Giữ nguyên kích thước của container để tránh ảnh hưởng đến layout
    container.style.minHeight = "300px"; 

    container.innerHTML = ""; // Xóa dữ liệu cũ

    let filteredProducts = category === "all" ? products : products.filter(p => p.category === category);

    let content = ""; // Tạo biến chứa HTML trước khi cập nhật

    for (let item of filteredProducts) {
        content += `
            <div class="product">
                <img src="${item.image}" alt="${item.description}">
                <p class="title">${item.title}</p>
                <p class="description">${item.description}</p>
                <p class="price">
                    <span>${item.price}</span></span>
                </p>
            </div>
        `;
    }

    container.innerHTML = content; // Chỉ cập nhật nội dung một lần
}


// Hàm cuộn đến section có id tương ứng
function scrollToSection(id) {
    let section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// Xử lý sự kiện mở/đóng FAQ nếu có
document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});
