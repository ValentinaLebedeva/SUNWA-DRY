/* LOCAL STORAGE upload number in cart and qoute from localStorage */
/*
const cartNumber = document.querySelector(".cart-number");
let cartNumberAmount = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber"))) || 0;
cartNumber.innerText = cartNumberAmount || "";

const quoteNumber = document.querySelector(".quote-number");
let quoteNumberAmount = parseInt(JSON.parse(localStorage.getItem("requestItemNumber"))) || 0;
quoteNumber.innerText = quoteNumberAmount || "";
*/

// PRODUCTS.HTML 
/* getting quantity/clicks from local storage and display in cart in the header */

/* add and request change number in the header by click and storage in localStorage */

const addToCartBtnAll = document.querySelectorAll('[data-item=add-item]');
const requestBtnAll = document.querySelectorAll('[data-item=request-item]');
const productsColumn = document.querySelector(".products-column");

if (addToCartBtnAll) {
    addToCartBtnAll.forEach(function (item) {
        let addedItemsNewQ;

        item.addEventListener("click", function (e) {

            //e.preventDefault();
            this.closest(".products-item").setAttribute("data-cart", "added");

            addedItemsNewQ = cartNumberAmount || 0;
            addedItemsNewQ = ++cartNumberAmount;
            cartNumber.innerText = addedItemsNewQ;

            let addedItemsNewQJSON = JSON.stringify(addedItemsNewQ)
            localStorage.setItem("addedItemCartNumber", addedItemsNewQJSON);
            cartNumber.innerText = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber")));
        })
    })
}

if (requestBtnAll) {
    requestBtnAll.forEach(function (item) {

        let requestItemsQ;
        item.addEventListener("click", function (e) {
            e.preventDefault();

            this.closest(".products-item").setAttribute("data-cart", "requested");

            requestItemsQ = quoteNumberAmount || 0;
            requestItemsQ = ++quoteNumberAmount;
            quoteNumber.innerText = requestItemsQ;

            let requestItemsQJSON = JSON.stringify(requestItemsQ);
            localStorage.setItem("requestItemNumber", requestItemsQJSON);
            quoteNumber.innerText = parseInt(JSON.parse(localStorage.getItem("requestItemNumber")));
        })
    })
}


