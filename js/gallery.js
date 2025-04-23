// document.addEventListener("DOMContentLoaded", () => {
//     const gallery = document.getElementById("gallery");
//     const imageCount = 20;
//     for (let i = 1; i <= imageCount; i++) {
//       const fullPath = `assets/images/photo${i}.jpg`;
//       const thumbPath = `assets/images/photo_thumb${i}.jpg`;
//       const link = document.createElement("a");
//       link.href = fullPath;
//       link.setAttribute("data-lightbox", "travel");
//       const img = document.createElement("img");
//       img.src = thumbPath;
//       img.alt = `Photo ${i}`;
//       link.appendChild(img);
//       gallery.appendChild(link);
//     }
//   });

//   window.onload = function() {
//     const images = document.querySelectorAll('.gallery img');
//     images.forEach(img => {
//       const aspectRatio = img.naturalWidth / img.naturalHeight;
//       if (aspectRatio > 1) {
//         img.classList.add('landscape'); // Horizontal images
//       } else {
//         img.classList.add('portrait'); // Vertical images
//       }
//     });
//   };


import galleryData from './gallery-data.js';

// Initialize gallery
function initGallery() {
  const gallery = document.getElementById('gallery');
  
  // Clear existing content
  gallery.innerHTML = '';

  // Create gallery items
  galleryData.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.className = `gallery-item ${item.category}`;
    galleryItem.dataset.category = item.category;
    
    galleryItem.innerHTML = `
      <a href="${item.src}" data-lightbox="gallery" data-title="${item.title}">
        <img src="${item.thumb}" alt="${item.title}" loading="lazy">
      </a>
      <div class="photo-title">${item.title}</div>
    `;
    
    gallery.appendChild(galleryItem);
  });

  // Initialize filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Update active button
      document.querySelectorAll('.filter-btn').forEach(b => 
        b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter items
      document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) 
          ? 'block' 
          : 'none';
      });
    });
  });

  // Initialize Lightbox
  if (window.lightbox) {
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
      'albumLabel': 'Image %1 of %2'
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initGallery);