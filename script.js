import data from "./data.js";

const productsContainer = document.querySelector("#productsContainer");
const cartContainer = document.querySelector("#cartContainer");
const confirimContainer = document.querySelector("#confirimContainer");
const totalBasketPrice = document.querySelector("#totalBasketPrice");
const cartCount = document.querySelector("#cartCount");
const confirmOrderBtn = document.querySelector("#confirmOrderBtn");
const modalContainer = document.querySelector("#modalContainer");
const main = document.querySelector("main");

let basket = [];

function createProducts(products) {
  const html = products
    .map((pData) => {
      const findedP = basket.find((b) => b.id === pData.id);

      return `<div class="space-y-3">
              <div class="relative">
                <figure class="size-72">
                  <img
                    class="size-full object-cover rounded-md"
                    src=${pData.image.desktop}
                    alt=""
                  />
                </figure>
              

                ${
                  findedP
                    ? `
                  <div class="flex justify-between text-white absolute translate-x-1/2 -bottom-4 items-center border rounded-full bg-[#c73a0f] py-2 px-3 w-[150px] ">
                    <button data-id=${pData.id} class="decreaseBtn">-</button>
                    <span>${pData.count}</span>
                    <button data-id=${pData.id} class="increaseBtn">+</button>
                    </div>`
                    : `  <button data-id=${pData.id}
                  class="addToCart flex absolute translate-x-1/2 -bottom-4 items-center border rounded-full bg-white py-1 px-3"
                >
                  <img src="./assets/images/icon-add-to-cart.svg" alt="" />
                  Add to cart
                </button>`
                }
            
              </div>
              <div class="space-y-1">
                <span class="text-gray-500 text-sm">${pData.category}</span>
                <p class="font-bold">${pData.name}</p>
                <span class="text-[#c73a0f]">$${pData.price.toFixed(2)}</span>
              </div>
            </div>`;
    })
    .join("");
  productsContainer.innerHTML = html;
  getAddBtn(".addToCart");
  getAddBtn(".increaseBtn");
  getAddBtn(".decreaseBtn");
}

createProducts(data);

function getAddBtn(className) {
  const addBtn = document.querySelectorAll(className);
  addBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = +btn.getAttribute("data-id");
      if (className !== ".decreaseBtn") {
        addBasket(id);
      } else {
        decreaseProduct(id);
      }
    })
  );
}

function addBasket(productId) {
  const findProduct = data.find((product) => product.id === productId);
  const inBasket = basket.find((product) => product.id === productId);

  if (inBasket) {
    findProduct.count += 1;
  } else {
    basket.push(findProduct);
  }

  createProducts(data);
  createBasketUi(basket);
}

function decreaseProduct(productId) {
  const findProduct = data.find((product) => product.id === productId);
  const inBasket = basket.find((product) => product.id === productId);

  if (inBasket.count > 1) {
    findProduct.count -= 1;
  } else if (inBasket.count === 1) {
    basket = basket.filter((b) => b.id !== productId);
  }

  createProducts(data);
  createBasketUi(basket);
}

function createBasketUi(basketItems) {
  if (basketItems.length > 0) {
    const totals = sumBasketItems(basketItems);
    const html = basketItems
      .map((bData) => {
        return `       <div class="flex justify-between items-center p-1">
                <div>
                  <h4 class="font-bold text-lg">Classic Tiramisu</h4>
                  <div class="flex items-center space-x-2">
                    <span class="text-[#c73a0f] font-bold mr-1">${
                      bData.count
                    }x</span>
                    <span class="text-[#c9aea6]">@ $${bData.price.toFixed(
                      2
                    )}</span>
                    <span class="text-[#ad8985] font-medium">$${(
                      bData.price * bData.count
                    ).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  class="size-5 rounded-full border grid place-items-center border-gray-400"
                >
                  <img
                    class="object-cover"
                    src="./assets/images/icon-remove-item.svg"
                    alt=""
                  />
                </button>
              </div>`;
      })
      .join("");
    confirimContainer.classList.remove("hidden");
    totalBasketPrice.textContent = `$${totals[1].toFixed(2)}`;
    cartCount.textContent = totals[0];
    cartContainer.innerHTML = html;
  } else {
    confirimContainer.classList.add("hidden");
    cartContainer.innerHTML = `       <div>
              <figure class="flex justify-center">
                <img
                  src="./assets/images/illustration-empty-cart.svg"
                  alt=""
                />
              </figure>
              <p class="text-center texr-xs text-[#ad8985]">
                Your added items wll appear here
              </p>
            </div>
          </div>`;
  }
}

function sumBasketItems(basketData) {
  const totalPrice = basketData.reduce((prev, obj) => {
    prev += obj.count * obj.price;
    return prev;
  }, 0);
  const totalCount = basketData.reduce((prev, obj) => {
    prev += obj.count;
    return prev;
  }, 0);

  return [totalCount, totalPrice];
}

function showModal() {
  modalContainer.classList.replace("scale-0", "scale-100");
  main.classList.remove("before:invisible");

  createModalUi(basket);
}

function createModalUi(modalData) {
  const html = modalData
    .map((mData) => {
      return `  <div class="flex justify-between items-center p-1">
          <div class="flex">
            <figure class="size-24">
              <img
                class="size-full object-cover"
                src=${mData.image.desktop}
                alt=""
              />
            </figure>
            <div class="flex flex-col">
              <h4 class="font-bold text-lg">Classic Tiramisu</h4>
              <div class="flex items-center space-x-2 mt-auto">
                <span class="text-[#c73a0f] font-bold mr-1">1x</span>

                <span class="text-[#ad8985] font-medium">$6.60</span>
              </div>
            </div>
          </div>
          <span class=""> $6.60 </span>
        </div>`;
    })
    .join("");
  modalContainer.innerHTML = html;
}

confirmOrderBtn.addEventListener("click", showModal);
