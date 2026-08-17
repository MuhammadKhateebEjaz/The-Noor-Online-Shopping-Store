// ===============================
// THE NOOR ONLINE SHOPPING STORE
// Developed by M.Khateeb Ejaz
// ===============================


// ========================================
// STICKY NAVBAR
// ========================================

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.background = "#0f3527";
        header.style.boxShadow =
            "0 10px 25px rgba(0,0,0,.15)";

    } else {

        header.style.background = "#123d2c";
        header.style.boxShadow =
            "0 5px 15px rgba(0,0,0,.10)";
    }

});


// ========================================
// ACTIVE NAVIGATION
// ========================================

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".menu a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        link.classList.add("active");

    }

});


// ========================================
// MOBILE MENU
// ========================================

const menuToggle =
    document.getElementById("menuToggle");

const mainMenu =
    document.getElementById("mainMenu");

if (menuToggle && mainMenu) {

    menuToggle.addEventListener("click", function () {

        mainMenu.classList.toggle("active");

        const icon =
            menuToggle.querySelector("i");

        if (icon) {

            if (mainMenu.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

                menuToggle.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        }

    });


    // Close menu after clicking a link

    mainMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function () {

            mainMenu.classList.remove("active");

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}


// ========================================
// REAL ADD TO CART
// ========================================

const buttons =
    document.querySelectorAll(".add-cart");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".product-card");

        if (!card) return;

        const product = {

            id: card.dataset.id,

            name: card.dataset.name,

            price: Number(card.dataset.price),

            image: card.dataset.image,

            qty: 1

        };

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const existing =
            cart.find(item => item.id === product.id);

        if (existing) {

            existing.qty++;

        } else {

            cart.push(product);

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        updateCartCounter();


        // Button feedback

        button.innerHTML = "✓ Added";

        button.style.background = "#28a745";

        setTimeout(() => {

            button.innerHTML = "Add To Cart";

            button.style.background = "#123d2c";

        }, 1000);

    });

});


// ========================================
// UPDATE CART COUNTER
// ========================================

function updateCartCounter() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += Number(item.qty) || 0;

    });

    document
        .querySelectorAll(".cart span, .cart-count span")
        .forEach(counter => {

            counter.textContent = total;

        });

}

updateCartCounter();


// ========================================
// CONTACT FORM VALIDATION
// ========================================

const form =
    document.querySelector("form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const inputs =
            form.querySelectorAll("input, textarea");

        let valid = true;

        inputs.forEach(input => {

            if (input.value.trim() === "") {

                valid = false;

                input.style.border =
                    "2px solid red";

            } else {

                input.style.border =
                    "2px solid #1d5d43";

            }

        });

        if (valid) {

            alert(
                "✅ Thank you! Your message has been sent."
            );

            form.reset();

        }

    });

}


// ========================================
// FADE ANIMATION
// ========================================

const animatedItems =
    document.querySelectorAll(
        ".card,.product-card,.benefit,.info-box"
    );

if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        });


    animatedItems.forEach(item => {

        item.style.opacity = "0";

        item.style.transform =
            "translateY(50px)";

        item.style.transition =
            ".8s";

        observer.observe(item);

    });

} else {

    animatedItems.forEach(item => {

        item.style.opacity = "1";

    });

}


// ========================================
// BACK TO TOP BUTTON
// ========================================

const topBtn =
    document.createElement("button");

topBtn.innerHTML = "↑";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.bottom = "30px";
topBtn.style.right = "30px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#123d2c";
topBtn.style.color = "#fff";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "9999";
topBtn.style.boxShadow =
    "0 10px 20px rgba(0,0,0,.2)";


window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});


topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ========================================
// CONSOLE MESSAGE
// ========================================

console.log(
    "%cThe Noor Online Shopping Store",
    "color:#e5b73b;font-size:20px;font-weight:bold;"
);

console.log(
    "%cDesigned & Developed by M.Khateeb Ejaz",
    "color:#123d2c;font-size:15px;"
);
