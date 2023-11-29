/* declaration variables */
const searchForm = document.querySelector(".search");
const searchBtn = document.querySelector(".search__button");

const mobileNavBtn = document.querySelector('.mobile-nav-icon');

const categoryBtn = document.querySelector(".category");
const langBtn = document.querySelector(".language");
const subscribeBtn = document.querySelector(".subscribe_btn");
const newsRow = document.querySelector(".section-news-row");
const newsItems = document.querySelectorAll(".news-item");
const tabColumn = document.querySelector("[data-column=column]");

const inquiryForm = document.querySelector(".inquiry-form");
let inputName = document.querySelector("#name");
let formItems = document.querySelectorAll(".form-item");

let inputItems = document.querySelectorAll(".input-item");

const requestItemsColumn = document.querySelector(".request-item-column");

const productCategory = document.querySelectorAll(".category-item");
const productCategoryAll = document.querySelectorAll(".category-item");

const productItems = document.querySelectorAll(".products-item");

const productRow = document.querySelector("[data-target=productRow]");
const productSlider = document.querySelector("[data-slider=slider");
const productItemsLinks = document.querySelectorAll(".product-item-link");
//const productItemsData = document.querySelectorAll("[data-product=item]");
const productItem = document.querySelector("[data-product=item]");
const productRowAll = document.querySelectorAll("[data-target=productRow]");

const tabEvents = document.querySelectorAll("[data-link=eventLink]");

/* item.html*/
const itemColumn = document.querySelector(".item-column");



/* LOCAL STORAGE */
let dataAddedItemFromLocalStorage = JSON.parse(localStorage.getItem("addedItemtoStorage"));
let addedDataItem = dataAddedItemFromLocalStorage || [];

let dataRequestedItemFromLocalStorage = JSON.parse(localStorage.getItem("requestedItemtoStorage"));
let dataRequestedItem = dataRequestedItemFromLocalStorage || [];

/* LOCAL STORAGE upload number in cart and qoute from localStorage */

const cartNumber = document.querySelector(".cart-number");
let cartNumberAmount = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber"))) || 0;
cartNumber.innerText = cartNumberAmount || "";

const quoteNumber = document.querySelector(".quote-number");
let quoteNumberAmount = parseInt(JSON.parse(localStorage.getItem("requestItemNumber"))) || 0;
quoteNumber.innerText = quoteNumberAmount || "";


/* opening new tab on click links */

const links = document.querySelectorAll("a");
links.forEach(function (item) {
    item.setAttribute(
        "target",
        "_blank");
});

/* search within website input */

/* the look of search btn */

searchBtn.addEventListener("click", openSearchInput);

function openSearchInput(e) {
    e.preventDefault();
    if (!searchForm.classList.contains("search--visible")) {
        searchForm.classList.add("search--visible");
    } else {
        searchForm.classList.remove("search--visible");
    }
};

/* mobile menu */

mobileNavBtn.addEventListener("click", openMenu);

function openMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    mobileNav.classList.toggle("mobile-nav--active");
    mobileNavBtn.classList.toggle("mobile-nav-icon-close");
}

/* pop up menu */

categoryBtn.addEventListener("click", openCategoryMenu);

function openCategoryMenu(e) {
    e.preventDefault();
    const popUpMenu = document.querySelector(".category-popup-menu");
    popUpMenu.classList.toggle("category-popup-menu--active");
}

/* language */

langBtn.addEventListener("click", chooseLangBtn);

function chooseLangBtn() {
    const dropDownMenu = document.querySelector(".drop-down-menu-list");
    const langItems = document.querySelectorAll(".lang-item");
    const currentLang = document.querySelector(".current-lang");

    dropDownMenu.classList.toggle("drop-down-menu-list--active");
    for (i = 0; i < langItems.length; i++) {
        langItems[i].addEventListener("click", function () {
            currentLang.innerHTML = this.innerHTML;
        });
    };
};

/* email validation */

function validateEmail(email) {
    const emailLowCase = email.toLowerCase();
    const pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    return pattern.test(emailLowCase);
}

/* creating default message if subscribe email is invalid */

