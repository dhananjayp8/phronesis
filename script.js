document.querySelectorAll(".field").forEach((field) => {
  const input = field.querySelector("input");
  const editIcon = field.querySelector(".edit-icon");

  editIcon.addEventListener("click", () => {
    input.removeAttribute("readonly");
    input.focus();
    input.style.cursor = "text";
  });

  input.addEventListener("blur", () => {
    input.setAttribute("readonly", true);
  });
});
function updateProgress(id) {
  const slider = document.getElementById(`slider${id}`);
  const progressCircle = document.getElementById(`progress${id}`);
  const progressText = document.getElementById(`progress-text${id}`);

  const value = slider.value;
  progressText.innerText = value;

  if (value == 0) {
    progressCircle.classList.add("hidden");
  } else {
    progressCircle.classList.remove("hidden");
    const percentage = (value / 10) * 100;
    progressCircle.style.setProperty("--progress", `${percentage}%`);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("close-btn").addEventListener("click", closeModal); // ✅ Added event listener to close button
  document.getElementById("overlay").addEventListener("click", closeModal); // ✅ Clicking overlay closes modal
});

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
window.onload = getQueryParams;
