document.querySelectorAll(".field").forEach((field) => {
  const input = field.querySelector("input");
  const editIcon = field.querySelector(".edit-icon");

  editIcon.addEventListener("click", () => {
    input.removeAttribute("readonly"); // Enable editing
    input.focus(); // Focus input for typing
    input.style.cursor = "text";
  });

  input.addEventListener("blur", () => {
    input.setAttribute("readonly", true); // Lock input again
  });
});
function updateProgress(id) {
  const slider = document.getElementById(`slider${id}`);
  const progressCircle = document.getElementById(`progress${id}`);
  const progressText = document.getElementById(`progress-text${id}`);

  const value = slider.value;
  progressText.innerText = value;

  if (value == 0) {
    progressCircle.classList.add("hidden"); // Hide when 0
  } else {
    progressCircle.classList.remove("hidden"); // Show when > 0
    const percentage = (value / 10) * 100; // Convert range (0-10) to (0-100)
    progressCircle.style.setProperty("--progress", `${percentage}%`);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  // ✅ Ensuring JavaScript runs only after DOM is fully loaded
  document.getElementById("close-btn").addEventListener("click", closeModal); // ✅ Added event listener to close button
  document.getElementById("overlay").addEventListener("click", closeModal); // ✅ Clicking overlay closes modal
});
// Function to show the modal with row data
// function showRowData(row) {
//   const headers = document.querySelectorAll("#data-table thead th");
//   const cells = row.getElementsByTagName("td");

//   let outputHtml = "";
//   headers.forEach((header, index) => {
//     outputHtml += `<p><strong>${header.innerText}:</strong> ${cells[index].innerText}</p>`;
//   });

//   document.getElementById("modal-content").innerHTML = outputHtml;
//   document.getElementById("modal").style.display = "block";
//   document.getElementById("overlay").style.display = "block";
// }

// function closeModal() {
//   document.getElementById("modal").style.display = "none";
//   document.getElementById("overlay").style.display = "none";
// }

function showRowData(row) {
  const headers = document.querySelectorAll("#data-table thead th");
  const cells = row.getElementsByTagName("td");

  let queryParams = [];
  headers.forEach((header, index) => {
    queryParams.push(
      `${header.innerText}=${encodeURIComponent(cells[index].innerText)}`
    );
  });

  window.location.href = `modal.html?${queryParams.join("&")}`;
}
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  let detailsHTML = "";
  params.forEach((value, key) => {
    detailsHTML += `<p><strong>${key}:</strong> ${value}</p>`;
  });
  document.getElementById("modal-content").innerHTML = detailsHTML;
}

function goBack() {
  window.history.back();
}

// Load data when page loads
window.onload = getQueryParams;