subscribeBtn.addEventListener("click", subscribeEmail);

function subscribeEmail(e) {
    e.preventDefault();

    const inputSubscribe = document.querySelector(".input-subscribe");

    if (!validateEmail(inputSubscribe.value)) {
        inputSubscribe.value = "Please write your email";
        inputSubscribe.classList.add("input-subscribe--active")
    } else {
        inputSubscribe.value = "";
    }
}

/* opening news links index.html news.html */

if (newsRow) {
    const newsItemLinks = document.querySelectorAll(".news-item-link");

    newsRow.addEventListener("click", openNews);

    function openNews() {
        for (i = 0; i < newsItemLinks.length; i++) {
            newsItemLinks[i].setAttribute("href", `events${i}.html`);
        }
    };
}

/* article style on hover index.html news.html  */

for (i = 0; i < newsItems.length; i++) {
    let itemText = newsItems[i].querySelector(".news-item-text");
    newsItems[i].addEventListener("mouseover", function () {
        itemText.classList.add("news-item-text-active");
    })
}

newsItems.forEach(function (item) {
    const itemText = item.querySelector(".news-item-text");
    const readBtn = item.querySelector(".read-more-btn");

    item.addEventListener("mouseover", function () {
        itemText.classList.add("news-item-text-active");
        if (readBtn) {
            readBtn.classList.add("read-more-btn--active");
        }
    })

    item.addEventListener("mouseout", function () {
        itemText.classList.remove("news-item-text-active");
        if (readBtn) {
            readBtn.classList.remove("read-more-btn--active");
        }
    })
})

/* contact.html, documents.html, news.html, about.html tabs */

if (tabColumn) {
    const tabButtons = document.querySelectorAll("[data-link=link]");
    const columnItems = document.querySelectorAll(".column-item");
    const sectionTitle = document.querySelector(".news-section-title");

    tabButtons.forEach(function (currentBtn) {
        currentBtn.addEventListener("click", choseTab)
        function choseTab(e) {
            tabButtons.forEach(function (item) {
                item.classList.remove("tab-link-active")
                if (e.target.dataset.tab) {
                    e.target.classList.add("tab-link-active");
                }
            })

            /* filter documents by tab  */
            columnItems.forEach(function (item) {
                item.classList.remove("hidden")
                if (e.target.dataset.tab != item.dataset.tab) {
                    item.classList.add("hidden")
                }
            })

            /* chaning title depends on a chosen tab */
            if (e.target.classList.contains("tab-link-active") && sectionTitle) {
                sectionTitle.innerText = e.target.dataset.tab.toUpperCase();
            }
        }

    });
}
/*
if (tabColumn) {
    tabColumn.addEventListener("click", choseTab);
    const columnItems = document.querySelectorAll(".column-item");
    const tabButtons = document.querySelectorAll("[data-link=link]");
 
    function choseTab(e) {
        const sectionTitle = document.querySelector(".news-section-title");
 
        tabButtons.forEach(function (item) {
            item.classList.remove("tab-link-active");
        });
 
        if (e.target.dataset.tab) {
            e.target.classList.add("tab-link-active");
        }
        /* filter documents by tab 
        columnItems.forEach(function (item) {
            item.classList.remove("hidden")
            if (e.target.dataset.tab != item.dataset.tab) {
                item.classList.add("hidden")
            }
        })
        /* chaning title depends on a chosen tab 
        if (e.target.classList.contains("tab-link-active") && sectionTitle) {
            sectionTitle.innerText = e.target.dataset.tab.toUpperCase();
        }
    }
}
*/
/* contact.html, inquiry.html inquiry form information */


//* collecting data from inquiry form */

/* changing style for default popup message */

formItems.forEach(function (item) {
    let inputMessage = document.createElement("div");
    inputMessage.style.display = "none";
    item.append(inputMessage);
    return inputMessage;
})

