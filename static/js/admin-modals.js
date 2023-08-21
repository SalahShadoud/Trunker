// Add Employee Modal

const addEmployeeBtn = document.querySelector(".add-employee-btn");
const addEmployeeModal = document.querySelector(".add-employee-modal");
const addEmployeeModalCloseBtn = addEmployeeModal.querySelector(
  ".add-employee-cancel-btn"
);
const addEmployeeModalSubmitBtn = addEmployeeModal.querySelector(
  ".add-employee-submit-btn"
);

const uploadPhotoBtn = document.querySelector(".upload-pic-btn");
const fileInput = document.getElementById("upload-photo");

addEmployeeBtn.addEventListener("click", () => {
  addEmployeeModal.showModal();
});

addEmployeeModalCloseBtn.addEventListener("click", () => {
  addEmployeeModal.close();
});

uploadPhotoBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  var fullPath = fileInput.value;

  if (fullPath) {
    var startIndex =
      fullPath.indexOf("\\") >= 0
        ? fullPath.lastIndexOf("\\")
        : fullPath.lastIndexOf("/");

    var filename = fullPath.substring(startIndex);

    if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
      filename = filename.substring(1);
    }
  }

  if (filename !== undefined)
    uploadPhotoBtn.innerHTML =
      filename !== undefined
        ? "You Choose " + filename
        : "You Didn't Choose any Photo";

  uploadPhotoBtn.style.padding = "0.7rem 2rem";
});

// Edit Employee Modal

const editEmployeeBtn = document.querySelectorAll(".employees-table #edit");
const editEmployeeModal = document.querySelector(".edit-employee-modal");
const editEmployeeModalCancelBtn = document.querySelector(
  ".edit-employee-modal .edit-employee-cancel-btn"
);
const editEmployeeModalSubmitBtn = document.querySelector(
  ".edit-employee-modal .edit-employee-submit-btn"
);

const uploadNewPhotoBtn = document.querySelector(".upload-new-pic-btn");
const uploadNewPhotoInput = document.getElementById("upload-new-photo");

editEmployeeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const employee = btn.closest("tr");
    editEmployeeModal.showModal();

    // checkModifiedData(employee, editEmployeeModal, editEmployeeModalSubmitBtn);
  });
});

// function checkModifiedData(row, modal, submitBtn) {
//   const name = row.querySelector(".name").innerHTML;
//   const email = row.querySelector(".email").innerHTML;
//   const type = row.querySelector(".type").innerHTML;

//   const data = {
//     text: name,
//     email: email,
//     radio: type,
//   };

//   let newData = {
//     text: name,
//     email: email,
//     radio: type,
//   };

//   console.log(data, newData);

//   let inputs = modal.querySelectorAll("input");
//   inputs.forEach((input) => {
//     input.addEventListener("change", () => {
//       let type = input.type.toString();
//       let value = input.value === "" ? data[type] : input.value.toString();
//       if (newData[type].toLowerCase() !== value.toLowerCase()) {
//         newData[type] = value;
//       } else {
//         return false;
//       }

//       if (JSON.stringify(data) !== JSON.stringify(newData)) {
//         console.log("not Equal", data, newData);
//         submitBtn.removeAttribute("disabled");
//         submitBtn.style.opacity = "1";
//       } else {
//         console.log("Equal", data, newData);
//         submitBtn.setAttribute("disabled", "disabled");
//         submitBtn.style.opacity = "0.7";
//       }
//     });
//   });
// }

editEmployeeModalCancelBtn.addEventListener("click", () => {
  editEmployeeModal.close();
});

// uploadNewPhotoBtn.addEventListener("click", () => {
//   uploadNewPhotoInput.click();
// });

// uploadNewPhotoInput.addEventListener("change", () => {
//   var fullPath = uploadNewPhotoInput.value;

//   if (fullPath) {
//     var startIndex =
//       fullPath.indexOf("\\") >= 0
//         ? fullPath.lastIndexOf("\\")
//         : fullPath.lastIndexOf("/");

//     var filename = fullPath.substring(startIndex);

//     if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
//       filename = filename.substring(1);
//     }
//   }

//   if (filename !== undefined)
//     uploadNewPhotoBtn.innerHTML =
//       filename !== undefined
//         ? "You Choose " + filename
//         : "You Didn't Choose any Photo";

//   uploadNewPhotoBtn.style.padding = "0.7rem 2rem";
// });

// Delete Employee Modal

const deleteEmployeeBtn = document.querySelectorAll(".employees-table #delete");
const deleteEmployeeModal = document.querySelector(".delete-employee-modal");
const deleteEmployeeModalCancelBtn = document.querySelector(
  ".delete-employee-modal .delete-employee-cancel-btn"
);
const deleteEmployeeModalSubmitBtn = document.querySelector(
  ".delete-employee-modal .delete-employee-submit-btn"
);

deleteEmployeeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    deleteEmployeeModal.showModal();
  });
});

deleteEmployeeModalCancelBtn.addEventListener("click", () => {
  deleteEmployeeModal.close();
});

// Report Replay Modal

const reportReplayBtn = document.querySelectorAll(".report-replay-btn");
const reportReplayModal = document.querySelector(".report-replay-modal");
const reportReplayModalCloseBtn = reportReplayModal.querySelector(
  ".report-replay-cancel-btn"
);
const reportReplayModalSubmitBtn = reportReplayModal.querySelector(
  ".report-replay-submit-btn"
);

reportReplayBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    // const report = btn.closest(".report");
    reportReplayModal.showModal();
    // addReplay(report, reportReplayModal, reportReplayModalSubmitBtn);
  });
});

reportReplayModalCloseBtn.addEventListener("click", () => {
  reportReplayModal.close();
});

// reportReplayModalSubmitBtn.addEventListener("click", () => {
//   window.alert("You Can Send the Data Now!")
// })

// function addReplay(report, modal, submitBtn) {
//   const manager = report
//     .querySelector("#manager")
//     .innerText.replace("Manager: ", "");
//   const orderName = report
//     .querySelector("#order-name")
//     .innerText.replace("Order: ", "");
//   const orderNumber = report
//     .querySelector("#order-num")
//     .innerText.replace("Order Num: ", "");
//   const reportMessage = report.querySelector("#report-message").innerText;
//   const replay = modal.querySelector("textarea");

//   let data = {
//     manaer: manager,
//     orderName: orderName,
//     orderNumber: orderNumber,
//     reportMessage: reportMessage,
//     replayMessage: null,
//   };

  // replay.addEventListener("change", () => {
  //   if (replay.value === "") {
  //     submitBtn.setAttribute("disabled", "disabled");
  //     submitBtn.style.opacity = "0.5";
  //   } else {
  //     data["replayMessage"] = replay.value;
  //     submitBtn.removeAttribute("disabled");
  //     submitBtn.style.opacity = "1";
  //   }
  // });
// }
