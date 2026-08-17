// ========================================
// THE NOOR ONLINE SHOPPING STORE
// CHECKOUT SYSTEM
// Developed by M.Khateeb Ejaz
// ========================================


// ========================================
// WHATSAPP NUMBER
// ========================================

const WHATSAPP_NUMBER = "923048045082";


// ========================================
// GET CART
// ========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ========================================
// ELEMENTS
// ========================================

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutSubtotal =
    document.getElementById("checkoutSubtotal");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutForm =
    document.getElementById("checkoutForm");


// ========================================
// UPDATE CART COUNTER
// ========================================

function updateCheckoutCartCounter() {

    let total = 0;

    cart.forEach(item => {

        total += Number(item.qty) || 0;

    });


    document
        .querySelectorAll(".cart-count span, .cart span")
        .forEach(counter => {

            counter.textContent = total;

        });

}


// ========================================
// FORMAT PRICE
// ========================================

function formatPrice(price) {

    return "Rs." + Number(price).toLocaleString("en-PK");

}


// ========================================
// DISPLAY CART
// ========================================

function displayCheckoutCart() {

    if (!checkoutItems) {
        return;
    }


    checkoutItems.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-checkout">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>Please add products before checkout.</p>

                <a href="products.html">
                    Shop Products
                </a>

            </div>

        `;


        checkoutSubtotal.textContent = "Rs.0";

        checkoutTotal.textContent = "Rs.0";

        return;

    }


    let subtotal = 0;


    cart.forEach(item => {

        const price =
            Number(item.price) || 0;

        const qty =
            Number(item.qty) || 1;

        const itemTotal =
            price * qty;


        subtotal += itemTotal;


        const div =
            document.createElement("div");


        div.className = "checkout-item";


        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="checkout-item-details">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    Qty: ${qty} × ${formatPrice(price)}
                </p>

            </div>

            <div class="checkout-item-price">

                ${formatPrice(itemTotal)}

            </div>

        `;


        checkoutItems.appendChild(div);

    });


    checkoutSubtotal.textContent =
        formatPrice(subtotal);


    checkoutTotal.textContent =
        formatPrice(subtotal);

}


// ========================================
// PLACE ORDER ON WHATSAPP
// ========================================

checkoutForm.addEventListener("submit", function(e) {

    e.preventDefault();


    // Check cart

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add products first."
        );

        window.location.href = "products.html";

        return;

    }


    // ====================================
    // CUSTOMER DETAILS
    // ====================================

    const customerName =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const note =
        document.getElementById("note").value.trim();


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    // ====================================
    // VALIDATION
    // ====================================

    if (
        !customerName ||
        !phone ||
        !city ||
        !address
    ) {

        alert(
            "Please fill all required fields."
        );

        return;

    }


    // ====================================
    // CALCULATE TOTAL
    // ====================================

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) *
            Number(item.qty);

    });


    const shipping = 0;

    const total = subtotal + shipping;


    // ====================================
    // ORDER MESSAGE
    // ====================================

    let message = "";

    message +=
        "🛒 *NEW ORDER — THE NOOR*\n";

    message +=
        "━━━━━━━━━━━━━━━━━━━━\n\n";


    // CUSTOMER

    message +=
        "👤 *CUSTOMER DETAILS*\n";

    message +=
        `Name: ${customerName}\n`;

    message +=
        `Phone: ${phone}\n`;

    message +=
        `City: ${city}\n`;

    message +=
        `Address: ${address}\n`;

    message +=
        `Payment: ${payment}\n`;


    if (note) {

        message +=
            `Note: ${note}\n`;

    }


    message +=
        "\n🛍️ *ORDER DETAILS*\n";

    message +=
        "━━━━━━━━━━━━━━━━━━━━\n";


    // PRODUCTS

    cart.forEach((item, index) => {

        const price =
            Number(item.price);

        const qty =
            Number(item.qty);

        const itemTotal =
            price * qty;


        message +=
            `\n${index + 1}. *${item.name}*\n`;

        message +=
            `   Qty: ${qty}\n`;

        message +=
            `   Price: ${formatPrice(price)}\n`;

        message +=
            `   Total: ${formatPrice(itemTotal)}\n`;

    });


    // TOTAL

    message +=
        "\n━━━━━━━━━━━━━━━━━━━━\n";

    message +=
        `💰 Subtotal: *${formatPrice(subtotal)}*\n`;

    message +=
        "🚚 Shipping: *FREE*\n";

    message +=
        `💵 TOTAL: *${formatPrice(total)}*\n`;


    message +=
        "\n━━━━━━━━━━━━━━━━━━━━\n";

    message +=
        "Thank you for shopping with\n";

    message +=
        "*The Noor Online Shopping Store*";


    // ====================================
    // WHATSAPP URL
    // ====================================

    const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);


    // ====================================
    // OPEN WHATSAPP
    // ====================================

    window.open(
        whatsappURL,
        "_blank"
    );

});