inputItems.forEach(function (item) {

    if (item.hasAttribute("required")) {
        item.addEventListener("invalid", function (e) {
            e.preventDefault();

            if (!e.target.validity.valid) {
                inputMessage = item.nextElementSibling;
                inputMessage.className = "input-error";
                inputMessage.style.display = "block";

                if (item.classList.contains("input-name")) {
                    inputMessage.textContent = "Please write your full name";
                } else if (item.classList.contains("input-phone")) {
                    inputMessage.textContent = "Please write your phone";
                } else if (item.classList.contains("input-email")) {
                    inputMessage.textContent = "Please write your email";
                }
            }
        })
        item.addEventListener("input", function (e) {
            if ("block" === inputMessage.style.display) {
                item.classList.remove("invalid")
                inputMessage.style.display = "none"
            }
        })
    }
})

/* submiting the form */

if (inquiryForm) {

    inquiryForm.addEventListener("submit", collectInquiryData);

    function collectInquiryData(e) {
        e.preventDefault()
        //const requestItemsColumn = document.querySelector(".request-item-column");
        let inquiryRequest = {}
        /* checking if all required filed are filled */
        if (inquiryForm.checkValidity()) {
            /* creating form requiest if the form is filled */
            let inquiryName, inquiryPhone, inquiryEmail, inquiryCompany, inquiryItems;
            inquiryName = document.querySelector("#name").value;
            inquiryPhone = document.querySelector("#phone").value;
            inquiryEmail = document.querySelector("#form-email").value;
            inquiryCompany = document.querySelector("#company").value || null;


            inquiryRequest = {
                inquiryName: inquiryName,
                inquiryPhone: inquiryPhone,
                inquiryEmail: inquiryEmail,
                inquiryCompany: inquiryCompany,
            }
        }

        if (requestItemsColumn) {
            inquiryRequest.inquiryItems = dataRequestedItemFromLocalStorage || ""

            /* clear the form and localStorage after submiting the form */

            dataRequestedItemFromLocalStorage = localStorage.removeItem("requestedItemtoStorage");
            quoteNumberAmount = localStorage.removeItem("requestItemNumber");
            quoteNumber.innerText = "";
        }
        console.log(inquiryRequest)

        inquiryForm.reset()

    }
}

/* PRODUCTS.HTML */


/* filter by brand */

productCategory.forEach(function (selectedTab) {

    selectedTab.addEventListener("click", function () {
        const selectedCategory = selectedTab.getAttribute("data-category");
        //const selectedItems = Array.from(document.querySelectorAll(`[data-brand=${selectedCategory}]`));

        productCategory.forEach(function (item) {
            item.classList.remove("category-item--active");
        });
        selectedTab.classList.add("category-item--active");

        productItems.forEach(function (item) {
            if (selectedCategory !== item.dataset.brand) {
                item.classList.add("hidden")
            } else {
                item.classList.remove("hidden");
            }
        })

    })
})

/* search filter by brand name on product page */
if (productItems) {
    searchForm.addEventListener("keyup", searchItems);

    function searchItems(e) {

        // need to save all items in LocalStorage and do search within it
        const searchedText = e.target.value.toLowerCase();
        productItems.forEach(function (item) {
            const itemText = item.dataset.brand.toLowerCase();
            if (itemText.indexOf(searchedText) != -1) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        })
    }
}


/* moving item sliders by clicking */

function moveSlider() {
    const btnLeft = document.querySelector("[data-arrow=btnLeft]");
    const btnRight = document.querySelector("[data-arrow=btnRight]");

    const productSliderWidth = productSlider.offsetWidth;
    const itemStyle = productItem.currentStyle || window.getComputedStyle(productItem);
    const itemMarginRight = Number(itemStyle.marginRight.match(/\d+/g)[0]);
    // const itemWidth = Number(itemStyle.width.match(/\d+/g)[0]);

    const itemCount = productSlider.querySelectorAll("[data-product=item]").length;
    const itemWidthT = productSlider.querySelector("[data-product=item]").offsetWidth;

    let offset = 0;

    const check = Math.round(productSliderWidth / (itemWidthT + itemMarginRight)); // how many items in a row
    const maxX = -((itemCount / check) * productSliderWidth + (itemMarginRight * (itemCount / check)) - productSliderWidth - itemMarginRight);

    btnLeft.addEventListener("click", function () {
        if (offset !== 0) {
            offset += itemWidthT + itemMarginRight;

            productSlider.style.transform = `translateX(${offset}px)`;
        }
    });

    btnRight.addEventListener("click", function () {
        if (offset >= maxX) {
            offset -= itemWidthT + itemMarginRight;

            productSlider.style.transform = `translateX(${offset}px)`;
        }
    })
}

