import galleryData from "./gallery-data.js";

// Initialize gallery
function initGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

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

  // Initialize filter buttons with transitions
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Skip if already active
      if (btn.classList.contains("active")) return;

      // Start transition
      gallery.classList.add("hidden");
      
      // Wait for fade-out to complete
      setTimeout(() => {
        // Update active button
        document.querySelectorAll(".filter-btn").forEach((b) => 
          b.classList.remove("active"));
        btn.classList.add("active");

        // Filter items
        document.querySelectorAll(".gallery-item").forEach((item) => {
          item.style.display = item.dataset.category === filter ? "block" : "none";
        });

        // Re-init Lightbox for new category
        if (window.lightbox) {
          lightbox.init(`.gallery-item[data-category="${filter}"] a`);
        }

        // Complete transition
        gallery.classList.remove("hidden");
      }, 300); // Match your CSS transition duration
    });
  });

  // Initialize Lightbox with category isolation
  if (window.lightbox) {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: false,
      albumLabel: "",
      alwaysShowNavOnTouchDevices: true,
      filter: function () {
        const activeCategory = document.querySelector(".filter-btn.active")?.dataset.filter;
        return $(this).data("category") === activeCategory;
      }
    });

    // Store original Lightbox init function
    const originalInit = lightbox.init;

    // Override Lightbox init to filter images by category
    lightbox.init = function (selector) {
      const activeCategory = document.querySelector(".filter-btn.active")?.dataset.filter;
      const filteredSelector = activeCategory 
        ? `${selector}[data-category="${activeCategory}"]` 
        : selector;
      originalInit.call(this, filteredSelector);
    };
  }

  // Activate first category by default
  document.querySelector(".filter-btn")?.classList.add("active");
}

// Prevent right clicks on the images
document.addEventListener("contextmenu", function (e) {
  if (e.target.closest("#gallery")) {
    e.preventDefault();
  }
});

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initGallery);