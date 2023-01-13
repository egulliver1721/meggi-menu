import { tagData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
let addedToCartArray = [];
let removeBtn = document.getElementById("remove-btn");
const cartFromLocalStorage = JSON.parse(
  localStorage.getItem("addedToCartArray")
);

if (cartFromLocalStorage) {
  addedToCartArray = cartFromLocalStorage;
  cartHtml();
}
console.log(cartFromLocalStorage);

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add);
  }

  if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  }

  // if (addedToCartArray.length > 0) {
  //   document.getElementById("order-summary").classList.remove("no-items");
  // }
});

let clearBtn = document.getElementById("clear-cart-btn");
clearBtn.addEventListener("click", function () {
  localStorage.clear();
  addedToCartArray = [];
  renderCart();
});

function handleAddClick(itemId) {
  const targetItemObj = tagData.filter(function (item) {
    return item.uuid === itemId;
  })[0];

  if (!addedToCartArray.includes(targetItemObj.item)) {
    addedToCartArray.push(targetItemObj.item);
  }
  localStorage.setItem("addedToCartArray", JSON.stringify(addedToCartArray));
  cartHtml();
}

function handleRemoveClick(e) {
  const targetItemObj = tagData.filter(function (item) {
    return item.uuid === itemId;
  })[0];
}

localStorage.removeItem("item");

function cartHtml() {
  let cartHtml = ``;
  addedToCartArray.forEach(function (item) {
    cartHtml += `<p>${item} <span class="remove" data-remove="${item.uuid}" id="remove-btn"> remove </span> </p>`;
  });
  renderCart(cartHtml);
}

function getAppHtml() {
  let appHtml = ``;

  tagData.forEach(function (item) {
    appHtml += `<img src="${item.icon}" class="item-icon" alt="" />
        <div class="item-name">${item.item}</div>
        <img src="add.png" class="icon-add" data-add="${item.uuid}" alt="" />
          `;
  });

  return appHtml;
}

function render() {
  document.getElementById("item-section").innerHTML = getAppHtml();
}

function renderCart(cartHtml) {
  if (addedToCartArray.length > 0) {
    document.getElementById("item-summary").innerHTML = cartHtml;
  } else {
    document.getElementById("item-summary").innerHTML = ``;
  }
}

render();

// localStorage.clear();