/* PRODUCTS.HTML Additing items to localStorage */
if (productsColumn) {
    productsColumn.addEventListener("click", addItemLocalStorage);

    function addItemLocalStorage(e) {
        //e.preventDefault();

        let brandName, itemTitle, itemPrice, itemImg, addedItemInfo, itemNumber, itemQuantity, itemQuantityCount;

        if (e.target.closest(".products-item")) {
            const chosenItem = e.target.closest(".products-item");
            brandName = chosenItem.dataset.brand;
            itemTitle = chosenItem.querySelector(".product-title").innerText;
            itemPrice = parseInt(chosenItem.querySelector(".product-price").innerText.replace(/,/g, ""));
            itemImg = chosenItem.querySelector(".product-img").getAttribute("src");
            itemCartValue = chosenItem.dataset.cart;
            itemNumber = parseInt(chosenItem.dataset.number);
            itemQuantity = parseInt(chosenItem.dataset.quantity);
            itemLink = chosenItem.querySelector(".product-item-link").getAttribute("href");

            addedItemInfo = {
                brandName: brandName,
                itemTitle: itemTitle,
                itemPrice: itemPrice,
                itemImg: itemImg,
                itemCartValue: itemCartValue,
                itemNumber: itemNumber,
                itemQuantityCount: itemQuantity,
                itemLink: itemLink
            }

            if (itemCartValue == "added") {
                addedDataItem.push(addedItemInfo);
            } else {
                dataRequestedItem.push(addedItemInfo)

            }

            /* ADDED ITEM TO LOCAL STORAGE */

            /* if the item already added to local storage then need to add 'data-quantity' with meaning +1 */

            for (i = 0; i < addedDataItem.length; i++) {

                if (addedDataItem[i].itemNumber === addedItemInfo.itemNumber) {
                    addedDataItem[i].itemQuantityCount++;

                    if (addedDataItem[i].itemQuantityCount > addedItemInfo.itemQuantityCount) {
                        addedDataItem.pop(addedItemInfo)
                    }
                }
            }

            for (i = 0; i < addedDataItem.length; i++) {
                if (addedDataItem[i].itemNumber === addedItemInfo.itemNumber) {
                    addedDataItem[i].itemPrice = addedItemInfo.itemPrice;
                }
                if (addedDataItem[i].itemPrice === addedItemInfo.itemPrice && addedDataItem[i].itemQuantityCount > addedItemInfo.itemQuantityCount) {
                    addedDataItem[i].itemPrice = addedDataItem[i].itemPrice * addedDataItem[i].itemQuantityCount;
                }
            }

            addedDataItemJSON = JSON.stringify(addedDataItem)
            localStorage.setItem("addedItemtoStorage", addedDataItemJSON);
            dataAddedItemFromLocalStorage = JSON.parse(localStorage.getItem("addedItemtoStorage"));

            /* REQUESTED ITEM TO LOCAL STORAGE */
            /* if the item already added to local storage then need to add 'data-quantity' with meaning +1 */

            for (i = 0; i < dataRequestedItem.length; i++) {

                if (dataRequestedItem[i].itemNumber === addedItemInfo.itemNumber) {
                    dataRequestedItem[i].itemQuantityCount++;

                    if (dataRequestedItem[i].itemQuantityCount > addedItemInfo.itemQuantityCount) {
                        dataRequestedItem.pop(addedItemInfo)
                    }
                }
            }

            for (i = 0; i < dataRequestedItem.length; i++) {
                if (dataRequestedItem[i].itemNumber === addedItemInfo.itemNumber) {
                    dataRequestedItem[i].itemPrice = addedItemInfo.itemPrice;
                }
                if (dataRequestedItem[i].itemPrice === addedItemInfo.itemPrice && dataRequestedItem[i].itemQuantityCount > addedItemInfo.itemQuantityCount) {
                    // console.log(data.splice(i, 1))
                    dataRequestedItem[i].itemPrice = dataRequestedItem[i].itemPrice * dataRequestedItem[i].itemQuantityCount;
                    //data.pop(addedItemInfo)
                }
            }

            dataRequestedItemJSON = JSON.stringify(dataRequestedItem)
            localStorage.setItem("requestedItemtoStorage", dataRequestedItemJSON);
            dataRequestedItemFromLocalStorage = JSON.parse(localStorage.getItem("requestedItemtoStorage"));
        }


    };
}

/* ITEM.HTML */

/* add to the cart btn */
/* adding item to localStorage */

const addToCartBtn = document.querySelector(".add-cart-btn");

addToCartBtn.addEventListener("click", addToCart);

function addToCart() {

    addedItemInfo = addedItemInfoPage
    addedItemInfo.itemQuantityCount = itemAmountValue;


    /* checking if item was already added then changing the amount in local Storage */
    if (addedDataItem.length != 0) {
        for (let item in addedDataItem) {
            if (addedDataItem[item].itemNumber == addedItemInfo.itemNumber) {
                addedDataItem[item].itemQuantityCount = addedDataItem[item].itemQuantityCount + addedItemInfo.itemQuantityCount;
            }
        }
    } else {
        addedDataItem.push(addedItemInfo);
    }

    addedDataItemJSON = JSON.stringify(addedDataItem)
    localStorage.setItem("addedItemtoStorage", addedDataItemJSON);
    dataAddedItemFromLocalStorage = JSON.parse(localStorage.getItem("addedItemtoStorage"));

    /* changing number in the cart header */

    cartNumberAmount = cartNumberAmount + addedItemInfo.itemQuantityCount;
    cartNumber.innerText = cartNumberAmount;

    cartNumberAmountJSON = JSON.stringify(cartNumberAmount);

    localStorage.setItem("addedItemCartNumber", cartNumberAmountJSON);
    cartNumberAmount = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber")));
}

/* buy now btn */
const buyNowBtn = document.querySelector(".buy-btn");

buyNowBtn.addEventListener("click", buyNowFn);

function buyNowFn() {
    addToCart();
    window.open("cart.html", "_blank")
}
