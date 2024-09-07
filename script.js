import data from "./data.js";

const productsContainer = document.querySelector("#productsContainer");

function createProducts() {
  const html = data
    .map((pData) => {
      return `<div class="space-y-3">
              <div class="relative">
                <figure class="size-60">
                  <img
                    class="size-full object-cover rounded-md"
                    src=${pData.image.desktop}
                    alt=""
                  />
                </figure>
                <button
                  class="flex absolute translate-x-1/2 -bottom-4 items-center border rounded-full bg-white py-1 px-3"
                >
                  <img src="./assets/images/icon-add-to-cart.svg" alt="" />
                  Add to cart
                </button>
              </div>
              <div class="space-y-1">
                <span class="text-gray-500 text-sm">${pData.category}</span>
                <p class="font-bold">${pData.name}</p>
                <span class="text-[#c73a0f]">$${
                  pData.price.toString().includes(".")
                    ? pData.price
                    : pData.price + ".00"
                }</span>
              </div>
            </div>`;
    })
    .join("");
  productsContainer.innerHTML = html;
}

createProducts();
