let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.querySelector(".cart-items");

const subtotal = document.getElementById("subtotal");

const total = document.getElementById("total");


function showCart(){

    cartItems.innerHTML = "";

    let amount = 0;


    cart.forEach((item,index)=>{


        amount += item.price * item.qty;


        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">


            <div class="details">

                <h3>${item.name}</h3>

                <p>Rs.${item.price}</p>

            </div>


            <input type="number"
            value="${item.qty}"
            min="1"
            onchange="changeQty(${index},this.value)">



            <button onclick="removeCart(${index})">

            🗑

            </button>


        </div>

        `;


    });


    subtotal.innerHTML="Rs."+amount;

    total.innerHTML="Rs."+amount;


}


function changeQty(index,value){

    cart[index].qty = Number(value);

    localStorage.setItem("cart",JSON.stringify(cart));

    showCart();

}



function removeCart(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    showCart();

}


showCart();
