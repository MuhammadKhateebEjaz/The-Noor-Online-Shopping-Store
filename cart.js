document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // GET CART FROM LOCAL STORAGE
    // ===============================

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    // ===============================
    // ELEMENTS
    // ===============================

    const cartItems = document.querySelector(".cart-items");
    const subtotal = document.getElementById("subtotal");
    const total = document.getElementById("total");


    // ===============================
    // CHECK ELEMENTS
    // ===============================

    if (!cartItems || !subtotal || !total) {

        console.error("Cart HTML elements are missing.");

        return;

    }


    // ===============================
    // DISPLAY CART
    // ===============================

    function displayCart() {

        cartItems.innerHTML = "";

        let totalAmount = 0;


        // EMPTY CART

        if (cart.length === 0) {

            cartItems.innerHTML = `
            
                <div class="empty-cart">

                    <i class="fa-solid fa-cart-shopping"></i>

                    <h2>Your Cart is Empty</h2>

                    <p>Add some products to your cart.</p>

                    <a href="products.html">
                        Continue Shopping
                    </a>

                </div>

            `;

            subtotal.textContent = "Rs.0";
            total.textContent = "Rs.0";

            updateCartCounter();

            return;

        }


        // ===============================
        // SHOW PRODUCTS
        // ===============================

        cart.forEach(function (item, index) {

            const price = Number(item.price);
            const quantity = Number(item.qty);

            totalAmount += price * quantity;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <img 
                        src="${item.image}" 
                        alt="${item.name}"
                    >

                    <div class="details">

                        <h3>${item.name}</h3>

                        <p>Rs.${price}</p>

                    </div>


                    <div class="quantity">

                        <button 
                            onclick="decreaseQty(${index})">
                            −
                        </button>

                        <span>
                            ${quantity}
                        </span>

                        <button 
                            onclick="increaseQty(${index})">
                            +
                        </button>

                    </div>


                    <strong class="item-total">

                        Rs.${price * quantity}

                    </strong>


                    <button 
                        class="remove"
                        onclick="removeCart(${index})"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            `;

        });


        // ===============================
        // UPDATE TOTAL
        // ===============================

        subtotal.textContent = "Rs." + totalAmount;

        total.textContent = "Rs." + totalAmount;


        updateCartCounter();

    }


    // ===============================
    // INCREASE QUANTITY
    // ===============================

    window.increaseQty = function (index) {

        cart[index].qty++;

        saveCart();

    };


    // ===============================
    // DECREASE QUANTITY
    // ===============================

    window.decreaseQty = function (index) {

        if (cart[index].qty > 1) {

            cart[index].qty--;

        } else {

            cart.splice(index, 1);

        }

        saveCart();

    };


    // ===============================
    // REMOVE PRODUCT
    // ===============================

    window.removeCart = function (index) {

        cart.splice(index, 1);

        saveCart();

    };


    // ===============================
    // SAVE CART
    // ===============================

    function saveCart() {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        displayCart();

    }


    // ===============================
    // CART COUNTER
    // ===============================

    function updateCartCounter() {

        const count = cart.reduce(
            function (total, item) {

                return total + Number(item.qty);

            },
            0
        );


        document
            .querySelectorAll(".cart span, .cart-count span")
            .forEach(function (counter) {

                counter.textContent = count;

            });

    }


    // ===============================
    // START
    // ===============================

    displayCart();

});
