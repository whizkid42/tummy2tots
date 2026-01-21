/* =========================
   CONFIG
========================= */
const WHATSAPP_NUMBER = "919901753839";

/* =========================
   STATE
========================= */
let userLocation = null;
let pendingAction = null;
let pendingGown = null;
let galleryImages = [];
let currentImageIndex = 0;


/* =========================
   GOWN DATA 
========================= */
const gowns = [
  { name: "CICILIA", images: ["https://lh3.googleusercontent.com/d/1g5Z5l68PUkOKcKKO0WBbLtNuEwWWtb9K",
    "https://lh3.googleusercontent.com/d/1HFtk6lArnw75DU3n_IM0Yt3XKqQGjCwu"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "PEARL BLOSSOM", images: ["https://lh3.googleusercontent.com/d/1AmNdzdR0mugLq7w57xC5Nbqr5MJ-Vp9I",
    "https://lh3.googleusercontent.com/d/1oaqSAlbaX07qX6-g5qoFD4zrR0kn_e9l"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 11200 },
  { name: "CRYSTAL THREAD", images: ["https://lh3.googleusercontent.com/d/1lEP_uy8PyZkChfJ-x2p3PRgBkJck9ANy",
    "https://lh3.googleusercontent.com/d/1h5RkqqNPz-sduz7bXJ97WrbP-P5bBQYf"], rentBangalore: 2000, rentOutstation: 2500, buyPrice: 11220 },
  { name: "FLORIDA", images: ["https://lh3.googleusercontent.com/d/1J1sPBoPfYZiM1D60njD9DFAZ-Et4Amgz",
    "https://lh3.googleusercontent.com/d/1Aj2HYp1WDLuValAVtQjxflocntM0z7SK"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "WHITE DREAM", images: ["https://lh3.googleusercontent.com/d/1hT40nZRaNUgdh5M6W9w19ZxiZLizsiMC",
    "https://lh3.googleusercontent.com/d/1i7b6sEayD_5OQti-D16xLKYJ8-sx95d2"], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 5500 },
  { name: "SKY ELEGANCE", images: ["https://lh3.googleusercontent.com/d/1Ax-fNzin10Kc4ZxSshMb7ZxLsODxndCV",
    "https://lh3.googleusercontent.com/d/1ppIFZQCQmebCiwIWu3R93bNq1T1wwOaB"], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 5000 },
  { name: "CHERRY ROSE", images: ["https://lh3.googleusercontent.com/d/1AD5G25J6se0NpMythQftBDV-6YJ_UK3O",
    "https://lh3.googleusercontent.com/d/1QOgC9x3ke3K2c553xEp8oqrnK1LDhPQ1"], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "SHIMMER PINK", images: ["https://lh3.googleusercontent.com/d/138HLlDDCZscmERC2ZMk2u1lJoVnn9VCS",
    "https://lh3.googleusercontent.com/d/15GlD-x1F6kG04hD9hTMTwVVWWTRryF2y"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 15000 },
  { name: "INDIGO", images: ["https://lh3.googleusercontent.com/d/19TaSosYoInoYCcQnvp-yImfaW4d5qC4z",
    "https://lh3.googleusercontent.com/d/18Lvhn554Hl1Z1CuFdrbtSUWwhDTbGEXu"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 14 },
  { name: "CREAMY PEARL", images: ["https://lh3.googleusercontent.com/d/1uX5tJSOdimc_afEMR0lWUM-pNCqbid1-",
    "https://lh3.googleusercontent.com/d/1sAHIH8gC8AX_EU8CtylA3me29CmAikUr"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "GREEN GLOW", images: ["https://lh3.googleusercontent.com/d/1vmAiIaDhiNxIQcmd6irhAWtNKWRSAJ_q",
    "https://lh3.googleusercontent.com/d/1IHI0XKLDaLLjsvBryCCvJZRKRmGOcFqm"], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "MOCHA MAGIC", images: ["https://lh3.googleusercontent.com/d/1BQWr1cFKKOYjKqDsduWCmjObm2RBQATp",
    "https://lh3.googleusercontent.com/d/15z7XP3axms6ih756BrGgO9goZ9Awx3qp"], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 6000 },
  { name: "AURORA", images: ["https://lh3.googleusercontent.com/d/1I-uyN8DvCB4ggLzxwihDtl4eKM6LvZLK",
    "https://lh3.googleusercontent.com/d/12n5cKxMZOqcLC4ObEpcsnw2ZSIymbwG9"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 10000 },
  { name: "CARAMEL LUX", images: ["https://lh3.googleusercontent.com/d/1_SuGgDYuSDw9h5ZTXVypzWdfY9q2SKAh",
    "https://lh3.googleusercontent.com/d/1zkaB1rbC95-pJh19ITLwqXP6I7csM1t_"], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 10000 },
  { name: "GRACY", images: ["https://lh3.googleusercontent.com/d/1_577x7jD1PWQrBmBZj-kM4rpi_JQ372b",
    "https://lh3.googleusercontent.com/d/1x-rK42Nvo3SOPkpzNWnfxiHS4deT_IEx"], rentBangalore: 2000, rentOutstation: 2500, buyPrice: 15000 },
  { name: "RED VELVET", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 9000 },
  { name: "BLACK VELVET", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 5000 },
  { name: "WINCY", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 5000 },
  { name: "TULIP", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "ROSY RED", images: [], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 3500 },
  { name: "SUNFLOWER", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "BLACK BLISS", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 9000 },
  { name: "ELENA", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "BOLD RED", images: [], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 4500 },
  { name: "PIHU PEACH", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13500 },
  { name: "GREEN GLORY", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "MEHNDI GREEN", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 7500 },
  { name: "GRAPE WINE", images: [], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 8000 },
  { name: "VIOLET PAPER", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 7000 },
  { name: "SNOW WHITE", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 7000 },
  { name: "PINK PEARL", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "WHITE PEARL", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 7500 },
  { name: "WHITE MARBLE", images: [], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 4000 },
  { name: "MANGO YELLOW", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "LACY BLACK", images: [], rentBangalore: 1200, rentOutstation: 1700, buyPrice: 6500 },
  { name: "VIOLET PINK", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 145 },
  { name: "DAHLIA", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "LOVELY LAVENDER", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 9000 },
  { name: "FLAKY SNOW", images: [], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 9500 },
  { name: "DUSTY DAFFODILS", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "BLUE BUSH", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "CHERRY BLOSSOM", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 9000 },
  { name: "BLOSSOMY BLISS", images: [], rentBangalore: 1500, rentOutstation: 2300, buyPrice: 9000 },
  { name: "BLURRY NIGHT", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 15000 },
  { name: "HYDRA", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "FURY BEIGE", images: [], rentBangalore: 2000, rentOutstation: 2500, buyPrice: 13000 },
  { name: "WHITE LILY", images: [], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 8200 },
  { name: "CAMILLE", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "MIDNIGHT", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 14000 },
  { name: "BLUE LILLY", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 9000 },
  { name: "BLUE BELL", images: [], rentBangalore: 2000, rentOutstation: 2500, buyPrice: 10000 },
  { name: "SKY LILLY", images: [], rentBangalore: 2000, rentOutstation: 2500, buyPrice: 18000 },
  { name: "GOLDEN SHOWER", images: [], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 9000 },
  { name: "DAISY", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "MARIE GOLD", images: [], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 11000 },
  { name: "DARK CHOCOLATE", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "MORNING GLORY", images: [], rentBangalore: 2000, rentOutstation: 2500, buyPrice: 18000 },
  { name: "PLUMERIA", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "BARBIE", images: [], rentBangalore: 1500, rentOutstation: 2000, buyPrice: 8000 },
  { name: "CINDERELLA", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 11000 },
  { name: "BLACK PEARL", images: [], rentBangalore: 1000, rentOutstation: 1500, buyPrice: 4500 },
  { name: "ONION PINK", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 7500 },
  { name: "CARNATION PINK", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 9000 },
  { name: "BOHO WHITE", images: [], rentBangalore: 1300, rentOutstation: 1800, buyPrice: 8000 },
  { name: "MISTY BLUE", images: [], rentBangalore: 1800, rentOutstation: 2300, buyPrice: 13000 },
  { name: "WHITE DRAPE", images: [], rentBangalore: 800, rentOutstation: 1300, buyPrice: 2000 }
];


/* =========================
   LOCATION LOGIC
========================= */
function setLocation(loc) {
  userLocation = loc;
  document.getElementById("locationModal").style.display = "none";
  renderGowns();
}

function openLocationModal() {
  document.getElementById("locationModal").style.display = "flex";
}

/* =========================
   RENDER
========================= */
function renderGowns() {
  const grid = document.getElementById("gownGrid");
  grid.innerHTML = "";

  gowns.forEach(gown => {
    const price =
      userLocation === "Bangalore"
        ? gown.rentBangalore
        : gown.rentOutstation;

    const card = document.createElement("div");
    card.className = "gown-card";
    card.onclick = () => openGallery(gown.images, gown.name);

    card.innerHTML = `
      <img src="${gown.images[0]}" alt="${gown.name}">
      <div class="gown-content">
        <h4>${gown.name}</h4>
        <div class="price">Rent: ₹${price.toLocaleString()}</div>
        <div class="price">Buy: ₹${gown.buyPrice.toLocaleString()}</div>
        <div class="actions">
          <button class="rent" onclick="event.stopPropagation(); openConfirm('rent','${gown.name}')">Rent</button>
          <button class="buy" onclick="event.stopPropagation(); openConfirm('buy','${gown.name}')">Buy</button>

        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* =========================
   WHATSAPP FLOWS
========================= */
function sendRentMessage(name) {
  const msg =
    `Hi tummy2tots,%0AI'm interested in renting the gown: ${name}%0ALocation: ${userLocation}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}

function sendBuyMessage(name) {
  const msg =
    `Hi tummy2tots,%0AI'm interested in buying the gown: ${name}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}

function openConfirm(action, gownName) {
  pendingAction = action;
  pendingGown = gownName;

  document.getElementById("confirmTitle").innerText =
    action === "rent" ? "Confirm Rental" : "Confirm Purchase";

  document.getElementById("confirmText").innerText =
    `Do you want to ${action} the gown "${gownName}"?`;

  document.getElementById("confirmModal").style.display = "flex";
}

function closeConfirmModal() {
  document.getElementById("confirmModal").style.display = "none";
  pendingAction = null;
  pendingGown = null;
}

function confirmAction() {
  if (pendingAction === "rent") {
    sendRentMessage(pendingGown);
  } else if (pendingAction === "buy") {
    sendBuyMessage(pendingGown);
  }
  closeConfirmModal();
}

function openGallery(images, title) {
  galleryImages = images;
  currentImageIndex = 0;

  document.getElementById("galleryTitle").innerText = title;
  document.getElementById("galleryModal").style.display = "flex";

  updateGalleryImage();
}

function updateGalleryImage() {
  document.getElementById("galleryImage").src =
    galleryImages[currentImageIndex];

  document.getElementById("imageCounter").innerText =
    `${currentImageIndex + 1} / ${galleryImages.length}`;
}

function nextImage() {
  currentImageIndex =
    (currentImageIndex + 1) % galleryImages.length;
  updateGalleryImage();
}

function prevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) %
    galleryImages.length;
  updateGalleryImage();
}

function closeGallery() {
  document.getElementById("galleryModal").style.display = "none";
}