import galleryData from "./gallery-data.js";

// Initialize gallery
function initGallery() {
  const gallery = document.getElementById("gallery");

  // Clear existing content
  gallery.innerHTML = "";

  // Create gallery items
  galleryData.forEach((item) => {
    const galleryItem = document.createElement("div");
    galleryItem.className = `gallery-item ${item.category}`;
    galleryItem.dataset.category = item.category;

    galleryItem.innerHTML = `
      <a href="${item.src}" data-lightbox="gallery-${item.category}" data-title="${item.title}" data-category="${item.category}">
        <img src="${item.thumb}" alt="${item.title}" loading="lazy">
      </a>
      <div class="photo-title">${item.title}</div>
    `;

    gallery.appendChild(galleryItem);
  });

  // Initialize filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Update active button
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter items
      document.querySelectorAll(".gallery-item").forEach((item) => {
        item.style.display =
          filter === "all" || item.dataset.category === filter
            ? "block"
            : "none";
      });
    });
  });

  // Initialize Lightbox
  if (window.lightbox) {
    // Initialize Lightbox with category isolation
    lightbox.option({
      resizeDuration: 200,
      wrapAround: false,
      albumLabel: "",
      alwaysShowNavOnTouchDevices: true,
      filter: function () {
        const activeCategory =
          document.querySelector(".filter-btn.active")?.dataset.filter;
        return $(this).data("category") === activeCategory;
      },
    });

    // Store original Lightbox init function
    const originalInit = lightbox.init;

    // Override Lightbox init to filter images by category
    lightbox.init = function (selector) {
      const activeCategory =
        document.querySelector(".filter-btn.active")?.dataset.filter;

      // Only select images from active category
      const filteredSelector = `${selector}[data-category="${activeCategory}"]`;

      originalInit.call(this, filteredSelector);
    };

    // Re-init Lightbox when changing categories
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (window.lightbox) {
          lightbox.init(".gallery-item a");
        }
      });
    });
  }
}

// prevent right clicks on the images
document.addEventListener("contextmenu", function (e) {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initGallery);