if (productSlider) {
    moveSlider()
}

/* PRODUCTS.HTML collecting items info */

/* opening item link on click */
if (productRowAll) {
    productRowAll.forEach(function (item) {

        for (i = 0; i < productItemsLinks.length; i++) {
            productItemsLinks[i].setAttribute(
                "href",
                `./item${i}.html`);
        };
    });
    /* assigning link by item nummber */

    productRowAll.forEach(function (item) {

        for (i = 0; i < productItems.length; i++) {
            productItems[i].setAttribute(
                "data-number",
                `${i}`);
        };
    });

    /* additing data-quantity attribute */

    productRowAll.forEach(function (item) {
        for (i = 0; i < productItems.length; i++) {
            productItems[i].setAttribute("data-quantity", 0)
        };
    });


    /* products.html hover on items */

    productItems.forEach(function (item) {
        let productHover = item.appendChild(document.createElement("div"));
        productHover.classList.add("product-item-hover");

        const selectedItem = item.querySelector(".product-price").innerText;

        /* additing HTML code for hover */

        if (selectedItem === "unlisted") {

            productHover.innerHTML = `
                <a href="#" class="product-item--add" data-item="request-item">
                <img src="./img/products/icons/request-icon.svg" alt="request">
                request a quote
            </a>
            <p class="product-item-storage">Storage: <span>29</span></p>
                `;
        } else {
            productHover.innerHTML = `
                <a href="#" class="product-item--add" data-item="add-item">
                    <img src="./img/products/icons/add-icon.svg" alt="add">
                    Add to cart
                </a>
                <p class="product-item-storage">Storage: <span>359</span></p>
                `;
        }

        /* creating cart and request btn outside the loop */

        /* mouse action */

        item.addEventListener("mouseenter", function () {
            productHover.style.display = "inline-block";
        })
        item.addEventListener("mouseleave", function () {
            productHover.style.display = "none";
        })
    })
}

/* ITEM.HTML */


let addedItemInfoPage, itemAmountValue;
let pickedImgSrc, itemProduct, imgInSlide, pickedItem, mainImgSrc;



