const stickyHeader = document.querySelector("#stickyHeader");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#navLinks");
const mainImage = document.querySelector("#mainImage");
const thumbs = Array.from(document.querySelectorAll(".thumb"));
const prevSlide = document.querySelector("#prevSlide");
const nextSlide = document.querySelector("#nextSlide");
const zoomPreview = document.querySelector("#zoomPreview");
const zoomImage = document.querySelector("#zoomImage");
const catalogueForm = document.querySelector("#catalogue");
const formNote = document.querySelector("#formNote");
const applicationCard = document.querySelector("#applicationCard");
const prevApp = document.querySelector("#prevApp");
const nextApp = document.querySelector("#nextApp");

const galleryImages = thumbs.map((thumb) => thumb.dataset.image);
let activeSlide = 0;
let activeApplication = 0;

const applications = [
  {
    image: "https://5.imimg.com/data5/SELLER/Default/2025/4/500192521/CF/NW/RB/3971633/irrigation-hdpe-pipe-500x500.jpg",
    title: "Agriculture and Irrigation",
    text: "Durable pipelines designed for steady water distribution and field performance.",
  },
  {
    image: "https://5.imimg.com/data5/SF/NS/MY-3971633/hdpe-gas-pipe-500x500.jpg",
    title: "Industrial Processing",
    text: "Consistent pipe quality for fluid movement, plant utilities, and factory networks.",
  },
  {
    image: "https://5.imimg.com/data5/SELLER/Default/2025/4/500193121/SF/BS/TM/3971633/plb-hdpe-telecom-duct-500x500.jpg",
    title: "Infrastructure Projects",
    text: "Long-lasting pipe systems for municipal supply, drainage, and construction work.",
  },
];

function updateStickyHeader() {
  stickyHeader.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.85);
}

function updateGallery(index) {
  activeSlide = (index + galleryImages.length) % galleryImages.length;
  mainImage.src = galleryImages[activeSlide];
  zoomImage.src = galleryImages[activeSlide];

  thumbs.forEach((thumb, thumbIndex) => {
    thumb.classList.toggle("is-active", thumbIndex === activeSlide);
  });
}

function showZoom() {
  zoomPreview.classList.add("is-visible");
  zoomPreview.setAttribute("aria-hidden", "false");
}

function hideZoom() {
  zoomPreview.classList.remove("is-visible");
  zoomPreview.setAttribute("aria-hidden", "true");
}

function updateApplication(index) {
  activeApplication = (index + applications.length) % applications.length;
  const item = applications[activeApplication];
  applicationCard.querySelector("img").src = item.image;
  applicationCard.querySelector("h3").textContent = item.title;
  applicationCard.querySelector("div p:last-child").textContent = item.text;
}

window.addEventListener("scroll", updateStickyHeader, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => updateGallery(index));
});

prevSlide.addEventListener("click", () => updateGallery(activeSlide - 1));
nextSlide.addEventListener("click", () => updateGallery(activeSlide + 1));

// The Figma requirement asks for a zoomed preview when hovering carousel images.
mainImage.addEventListener("mouseenter", showZoom);
mainImage.addEventListener("focus", showZoom);
mainImage.addEventListener("mouseleave", hideZoom);
mainImage.addEventListener("blur", hideZoom);

catalogueForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "Thank you. The catalogue request has been noted.";
  catalogueForm.reset();
});

prevApp.addEventListener("click", () => updateApplication(activeApplication - 1));
nextApp.addEventListener("click", () => updateApplication(activeApplication + 1));

updateStickyHeader();
updateGallery(0);
