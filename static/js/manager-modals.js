// Report Order Modal

const reportOrderBtn = document.querySelectorAll(".report-order-btn");
const reportOrderModal = document.querySelector(".report-order-modal");
const reportOrderModalCloseBtn =
  reportOrderModal.querySelector(".cancel-btn-order");
const reportOrderModalSubmitBtn =
  reportOrderModal.querySelector(".submit-btn-order");

reportOrderBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    reportOrderModal.showModal();
  });
});

reportOrderModalCloseBtn.addEventListener("click", () => {
  reportOrderModal.close();
});

// Mark Order as Delivered Modal

const deliveredBtn = document.querySelectorAll(".delivered-btn");
const deliveredModal = document.querySelector(".delivered-modal");
const deliverdModalCloseBtn = deliveredModal.querySelector(
  ".cancel-btn-delivered"
);
const deliverdModalSubmitBtn = deliveredModal.querySelector(
  ".submit-btn-delivered"
);

deliveredBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    deliveredModal.showModal();
  });
});

deliverdModalCloseBtn.addEventListener("click", () => {
  deliveredModal.close();
});

// Report Product Modal

const reportProductBtn = document.querySelectorAll(".report-product-btn");
const reportProductModal = document.querySelector(".report-product-modal");
const reportProductModalCloseBtn = reportProductModal.querySelector(
  ".cancel-btn-product"
);
const reportProductModalSubmitBtn = reportProductModal.querySelector(
  ".submit-btn-product"
);

reportProductBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    reportProductModal.showModal();
  });
});

reportProductModalCloseBtn.addEventListener("click", () => {
  reportProductModal.close();
});

// Add Product Modal

const addProductBtn = document.querySelector(".add-product-btn");
const addProductModal = document.querySelector(".add-product-modal");
const addProductCloseBtn = document.querySelector(".add-product-cancel-btn");
const addProductSubmitBtn = document.querySelector(".add-product-submit-btn");

addProductBtn.addEventListener("click", () => {
  addProductModal.showModal();
});

addProductCloseBtn.addEventListener("click", () => {
  addProductModal.close();
});

// Edit Product Modal

const editProductBtn = document.querySelectorAll(".edit-product-btn");
const editProductModal = document.querySelector(".edit-product-modal");
const editProductCloseBtn = document.querySelector(".edit-product-cancel-btn");
const editProductSubmitBtn = document.querySelector(".edit-product-submit-btn");

editProductBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    editProductModal.showModal();

    const product = btn.closest(".product");
    checkModifiedData(product, editProductModal, editProductSubmitBtn);
  });
});

editProductCloseBtn.addEventListener("click", () => {
  editProductModal.close();
});

function checkModifiedData(row, modal, submitBtn) {
  const name = row.querySelector("#name").innerText;
  const brand = row.querySelector("#brand").innerText.replace("Brand: ", "");
  const category = row
    .querySelector("#category")
    .innerText.replace("Category: ", "");
  const count = row.querySelector("#count").innerText.replace("Count: ", "");

  const data = {
    name: name,
    brand: brand,
    category: category,
    count: count,
  };

  let newData = {
    name: name,
    brand: brand,
    category: category,
    count: count,
  };

  let inputs = modal.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      let inputName = input.name;
      let value = input.value === "" ? data[inputName] : input.value.toString();
      if (newData[inputName].toLowerCase() !== value.toLowerCase()) {
        newData[inputName] = value;
      } else {
        return false;
      }

      if (JSON.stringify(data) !== JSON.stringify(newData)) {
        console.log("not Equal", data, newData);
        submitBtn.removeAttribute("disabled");
        submitBtn.style.opacity = "1";
      } else {
        console.log("Equal", data, newData);
        submitBtn.setAttribute("disabled", "disabled");
        submitBtn.style.opacity = "0.5";
      }
    });
  });
}
/* This code is responsible for handling the functionality of the "Add Order" modal. */
const addOrderBtn = document.querySelector(".add-order-btn");
const addOrderModal = document.querySelector(".add-order-modal");
const addOrderModalCloseBtn = addOrderModal.querySelector(
  ".add-order-cancel-btn"
);
const addOrderModalSubmitBtn = addOrderModal.querySelector(
  ".add-order-submit-btn"
);

addOrderBtn.addEventListener("click", () => {
  addOrderModal.showModal();

  let allValid = [false, false];
  const inputs = addOrderModal.querySelectorAll("input");

  addOrderModalSubmitBtn.setAttribute("disabled", "disabled");
  addOrderModalSubmitBtn.style.opacity = "0.7";

  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.type === "text" && input.checkValidity()) {
        allValid[0] = true;
      } else if (input.type !== "text" && input.checkValidity()) {
        allValid[1] = true;
      }

      if (allValid[0] && allValid[1]) {
        addOrderModalSubmitBtn.removeAttribute("disabled");
        addOrderModalSubmitBtn.style.opacity = "1";
      } else {
        addOrderModalSubmitBtn.setAttribute("disabled", "disabled");
        addOrderModalSubmitBtn.style.opacity = "0.7";
      }
    });
  });
});

addOrderModalCloseBtn.addEventListener("click", () => {
  addOrderModal.close();
});