// State Variables
let wishesData = [];
let currentPageIndex = 0;
let isAudioPlaying = false;

// Curated Portrait Photos of Jimmy Jitaraphol (@jimmyyjp)
// High resolution vertical portrait URLs centered on face & eyes
const JIMMY_INSTAGRAM_PHOTOS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1492447105260-2e947425b5cc?auto=format&fit=crop&w=800&q=80'
];

// 6 Non-identical Design Styles
const CARD_STYLES = [
  'style-polaroid',
  'style-glass',
  'style-vintage',
  'style-film',
  'style-pastel',
  'style-gentleman'
];

// DOM Elements
const flipbookSection = document.getElementById('flipbookSection');
const gridSection = document.getElementById('gridSection');
const btnFlipbookView = document.getElementById('btnFlipbookView');
const btnGridView = document.getElementById('btnGridView');
const activeCardContainer = document.getElementById('activeCardContainer');
const cardsGridContainer = document.getElementById('cardsGridContainer');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const pageIndicatorText = document.getElementById('pageIndicatorText');
const pageDots = document.getElementById('pageDots');

// Audio Player & Volume Button Elements
const bgAudio = document.getElementById('bgAudio');
const volumeBtn = document.getElementById('volumeBtn');
const volumeIcon = document.getElementById('volumeIcon');

document.addEventListener('DOMContentLoaded', () => {
  fetchWishesData();

  // View toggle listeners
  btnFlipbookView.addEventListener('click', () => switchView('flipbook'));
  btnGridView.addEventListener('click', () => switchView('grid'));
  prevPageBtn.addEventListener('click', goToPrevPage);
  nextPageBtn.addEventListener('click', goToNextPage);

  // Audio Control listener
  volumeBtn.addEventListener('click', toggleAudio);

  // Auto-play audio on first user click anywhere if blocked by browser policy
  document.body.addEventListener('click', initAutoplayOnFirstClick, { once: true });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (flipbookSection.classList.contains('active')) {
      if (e.key === 'ArrowLeft') goToPrevPage();
      if (e.key === 'ArrowRight') goToNextPage();
    }
  });
});

// Fetch Data from Server API
async function fetchWishesData() {
  try {
    const res = await fetch('/api/wishes');
    const data = await res.json();
    if (data.success) {
      wishesData = data.wishes;
      renderCurrentPage();
      renderGridCards();
      renderPageDots();
    }
  } catch (err) {
    console.error('Error fetching wishes:', err);
  }
}

// Switch View Mode (Flipbook vs Grid)
function switchView(viewName) {
  if (viewName === 'flipbook') {
    flipbookSection.classList.add('active');
    gridSection.classList.remove('active');
    btnFlipbookView.classList.add('active');
    btnGridView.classList.remove('active');
  } else {
    gridSection.classList.add('active');
    flipbookSection.classList.remove('active');
    btnGridView.classList.add('active');
    btnFlipbookView.classList.remove('active');
    renderGridCards();
  }
}

// Get photo URL for card index (Randomized / Cycled from Jimmy's Instagram list)
function getJimmyPhotoForIndex(index) {
  // Deterministic random mix based on index
  const photoIdx = (index * 7 + 3) % JIMMY_INSTAGRAM_PHOTOS.length;
  return JIMMY_INSTAGRAM_PHOTOS[photoIdx];
}

