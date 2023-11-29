const addedItemsColumn = document.querySelector(".added-item-column");

let dataAddedItemFromLocalStorage = JSON.parse(localStorage.getItem("addedItemtoStorage"));

dataAddedItemFromLocalStorage.forEach(function (item) {
    if (item.itemCartValue == "added") {

        let cartItem, cartItemImgSrc, cartItemImgAlt, cartItemTitle, cartItemPrice, cartItemQuantity, cartItemLink, cartItemNumber;

        cartItem = document.createElement("div");
        cartItem.classList.add("cart-list-item");
        addedItemsColumn.appendChild(cartItem);

        cartItem.innerHTML = `
            <div class="cart-item-info">
            <img src="#" alt="" class="cart-list-item-img">
            <div class="cart-item-details">
                <p class="cart-item-name"></p>
                <p class="cart-item-price">Price: <span
                        class="cart-item-price--number"></span></p>
                <p class="cart-item-amount">Amount: <span class="cart-item-amount--number"></span>
                </p>
            </div> <!-- /cart-item-details -->
            </div> <!-- /cart-item-->
            <div class="cart-btn-wrapper">
            <a href="#" class="cart-btn edit-cart-btn" target="_blank">Edit</a>
            <button class="cart-btn delete-cart-btn">Delete</button>
            </div>
            </div> <!-- /cart-list-item-->`

        cartItemImgSrc = cartItem.querySelector(".cart-list-item-img");
        cartItemImgAlt = cartItem.querySelector(".cart-list-item-img").getAttribute("alt");
        cartItemTitle = cartItem.querySelector(".cart-item-name");
        cartItemPrice = cartItem.querySelector(".cart-item-price--number");
        cartItemQuantity = cartItem.querySelector(".cart-item-amount--number");
        cartItemLink = cartItem.querySelector(".edit-cart-btn");
        cartItemNumber = item.itemNumber;

        cartItemImgSrc.setAttribute("src", item.itemImg);
        cartItemTitle.innerText = item.itemTitle;
        cartItemPrice.innerText = item.itemPrice;
        cartItemQuantity.innerText = item.itemQuantityCount;
        cartItemLink.setAttribute("href", item.itemLink);
        cartItem.setAttribute("data-number", cartItemNumber);
    }
})


/* changing numbers in the header */
/* upload number in cart from localStorage */
/*
const cartNumber = document.querySelector(".cart-number");
const cartNumberAmount = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber")));
cartNumber.innerText = cartNumberAmount;

const quoteNumber = document.querySelector(".quote-number");
const quoteNumberAmount = parseInt(JSON.parse(localStorage.getItem("requestItemNumber")));
quoteNumber.innerText = quoteNumberAmount;
*/
/* listening click on delete btn */

//const cartPage = document.querySelector(".section-cart");
const cartForm = document.querySelector(".cart-form");
const cartItems = document.querySelectorAll(".cart-list-item")


cartForm.addEventListener("click", deletingItemFromCart);

function deletingItemFromCart(e) {
    e.preventDefault();

    const cartDeleteBtn = e.target.closest(".delete-cart-btn");
    if (cartDeleteBtn) {
        const cartDeleteItem = e.target.closest(".cart-list-item");
        const cartDeleteItemAmount = cartDeleteItem.querySelector(".cart-item-amount--number").innerText;

        let cartDeleteItemNumber = parseInt(cartDeleteItem.dataset.number);

        if (cartDeleteBtn == e.target) {

            cartDeleteItem.style.display = "none";
            cartNumber.innerText = cartNumber.innerText - cartDeleteItemAmount;
            cartNumberAmount = cartNumber.innerText;

            for (i = 0; i < dataAddedItemFromLocalStorage.length; i++) {
                if (cartDeleteItemNumber == dataAddedItemFromLocalStorage[i].itemNumber) {
                    dataAddedItemFromLocalStorage.splice([i], 1);
                }
            }

            let addedItemtoStorageJSON = JSON.stringify(dataAddedItemFromLocalStorage);
            localStorage.setItem("addedItemtoStorage", addedItemtoStorageJSON);
            dataAddedItemFromLocalStorage = JSON.parse(localStorage.getItem("addedItemtoStorage"));

            let cartNumberAmountJSON = JSON.stringify(cartNumberAmount);
            localStorage.setItem("addedItemCartNumber", cartNumberAmountJSON);
            cartNumberAmount = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber")));
        }

        if (cartNumberAmount == 0) {
            cartNumber.innerText = "";
            localStorage.removeItem("addedItemCartNumber");
            localStorage.removeItem("addedItemtoStorage");
        }
    }
}

/* submit btn */

cartForm.addEventListener("click", collectCartData);

function collectCartData(e) {
    const submitBtn = document.querySelector(".submit-btn");

    //e.preventDefault()
    if (e.target == submitBtn) {
        let cartRequest = {
            cartItems: dataAddedItemFromLocalStorage
        }
        /* clear the form and localStorage after submiting the form  */
        localStorage.removeItem("addedItemCartNumber");
        localStorage.removeItem("addedItemtoStorage");
        cartNumber.innerText = "";
        addedItemsColumn.remove()
    }
}
