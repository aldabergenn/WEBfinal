const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const cartBox = document.getElementById("cartbox");
const cartBody = document.getElementById("cartbody");
const cartBody2 = document.getElementById("cartbody2");
const cartDetails = document.getElementById("cartdetails");
const cartNumbers = document.getElementById("cartnumbers");
const cartTotal = document.getElementById("total");
const addToCartButtons = document.querySelectorAll(".productButton1");
const deleteButton = document.getElementById("deletebutton");

let cartCount = 0;
let totalPrice = 0;

const products = [
  { id: 1, title: "Air Force", price: 119, colors: [{ code: "black", img: "./img/air.png" }, { code: "darkblue", img: "./img/air2.png" }] },
  { id: 2, title: "Air Jordan", price: 149, colors: [{ code: "lightgray", img: "./img/jordan.png" }, { code: "green", img: "./img/jordan2.png" }] },
  { id: 3, title: "Blazer", price: 109, colors: [{ code: "lightgray", img: "./img/blazer.png" }, { code: "green", img: "./img/blazer2.png" }] },
  { id: 4, title: "Crater", price: 129, colors: [{ code: "black", img: "./img/crater.png" }, { code: "lightgray", img: "./img/crater2.png" }] },
  { id: 5, title: "Hippie", price: 99, colors: [{ code: "gray", img: "./img/hippie.png" }, { code: "black", img: "./img/hippie2.png" }] }
];

let choosenProduct = products[0];
let selectedColorIndex = 0;
let selectedSize = "";

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    choosenProduct = products[index];
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = `$${choosenProduct.price}`;
    currentProductImg.src = choosenProduct.colors[selectedColorIndex].img;

    currentProductColors.forEach((color, colorIndex) => {
      color.style.backgroundColor = choosenProduct.colors[colorIndex]?.code || "transparent";
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    selectedColorIndex = index;
    currentProductImg.src = choosenProduct.colors[selectedColorIndex].img;
  });
});

currentProductSizes.forEach((size) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });

    size.style.backgroundColor = "black";
    size.style.color = "white";
    selectedSize = size.textContent;
  });
});

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    cartCount++;
    cartBody.style.display = "none";
    cartBody2.style.display = "block";
    cartBox.style.visibility = "visible";

    const cartItem = document.createElement("div");
    cartItem.classList.add("cartItem");

    cartItem.innerHTML = `
      <img src="${choosenProduct.colors[selectedColorIndex].img}" class="cartItemImg" alt="${choosenProduct.title}" />
      <div class="cartItemDetails">
        <h4 class="cartItemTitle">${choosenProduct.title}</h4>
        <p class="cartItemPrice">$${choosenProduct.price}</p>
        <p class="cartItemSize">Size: <span class="cartItemSizeValue">${selectedSize}</span></p>
      </div>
      <img src="./img/icon-delete.svg" alt="Delete" class="deleteIcon" />
    `;

    cartDetails.appendChild(cartItem);
    totalPrice += choosenProduct.price;
    cartTotal.textContent = `${totalPrice.toFixed(2)}`;

    const deleteIcon = cartItem.querySelector(".deleteIcon");
    deleteIcon.addEventListener("click", () => {
      cartItem.remove();
      cartCount--;
      totalPrice -= choosenProduct.price;
      cartNumbers.textContent = cartCount;
      cartTotal.textContent = `${totalPrice.toFixed(2)}`;

      if (cartCount === 0) {
        cartBody.style.display = "block";
        cartBody2.style.display = "none";
      }
    });
  });
});

const productButton = document.querySelector(".productButton");
const cartOrderButton = document.querySelector(".cartOrderButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

cartOrderButton.addEventListener("click", () => {
  payment.style.display = "flex";
  payment.scrollIntoView({ behavior: "smooth", block: "center" });
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});