// Create Card HTML element for a given wish item
function createCardElement(wishItem, index) {
  const styleClass = CARD_STYLES[index % CARD_STYLES.length];
  const photoUrl = getJimmyPhotoForIndex(index);
  const isFb = wishItem.fb && wishItem.fb.startsWith('http');

  // Decorative stamp/stickers
  let extraDecoration = '';
  if (styleClass === 'style-polaroid') {
    extraDecoration = '<div class="tape-sticker"></div>';
  } else if (styleClass === 'style-vintage') {
    extraDecoration = '<div class="postal-stamp">JIMMY<br>AUG 21</div>';
  }

  const cardDiv = document.createElement('div');
  cardDiv.className = `memory-card ${styleClass}`;
  cardDiv.innerHTML = `
    ${extraDecoration}
    <div class="card-top">
      <span class="card-badge">Trang #${index + 1}</span>
      <span style="font-size: 0.8rem; opacity: 0.8;"><i class="fa-solid fa-sparkles"></i> 32nd Birthday</span>
    </div>

    <div class="card-image-wrap">
      <img src="${photoUrl}" alt="Jimmy Jitaraphol" loading="lazy">
    </div>

    <div class="card-body">
      <div class="fan-name">
        <i class="fa-solid fa-star" style="color:#f1c40f; font-size: 0.9rem;"></i> ${escapeHtml(wishItem.name)}
      </div>
      <div class="fan-wish">${escapeHtml(wishItem.wish)}</div>
    </div>

    <div class="card-footer">
      <span>Sinh nhật 32 tuổi P'Jim</span>
      ${isFb ? `<a href="${escapeHtml(wishItem.fb)}" target="_blank" rel="noopener" class="fb-link"><i class="fa-brands fa-facebook"></i> Facebook</a>` : ''}
    </div>
  `;

  return cardDiv;
}

// Render Flipbook Current Active Card
function renderCurrentPage() {
  activeCardContainer.innerHTML = '';
  if (wishesData.length === 0) return;

  if (currentPageIndex >= wishesData.length) currentPageIndex = 0;
  if (currentPageIndex < 0) currentPageIndex = wishesData.length - 1;

  const currentWish = wishesData[currentPageIndex];
  const cardElement = createCardElement(currentWish, currentPageIndex);
  activeCardContainer.appendChild(cardElement);

  pageIndicatorText.textContent = `Trang ${currentPageIndex + 1} / ${wishesData.length}`;
  prevPageBtn.disabled = currentPageIndex === 0;
  nextPageBtn.disabled = currentPageIndex === wishesData.length - 1;

  updatePageDotsActive();
}

// Render Grid Cards View
function renderGridCards() {
  cardsGridContainer.innerHTML = '';
  wishesData.forEach((wish, idx) => {
    const cardEl = createCardElement(wish, idx);
    cardsGridContainer.appendChild(cardEl);
  });
}

// Render Pagination Dots
function renderPageDots() {
  pageDots.innerHTML = '';
  const total = wishesData.length;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.className = `dot ${i === currentPageIndex ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      currentPageIndex = i;
      renderCurrentPage();
    });
    pageDots.appendChild(dot);
  }
}

function updatePageDotsActive() {
  const dots = pageDots.querySelectorAll('.dot');
  dots.forEach((dot, idx) => {
    if (idx === currentPageIndex) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

// Page Navigation
function goToPrevPage() {
  if (currentPageIndex > 0) {
    currentPageIndex--;
    renderCurrentPage();
  }
}

function goToNextPage() {
  if (currentPageIndex < wishesData.length - 1) {
    currentPageIndex++;
    renderCurrentPage();
  }
}

// Audio Toggle Functionality
function toggleAudio() {
  if (bgAudio.paused) {
    bgAudio.play().then(() => {
      isAudioPlaying = true;
      volumeBtn.classList.add('playing');
      volumeIcon.className = 'fa-solid fa-volume-high';
    }).catch(err => {
      console.log('Audio autoplay prevented:', err);
    });
  } else {
    bgAudio.pause();
    isAudioPlaying = false;
    volumeBtn.classList.remove('playing');
    volumeIcon.className = 'fa-solid fa-volume-xmark';
  }
}

function initAutoplayOnFirstClick() {
  if (bgAudio.paused) {
    bgAudio.play().then(() => {
      isAudioPlaying = true;
      volumeBtn.classList.add('playing');
      volumeIcon.className = 'fa-solid fa-volume-high';
    }).catch(e => {});
  }
}

// Utility: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function (m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