if (itemColumn) {
    const itemAddImages = document.querySelectorAll(".item-add-img");
    const itemsRow = document.querySelector(".item-row-add-img");
    let mainImg = document.querySelector(".item-main-img");
    let itemInSlide = document.querySelector(".item-add");

    const wrapperItems = document.querySelector(".item-row--img");
    const itemAmount = document.querySelector(".item-number-input");

    itemAmountValue = parseInt(itemAmount.value);
    let totalAmountPriceText = document.querySelector(".total-amount-price");
    let totalAmountPrice = parseInt(totalAmountPriceText.innerText.replace(/,/g, ""));
    let itemPagePrice = parseInt(document.querySelector(".item-price--new-amount").innerText.replace(/,/g, ""));

    const downBtn = document.querySelector(".number-btn--down");
    const upBtn = document.querySelector(".number-btn--up");

    const itemRow = document.querySelector(".item-row");

    /* additing active class on side menu by item product brand */
    if (productCategoryAll) {
        productCategoryAll.forEach(function (item) {
            if (item.dataset.category == itemRow.dataset.brand) {
                item.classList.add("category-item--active");
            }
        })
    }

    /* change main picture by click on small ones in slide */
    itemAddImages.forEach(function (item) {

        item.addEventListener("click", function () {

            pickedImgSrc = item.getAttribute("src");
            mainImg.setAttribute("src", pickedImgSrc);
            itemInSlide = this.closest(".item-add");
        })
    })

    const leftSlideBtn = document.querySelector("[data-img-arrow=imgPrev]");
    const rightSlideBtn = document.querySelector("[data-img-arrow=imgNext]");

    /* click on image side btns */

    /* click on next btn */

    rightSlideBtn.addEventListener("click", nextBtn)

    function nextBtn() {

        if (itemInSlide.nextElementSibling === null) {
            itemInSlide = document.querySelector(".item-add");
            imgInSlide = itemInSlide.firstElementChild;
        } else {
            itemInSlide = itemInSlide.nextElementSibling;
            imgInSlide = itemInSlide.firstElementChild;
        }
        pickedImgSrc = imgInSlide.getAttribute("src");
        mainImg.setAttribute("src", pickedImgSrc);
    }

    /* click on prev btn */

    leftSlideBtn.addEventListener("click", prevBtn);

    function prevBtn() {
        console.log()
        if (itemInSlide.previousElementSibling === null) {
            itemInSlide = itemsRow.lastElementChild;
            imgInSlide = itemInSlide.lastElementChild;
        } else {
            itemInSlide = itemInSlide.previousElementSibling;
            imgInSlide = itemInSlide.lastElementChild;
        }
        pickedImgSrc = imgInSlide.getAttribute("src");
        mainImg.setAttribute("src", pickedImgSrc);
    }

    /* additing active frame on slide picture */
    /* changing active color frame */
    wrapperItems.addEventListener("click", function (e) {

        //let chosenItemImg = document.querySelectorAll(`img[src="${pickedImgSrc}"]`)

        mainImgSrc = mainImg.getAttribute("src")
        itemAddImages.forEach(function (item) {
            pickedItem = item.getAttribute("src");

            if (mainImgSrc == pickedItem) {
                item.closest(".item-add").classList.add("item-add--active")
            } else {
                item.closest(".item-add").classList.remove("item-add--active")
            }
        })
    })

    /* amount btn, chaning total price and quantity of items */
    /* changing total price depends on item amount */

    upBtn.addEventListener("click", increaseAmount);
    downBtn.addEventListener("click", decreaseAmount);

    function increaseAmount() {
        itemAmountValue++;
        itemAmount.value = itemAmountValue;
        totalAmountPrice = totalAmountPrice + itemPagePrice;
        totalAmountPriceText.innerText = totalAmountPrice;

        totalAmountPriceText.innerText = totalAmountPriceText.innerText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function decreaseAmount() {
        if (itemAmountValue <= 0) {
            itemAmount.value = 0;
            totalAmountPrice = 0;
        } else {
            itemAmountValue--;
            itemAmount.value = itemAmountValue;
            totalAmountPrice = totalAmountPrice - itemPagePrice;
        }

        totalAmountPriceText.innerText = totalAmountPrice;
        totalAmountPriceText.innerText = totalAmountPriceText.innerText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /* getting item info */

    itemRow.setAttribute("data-cart", "added");
    itemRow.setAttribute("data-number", 1);

    addedItemInfoPage = {
        brandName: itemRow.dataset.brand,
        itemTitle: itemRow.querySelector(".item-title").innerText,
        itemImg: itemRow.querySelector(".item-main-img").getAttribute("src"),
        itemCartValue: itemRow.dataset.cart,
        itemNumber: parseInt(itemRow.dataset.number),
        itemQuantityCount: itemAmountValue,
        itemLink: "./item1.html",
    }
    /* download files - chaning icon color */

    const downloadLinkAll = document.querySelectorAll(".tech-doc-link");

    downloadLinkAll.forEach(function (item) {

        item.addEventListener("mouseover", function () {
            for (let child of item.children) {
                if (child.hasAttribute("src")) {
                    child.setAttribute("src", "./img/item/icon/download-icon-active.svg");
                }
            }
        });

        item.addEventListener("mouseout", function () {
            for (let child of item.children) {
                if (child.hasAttribute("src")) {
                    if (child.getAttribute("src") == "./img/item/icon/download-icon-active.svg") {
                        child.setAttribute("src", "./img/item/icon/download-icon.svg");
                    }
                }
            }
        });
    });
}

/* events1.html active tab */

if (tabEvents) {
    tabEvents.forEach(function (item) {
        const article = document.querySelector(".article-page");
        item.classList.remove("tab-link-active");

        if (article.dataset.tab === item.dataset.tab) {
            item.classList.add("tab-link-active")
        }
    })
}