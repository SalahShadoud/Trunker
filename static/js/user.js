const products = document.querySelectorAll(".product");
const incrementBtn = document.querySelectorAll(".buttons .increment");
const decrementBtn = document.querySelectorAll(".buttons .decrement");

checkCounts();

incrementBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productCount = btn.closest(".product").querySelector(".count .num");
    const count = parseInt(productCount.innerHTML) + 1;
    productCount.innerHTML = count;
    checkCounts();
  });
});

decrementBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productCount = btn.closest(".product").querySelector(".count .num");
    const count = parseInt(productCount.innerHTML) - 1;
    productCount.innerHTML = count;
    checkCounts();
  });
});

function checkCounts() {
  products.forEach((product) => {
    const productCount = product.querySelector(".count .num");
    const decreaseBtn = product.querySelector(".decrement");
    if (productCount.innerHTML === "0") {
      decreaseBtn.setAttribute("disabled", "disabled");
      decreaseBtn.style.opacity = "0.7";
    } else {
      decreaseBtn.removeAttribute("disabled");
      decreaseBtn.style.opacity = "1";
    }
  });
}
