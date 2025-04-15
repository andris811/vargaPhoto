document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const imageCount = 20;
    for (let i = 1; i <= imageCount; i++) {
      const fullPath = `images/photo${i}.jpg`;
      const thumbPath = `images/photo_thumb${i}.jpg`;
      const link = document.createElement("a");
      link.href = fullPath;
      link.setAttribute("data-lightbox", "travel");
      const img = document.createElement("img");
      img.src = thumbPath;
      img.alt = `Photo ${i}`;
      link.appendChild(img);
      gallery.appendChild(link);
    }
  });

  window.onload = function() {
    const images = document.querySelectorAll('.gallery img');
    images.forEach(img => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      if (aspectRatio > 1) {
        img.classList.add('landscape'); // Horizontal images
      } else {
        img.classList.add('portrait'); // Vertical images
      }
    });
  };


  