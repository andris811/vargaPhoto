# Varga Photography

A modern, mobile-friendly photography portfolio website to showcase travel and nature photography.  
Built with HTML, CSS, and JavaScript — designed to be hosted on GitHub Pages or any free static site host.

## 🌍 Live Demo

https://andris811.github.io/vargaPhoto/

## 📁 Project Structure

```
varga-photography/
├── index.html          # Landing page with hero image and intro
├── gallery.html        # Dynamic image gallery with lightbox
├── contact.html        # Contact form + Instagram feed
├── /css
│   └── styles.css      # All styles here
├── /js
│   └── gallery.js      # Loads gallery images dynamically
├── /images
│   ├── photo1.jpg      # Full-size images
│   ├── photo1_thumb.jpg# Thumbnail versions
│   └── hero.jpg        # Background image for landing page
```

## ✨ Features

- Responsive layout with sticky navigation bar and mobile burger menu
- Hero section with background image on landing page
- Image gallery using Lightbox2
- Dynamic image loading from the `/images` folder
- Contact form powered by [Formspree](https://formspree.io/)
- Fully accessible with keyboard and screen-reader support
- Minimal dependencies, clean and easy to maintain

## ⚙️ Setup Instructions

1. Clone this repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/varga-photography.git
   cd varga-photography
   ```

2. Add your images to the `/images` folder.
   - Full-size images: `photo1.jpg`, `photo2.jpg`, ...
   - Thumbnails: `photo1_thumb.jpg`, `photo2_thumb.jpg`, ...

3. Set up your [Formspree](https://formspree.io/) form:
   - Replace `YOUR_FORM_ID` in `contact.html` with your form ID.

4. Run locally:
   Simply open `index.html` in your browser.

## 🚀 Deploy to GitHub Pages

1. Push to your GitHub repo.
2. In your repo settings, enable **GitHub Pages** under the **Pages** section.
3. Choose the root directory or `/docs` folder and hit save.
4. Your site will be live at `https://your-username.github.io/varga-photography/`.

## 🧱 Built With

- HTML5 & CSS3
- Vanilla JavaScript
- [Lightbox2](https://lokeshdhakar.com/projects/lightbox2/)
- [Formspree](https://formspree.io/)

## 📸 License

This project is open source and free to use for educational or personal purposes.

---

### Made with ❤️ by Andras

