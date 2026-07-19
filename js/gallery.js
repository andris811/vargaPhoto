import galleryData from "./gallery-data.js";

// Initialize gallery
function initGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  gallery.innerHTML = "";

  const sortedGalleryData = [...galleryData].sort((a, b) => {
    const numA = parseInt(a.src.match(/(\d+)/)?.[0]) || 0;
    const numB = parseInt(b.src.match(/(\d+)/)?.[0]) || 0;
    return numA - numB;
  });

  sortedGalleryData.forEach((item) => {
    const galleryItem = document.createElement("div");
    galleryItem.className = `gallery-item ${item.category}`;
    galleryItem.dataset.category = item.category;

    galleryItem.innerHTML = `
      <a href="${item.src}" data-lightbox="gallery-${item.category}" data-title="${item.title}" data-category="${item.category}">
        <img src="${item.thumb}" alt="${item.title}" loading="lazy">
        <div class="overlay"><span>${item.title}</span></div>
      </a>
    `;

    gallery.appendChild(galleryItem);
  });

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      if (btn.classList.contains("active")) return;

      gallery.classList.add("hidden");

      setTimeout(() => {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".gallery-item").forEach((item) => {
          item.style.display = item.dataset.category === filter ? "block" : "none";
        });

        gallery.classList.remove("hidden");
      }, 300);
    });
  });

  if (window.lightbox) {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true,
      albumLabel: "",
      alwaysShowNavOnTouchDevices: true,
    });
  }

  document.querySelector(".filter-btn")?.classList.add("active");
}

document.addEventListener("contextmenu", function (e) {
  if (e.target.closest("#gallery") || e.target.classList.contains("lb-image")) {
    e.preventDefault();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initGallery();

  if (window.lightbox) {
    const originalEnd = lightbox.end;

    lightbox.end = function (...args) {
      document.body.style.overflow = '';
      originalEnd.apply(this, args);
    };
  }

  window.addEventListener("resize", () => {
    if (window.lightbox && window.lightbox.$image) {
      const $img = window.lightbox.$image;
      if ($img.length > 0 && $img[0].complete) {
        const naturalWidth = $img[0].naturalWidth;
        const naturalHeight = $img[0].naturalHeight;
        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.85;
        const ratio = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight, 1);
        const newWidth = Math.round(naturalWidth * ratio);
        const newHeight = Math.round(naturalHeight * ratio);
        $img.css({ width: newWidth, height: newHeight });
        if (window.lightbox.$outerContainer) {
          window.lightbox.$outerContainer.css({ width: newWidth, height: newHeight });
        }
        if (window.lightbox.$container) {
          window.lightbox.$container.css({ width: newWidth, height: newHeight });
        }
      }
    }
  });
});
