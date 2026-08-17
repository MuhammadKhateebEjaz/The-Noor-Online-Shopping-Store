document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // CART ELEMENTS
    // ========================================

    const cartItems = document.querySelector(".cart-items");
    const subtotal = document.getElementById("subtotal");
    const total = document.getElementById("total");


    // ========================================
    // IF NOT CART PAGE, STOP
    // ========================================

    if (!cartItems || !subtotal || !total) {
        return;
    }


    // ========================================
    // GET CART
    // ========================================

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    // ========================================
    // DISPLAY CART
    // ========================================

    function displayCart() {

        cartItems.innerHTML = "";

        let sum = 0;


        // EMPTY CART
        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <i class="fa-solid fa-cart-shopping"></i>

                    <h2>Your Cart is Empty</h2>

                    <p>
                        You haven't added any products yet.
                    </p>

                    <a href="products.html">
                        Continue Shopping
                    </a>

                </div>

            `;

            subtotal.textContent = "Rs.0";
            total.textContent = "Rs.0";

            updateCartCount();

            return;
        }


        // ========================================
        // PRODUCTS
        // ========================================

        cart.forEach(function (item, index) {

            const price = Number(item.price) || 0;
            const qty = Number(item.qty) || 1;

            sum += price * qty;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >


                    <div class="details">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            Rs.${price}
                        </p>

                    </div>


                    <div class="quantity">

                        <button
                            type="button"
                            onclick="decreaseQty(${index})">
                            −
                        </button>

                        <span>
                            ${qty}
                        </span>

                        <button
                            type="button"
                            onclick="increaseQty(${index})">
                            +
                        </button>

                    </div>


                    <strong class="item-total">

                        Rs.${price * qty}

                    </strong>


                    <button
                        type="button"
                        class="remove"
                        onclick="removeCart(${index})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            `;

        });


        // ========================================
        // TOTAL
        // ========================================

        subtotal.textContent = "Rs." + sum;

        total.textContent = "Rs." + sum;


        updateCartCount();

    }


    // ========================================
    // INCREASE
    // ========================================

    window.increaseQty = function (index) {

        cart[index].qty =
            Number(cart[index].qty) + 1;

        saveCart();

    };


    // ========================================
    // DECREASE
    // ========================================

    window.decreaseQty = function (index) {

        const qty = Number(cart[index].qty);


        if (qty > 1) {

            cart[index].qty = qty - 1;

        } else {

            cart.splice(index, 1);

        }


        saveCart();

    };


    // ========================================
    // REMOVE
    // ========================================

    window.removeCart = function (index) {

        cart.splice(index, 1);

        saveCart();

    };


    // ========================================
    // SAVE
    // ========================================

    function saveCart() {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        displayCart();

    }


    // ========================================
    // CART COUNT
    // ========================================

    function updateCartCount() {

        const count = cart.reduce(
            function (sum, item) {

                return sum + Number(item.qty || 1);

            },
            0
        );


        const counters =
            document.querySelectorAll(
                ".cart-count span, .cart span"
            );


        counters.forEach(function (counter) {

            counter.textContent = count;

        });

    }


    // ========================================
    // START
    // ========================================

    displayCart();

});
