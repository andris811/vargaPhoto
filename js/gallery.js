document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const imageCount = 20; // Adjust this based on expected number of images
    for (let i = 1; i <= imageCount; i++) {
      const fullPath = `images/photo${i}.jpg`;
      const thumbPath = `images/photo${i}.jpg`;
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