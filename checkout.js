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
// DOM ELEMENTS
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
// FORMAT PRICE
// ========================================

function formatPrice(price) {

    return "Rs." + Number(price).toLocaleString("en-PK");

}


// ========================================
// DISPLAY CART PRODUCTS
// ========================================

function displayCheckoutItems() {

    if (!checkoutItems) {
        return;
    }

    checkoutItems.innerHTML = "";


    // EMPTY CART
    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-checkout">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Please add products before checkout.
                </p>

            </div>

        `;

        if (checkoutForm) {
            checkoutForm.style.opacity = "0.5";
            checkoutForm.style.pointerEvents = "none";
        }

        return;
    }


    // PRODUCTS

    cart.forEach(item => {

        const itemTotal =
            Number(item.price) * Number(item.qty);


        const itemElement =
            document.createElement("div");


        itemElement.className =
            "checkout-item";


        itemElement.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="checkout-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Rs.${Number(item.price).toLocaleString("en-PK")}
                    ×
                    ${item.qty}
                </p>

            </div>

            <div class="checkout-item-price">

                Rs.${itemTotal.toLocaleString("en-PK")}

            </div>

        `;


        checkoutItems.appendChild(itemElement);

    });

}


// ========================================
// CALCULATE TOTAL
// ========================================

function calculateTotal() {

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) * Number(item.qty);

    });


    if (checkoutSubtotal) {

        checkoutSubtotal.innerHTML =
            formatPrice(subtotal);

    }


    if (checkoutTotal) {

        checkoutTotal.innerHTML =
            formatPrice(subtotal);

    }


    return subtotal;

}


// ========================================
// CREATE WHATSAPP MESSAGE
// ========================================

function createWhatsAppMessage(
    name,
    phone,
    whatsapp,
    email,
    address,
    city,
    payment,
    total
) {

    let message =
        "🛍️ *NEW ORDER - THE NOOR ONLINE SHOPPING STORE*";


    message += "\n\n";


    message += "👤 *Customer Information*";


    message += "\n";

    message += "Name: " + name;


    message += "\n";

    message += "Phone: " + phone;


    message += "\n";

    message += "WhatsApp: " + whatsapp;


    if (email) {

        message += "\n";

        message += "Email: " + email;

    }


    message += "\n";

    message += "City: " + city;


    message += "\n";

    message += "Address: " + address;


    message += "\n\n";


    message += "🛒 *Order Details*";


    cart.forEach((item, index) => {

        const itemTotal =
            Number(item.price) * Number(item.qty);


        message += "\n";


        message +=
            (index + 1) +
            ". " +
            item.name;


        message +=
            " × " +
            item.qty;


        message +=
            " = Rs." +
            itemTotal.toLocaleString("en-PK");

    });


    message += "\n\n";


    message += "🚚 Shipping: FREE";


    message += "\n";


    message +=
        "💰 *Total: Rs." +
        total.toLocaleString("en-PK") +
        "*";


    message += "\n\n";


    message +=
        "💳 Payment Method: " +
        payment;


    message += "\n\n";


    message +=
        "Thank you for shopping with The Noor! 🌿";


    return message;

}


// ========================================
// FORM SUBMIT
// ========================================

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // CHECK CART

            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add a product first."
                );

                return;

            }


            // GET CUSTOMER DATA

            const nameElement =
                document.getElementById("customerName");

            const phoneElement =
                document.getElementById("customerPhone");

            const whatsappElement =
                document.getElementById("whatsappNumber");

            const emailElement =
                document.getElementById("customerEmail");

            const addressElement =
                document.getElementById("customerAddress");

            const cityElement =
                document.getElementById("customerCity");


            const name =
                nameElement ? nameElement.value.trim() : "";

            const phone =
                phoneElement ? phoneElement.value.trim() : "";

            const whatsapp =
                whatsappElement ? whatsappElement.value.trim() : "";

            const email =
                emailElement ? emailElement.value.trim() : "";

            const address =
                addressElement ? addressElement.value.trim() : "";

            const city =
                cityElement ? cityElement.value.trim() : "";


            // PAYMENT METHOD

            const paymentElement =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            const payment =
                paymentElement
                    ? paymentElement.value
                    : "Cash on Delivery";


            // ========================================
            // VALIDATION
            // ========================================

            if (
                !name ||
                !phone ||
                !whatsapp ||
                !address ||
                !city
            ) {

                alert(
                    "Please fill all required fields."
                );

                return;

            }


            // ========================================
            // CALCULATE TOTAL
            // ========================================

            const total =
                calculateTotal();


            // ========================================
            // CREATE WHATSAPP MESSAGE
            // ========================================

            const message =
                createWhatsAppMessage(
                    name,
                    phone,
                    whatsapp,
                    email,
                    address,
                    city,
                    payment,
                    total
                );


            // ========================================
            // ENCODE MESSAGE
            // ========================================

            const encodedMessage =
                encodeURIComponent(message);


            // ========================================
            // WHATSAPP URL
            // ========================================

            const whatsappURL =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


            // ========================================
            // OPEN WHATSAPP
            // ========================================

            window.open(
                whatsappURL,
                "_blank"
            );


            // ========================================
            // CLEAR CART
            // ========================================

            localStorage.removeItem("cart");


            // ========================================
            // RESET FORM
            // ========================================

            checkoutForm.reset();


            // ========================================
            // UPDATE CART COUNTER
            // ========================================

            document
                .querySelectorAll(
                    ".cart-count span, .cart span"
                )
                .forEach(counter => {

                    counter.innerHTML = "0";

                });


            // ========================================
            // UPDATE LOCAL CART
            // ========================================

            cart = [];

        }
    );

}


// ========================================
// INITIALIZE
// ========================================

displayCheckoutItems();

calculateTotal();


// ========================================
// CONSOLE
// ========================================

console.log(
    "%cThe Noor Checkout System",
    "color:#e5b73b;font-size:18px;font-weight:bold;"
);

console.log(
    "%cWhatsApp Order Number: +92 304 8045082",
    "color:#123d2c;font-size:14px;font-weight:bold;"
);
