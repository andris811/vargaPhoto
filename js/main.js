// ========== HERO IMAGE ROTATION ==========
// Set to false to use only the default hero.jpeg from CSS
const HERO_ROTATION = true;

if (HERO_ROTATION) {
  const heroImages = [
    "assets/images/hero.jpeg",
    "assets/images/landscape/landscape_11.jpg",
    "assets/images/landscape/landscape_13.jpg",
    "assets/images/landscape/landscape_15.jpg",
    "assets/images/landscape/landscape_17.jpg",
    "assets/images/landscape/landscape_19.jpg",
    "assets/images/landscape/landscape_21.jpg",
    "assets/images/landscape/landscape_23.jpg",
    "assets/images/landscape/landscape_24.jpg",
    "assets/images/landscape/landscape_25.jpg",
    "assets/images/landscape/landscape_26.jpg",
    "assets/images/landscape/landscape_27.jpg",
    "assets/images/landscape/landscape_30.jpg",
    "assets/images/landscape/landscape_32.jpg",
    "assets/images/landscape/landscape_33.jpg",
    "assets/images/landscape/landscape_36.jpg",
    "assets/images/landscape/landscape_37.jpg",
    "assets/images/landscape/landscape_38.jpg",
    "assets/images/landscape/landscape_41.jpg",
    "assets/images/landscape/landscape_42.jpg",
    "assets/images/landscape/landscape_44.jpg",
    "assets/images/landscape/landscape_45.jpg",
    "assets/images/landscape/landscape_46.jpg",
    "assets/images/landscape/landscape_47.jpg",
    "assets/images/landscape/landscape_48.jpg",
    "assets/images/landscape/landscape_5.jpg",
    "assets/images/landscape/landscape_9.jpg",
    "assets/images/nature/nature_1.jpg",
    "assets/images/nature/nature_10.jpg",
    "assets/images/nature/nature_12.jpg",
    "assets/images/nature/nature_13.jpg",
    "assets/images/nature/nature_14.jpg",
    "assets/images/nature/nature_15.jpg",
    "assets/images/nature/nature_17.jpg",
    "assets/images/nature/nature_24.jpg",
    "assets/images/nature/nature_27.jpg",
    "assets/images/nature/nature_28.jpg",
    "assets/images/nature/nature_29.jpg",
    "assets/images/nature/nature_3.jpg",
    "assets/images/nature/nature_4.jpg",
    "assets/images/nature/nature_5.jpg",
    "assets/images/nature/nature_7.jpg",
    "assets/images/nature/nature_9.jpg",
    "assets/images/other/other_1.jpg",
    "assets/images/other/other_10.jpg",
    "assets/images/other/other_11.jpg",
    "assets/images/other/other_12.jpg",
    "assets/images/other/other_2.jpg",
    "assets/images/other/other_4.jpg",
    "assets/images/other/other_5.jpg",
    "assets/images/other/other_9.jpg",
    "assets/images/portrait/portrait_7.jpg",
    "assets/images/portrait/portrait_6.jpg",
    "assets/images/portrait/portrait_17.jpg",
    "assets/images/portrait/portrait_13.jpg",
    "assets/images/portrait/portrait_8.jpg",
    "assets/images/portrait/portrait_9.jpg",
    "assets/images/street/street_103.jpg",
    "assets/images/street/street_11.jpg",
    "assets/images/street/street_122.jpg",
    "assets/images/street/street_124.jpg",
    "assets/images/street/street_14.jpg",
    "assets/images/street/street_20.jpg",
    "assets/images/street/street_21.jpg",
    "assets/images/street/street_23.jpg",
    "assets/images/street/street_27.jpg",
    "assets/images/street/street_29.jpg",
    "assets/images/street/street_3.jpg",
    "assets/images/street/street_31.jpg",
    "assets/images/street/street_35.jpg",
    "assets/images/street/street_39.jpg",
    "assets/images/street/street_43.jpg",
    "assets/images/street/street_52.jpg",
    "assets/images/street/street_53.jpg",
    "assets/images/street/street_54.jpg",
    "assets/images/street/street_57.jpg",
    "assets/images/street/street_59.jpg",
    "assets/images/street/street_62.jpg",
    "assets/images/street/street_63.jpg",
    "assets/images/street/street_64.jpg",
    "assets/images/street/street_66.jpg",
    "assets/images/street/street_67.jpg",
    "assets/images/street/street_68.jpg",
    "assets/images/street/street_71.jpg",
    "assets/images/street/street_72.jpg",
    "assets/images/street/street_74.jpg",
    "assets/images/street/street_81.jpg",
    "assets/images/street/street_83.jpg",
    "assets/images/street/street_84.jpg",
    "assets/images/street/street_92.jpg",
    "assets/images/street/street_94.jpg",
    "assets/images/street/street_95.jpg",
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    if (hero) {
      const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];
      hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.35)), url("${randomImage}")`;
    }
  });
}

// ========== FOOTER ==========
async function loadFooter() {
    try {
      const response = await fetch('footer.html');
      const footerHTML = await response.text();
      document.getElementById('footer-placeholder').innerHTML = footerHTML;
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', loadFooter);

  // back to top button
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });