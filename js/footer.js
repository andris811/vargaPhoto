document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerContainer = document.getElementById("footer-placeholder");
      if (footerContainer) {
        footerContainer.innerHTML = data;

        const yearEl = document.getElementById("year");
        if (yearEl) {
          yearEl.textContent = new Date().getFullYear();
        }
      }
    });
});
