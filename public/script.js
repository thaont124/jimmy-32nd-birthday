// State Variables
let wishesData = [];
let currentPageIndex = 0;
let isAudioPlaying = false;

// 81 Authentic Jimmy Jitaraphol Photos downloaded locally from the user's provided list!
const TOTAL_JIMMY_PHOTOS = 81;
let JIMMY_PHOTOS = Array.from({ length: TOTAL_JIMMY_PHOTOS }, (_, i) => `/assets/jimmy/jimmy_${i + 1}.jpg`);

// Fisher-Yates Shuffle Algorithm to randomize photo order on every page load
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 6 Visual Color & Texture Styles
const CARD_STYLES = [
  'style-polaroid',
  'style-glass',
  'style-vintage',
  'style-film',
  'style-pastel',
  'style-gentleman'
];

// 6 Completely Distinct Structural Layouts (Mỗi trang 1 kiểu bố cục khác nhau)
const CARD_LAYOUTS = [
  'layout-v1-polaroid',      // Top Photo + Bottom Handwritten Note
  'layout-v2-split-left',     // Left Photo + Right Quote Box
  'layout-v3-split-right',    // Left Wish Letter + Right Photo
  'layout-v4-card-hero',      // Top Hero Quote Banner + Bottom Photo
  'layout-v5-vintage-letter', // Postcard Letter with Stamp + Off-center Photo
  'layout-v6-film-wide'       // Cinematic Film Strip + Dark Glow Note
];

// DOM Elements
const flipbookSection = document.getElementById('flipbookSection');
const gridSection = document.getElementById('gridSection');
const deckSection = document.getElementById('deckSection');
const btnFlipbookView = document.getElementById('btnFlipbookView');
const btnGridView = document.getElementById('btnGridView');
const btnDeckView = document.getElementById('btnDeckView');
const activeCardContainer = document.getElementById('activeCardContainer');
const cardsGridContainer = document.getElementById('cardsGridContainer');
const cardsDeckContainer = document.getElementById('cardsDeckContainer');
const shuffleDeckBtn = document.getElementById('shuffleDeckBtn');
const btnFanMode = document.getElementById('btnFanMode');
const btnStackMode = document.getElementById('btnStackMode');
const btnCascadeMode = document.getElementById('btnCascadeMode');
const deckModalOverlay = document.getElementById('deckModalOverlay');
const closeDeckModalBtn = document.getElementById('closeDeckModalBtn');
const deckModalCardBody = document.getElementById('deckModalCardBody');
const goToFlipbookFromDeckBtn = document.getElementById('goToFlipbookFromDeckBtn');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const pageIndicatorText = document.getElementById('pageIndicatorText');
const pageDots = document.getElementById('pageDots');

let selectedDeckCardIndex = 0;

// Audio Player & Volume Button Elements
const bgAudio = document.getElementById('bgAudio');
const volumeBtn = document.getElementById('volumeBtn');
const volumeIcon = document.getElementById('volumeIcon');

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('flipbook-mode');
  
  // Randomize photo assignments on every page load
  shuffleArray(JIMMY_PHOTOS);

  fetchWishesData();

  // View toggle listeners
  btnFlipbookView.addEventListener('click', () => switchView('flipbook'));
  btnGridView.addEventListener('click', () => switchView('grid'));
  btnDeckView.addEventListener('click', () => switchView('deck'));
  
  if (shuffleDeckBtn) shuffleDeckBtn.addEventListener('click', shuffleAndPickRandomCard);
  if (btnFanMode) btnFanMode.addEventListener('click', () => setDeckSubMode('fan'));
  if (btnStackMode) btnStackMode.addEventListener('click', () => setDeckSubMode('stack'));
  if (btnCascadeMode) btnCascadeMode.addEventListener('click', () => setDeckSubMode('cascade'));

  if (closeDeckModalBtn) closeDeckModalBtn.addEventListener('click', closeDeckModal);
  if (deckModalOverlay) {
    deckModalOverlay.addEventListener('click', (e) => {
      if (e.target === deckModalOverlay) closeDeckModal();
    });
  }
  if (goToFlipbookFromDeckBtn) {
    goToFlipbookFromDeckBtn.addEventListener('click', () => {
      closeDeckModal();
      currentPageIndex = selectedDeckCardIndex;
      switchView('flipbook');
    });
  }

  prevPageBtn.addEventListener('click', goToPrevPage);
  nextPageBtn.addEventListener('click', goToNextPage);

  // Audio Control listener
  volumeBtn.addEventListener('click', toggleAudio);

  // Auto-play audio on first user click anywhere if blocked by browser policy
  document.body.addEventListener('click', initAutoplayOnFirstClick, { once: true });

  // Keyboard & ESC navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDeckModal();
    if (flipbookSection.classList.contains('active')) {
      if (e.key === 'ArrowLeft') goToPrevPage();
      if (e.key === 'ArrowRight') goToNextPage();
    }
  });

  // Responsive resize listener for Deck layout
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (deckSection && deckSection.classList.contains('active')) {
        renderDeckCards();
      }
    }, 150);
  });
});

// Fetch Data from Server API (with automatic static fallback for Cloudflare Pages / Vercel / GitHub Pages)
async function fetchWishesData() {
  try {
    const res = await fetch('/api/wishes');
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.wishes) && data.wishes.length > 0) {
        wishesData = data.wishes;
        renderAllViews();
        return;
      }
    }
  } catch (err) {
    console.log('Server API endpoint not available, falling back to static wishes.json file...');
  }

  // Fallback for static hosting (Cloudflare Pages / Vercel / GitHub Pages)
  try {
    const staticRes = await fetch('/wishes.json');
    if (staticRes.ok) {
      const data = await staticRes.json();
      if (Array.isArray(data) && data.length > 0) {
        wishesData = data;
        renderAllViews();
        return;
      }
    }
  } catch (err) {
    console.error('Error fetching static wishes.json:', err);
  }
}

function renderAllViews() {
  renderCurrentPage();
  renderGridCards();
  renderDeckCards();
  renderPageDots();
}

// Switch View Mode (Flipbook vs Grid vs Deck)
function switchView(viewName) {
  if (viewName === 'flipbook') {
    flipbookSection.classList.add('active');
    gridSection.classList.remove('active');
    deckSection.classList.remove('active');
    btnFlipbookView.classList.add('active');
    btnGridView.classList.remove('active');
    btnDeckView.classList.remove('active');
    document.body.classList.add('flipbook-mode');
  } else if (viewName === 'grid') {
    gridSection.classList.add('active');
    flipbookSection.classList.remove('active');
    deckSection.classList.remove('active');
    btnGridView.classList.add('active');
    btnFlipbookView.classList.remove('active');
    btnDeckView.classList.remove('active');
    document.body.classList.remove('flipbook-mode');
    renderGridCards();
  } else if (viewName === 'deck') {
    deckSection.classList.add('active');
    flipbookSection.classList.remove('active');
    gridSection.classList.remove('active');
    btnDeckView.classList.add('active');
    btnFlipbookView.classList.remove('active');
    btnGridView.classList.remove('active');
    document.body.classList.remove('flipbook-mode');
    renderDeckCards();
  }
}

// Get photo URL for card index (Randomized unique photo for each card)
function getJimmyPhotoForIndex(index) {
  return JIMMY_PHOTOS[index % JIMMY_PHOTOS.length];
}

// Create Card HTML element for a given wish item
function createCardElement(wishItem, index) {
  const styleClass = CARD_STYLES[index % CARD_STYLES.length];
  const layoutClass = CARD_LAYOUTS[index % CARD_LAYOUTS.length];
  
  const photoUrl = getJimmyPhotoForIndex(index);
  const fallbackUrl = '/assets/jimmy/jimmy_1.jpg';
  const wishText = wishItem.wish ? wishItem.wish.trim() : '';

  // Phân loại độ dài chính xác 100%:
  // - Short: < 80 ký tự
  // - Medium: 80 - 350 ký tự (như bài Đoàn Lê Na -> Căn giữa 100%)
  // - Long: > 350 ký tự (như bài Jinnie -> Bắt đầu từ Dòng 1 & Cuộn mượt)
  let lengthClass = 'medium-wish-card';
  if (wishText.length < 80) {
    lengthClass = 'short-wish-card';
  } else if (wishText.length > 350) {
    lengthClass = 'long-wish-card';
  }

  // Unique decorative accents for scrapbook feeling
  let extraDecoration = '';
  if (layoutClass === 'layout-v1-polaroid') {
    extraDecoration = '<div class="tape-sticker"></div>';
  } else if (layoutClass === 'layout-v5-vintage-letter') {
    extraDecoration = '<div class="postal-stamp">JIMMY<br>AUG 21</div><div class="wax-seal">★</div>';
  } else if (layoutClass === 'layout-v6-film-wide') {
    extraDecoration = '<div class="film-holes-top"></div><div class="film-holes-bottom"></div>';
  } else if (layoutClass === 'layout-v3-split-right') {
    extraDecoration = '<div class="ribbon-tag">HAPPY 32ND</div>';
  }

  const cardDiv = document.createElement('div');
  cardDiv.className = `memory-card ${styleClass} ${layoutClass} ${lengthClass}`;
  cardDiv.innerHTML = `
    ${extraDecoration}
    
    <div class="card-top">
      <span class="card-badge"><i class="fa-solid fa-bookmark"></i> Trang #${index + 1}</span>
      <span class="birthday-tag"><i class="fa-solid fa-sparkles"></i> 32nd Birthday</span>
    </div>

    <div class="card-content-wrapper">
      <div class="card-image-wrap">
        <img src="${photoUrl}" alt="Jimmy Jitaraphol" loading="lazy" onerror="this.onerror=null; this.src='${fallbackUrl}'">
      </div>

      <div class="card-body">
        <div class="fan-name">
          <i class="fa-solid fa-heart" style="color:#e74c3c; font-size: 0.9rem;"></i> ${escapeHtml(wishItem.name)}
        </div>
        
        <div class="wish-container">
          <i class="fa-solid fa-quote-left quote-bg"></i>
          <div class="fan-wish">${escapeHtml(wishText)}</div>
        </div>

        ${lengthClass === 'short-wish-card' ? '<div class="wish-decor-sparkles">✦ ─── 💖 ✨ 💖 ─── ✦</div>' : ''}
      </div>
    </div>

    <div class="card-footer">
      <span><i class="fa-solid fa-cake-candles" style="color:var(--gold-accent);"></i> Sinh nhật 32 tuổi P'Jim</span>
      <span>Jimmy Jitaraphol</span>
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

  // Đảm bảo bài chúc dài luôn ở vị trí scrollTop = 0 khi lật sang trang
  const wishContainer = cardElement.querySelector('.wish-container');
  if (wishContainer) wishContainer.scrollTop = 0;

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

// ==========================================================
// CHIA BÀI TÂY (CARDS FAN / DECK SPREAD MODE) LOGIC
// ==========================================================
const CARD_SUITS = ['♠', '♥', '♣', '♦'];
const CARD_RANKS = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

let currentDeckSubMode = 'fan';

function setDeckSubMode(mode) {
  currentDeckSubMode = mode;
  [btnFanMode, btnStackMode, btnCascadeMode].forEach(btn => {
    if (btn) btn.classList.remove('active');
  });
  if (mode === 'fan' && btnFanMode) btnFanMode.classList.add('active');
  if (mode === 'stack' && btnStackMode) btnStackMode.classList.add('active');
  if (mode === 'cascade' && btnCascadeMode) btnCascadeMode.classList.add('active');
  renderDeckCards();
}

function renderDeckCards() {
  if (!cardsDeckContainer) return;
  cardsDeckContainer.innerHTML = '';
  cardsDeckContainer.className = `cards-deck ${currentDeckSubMode}-mode`;
  if (wishesData.length === 0) return;

  const N = wishesData.length;
  const middleIndex = (N - 1) / 2;

  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  wishesData.forEach((wishItem, idx) => {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'playing-card-wrapper';
    
    // Playing Card Suit & Rank
    const suit = CARD_SUITS[idx % CARD_SUITS.length];
    const rank = CARD_RANKS[idx % CARD_RANKS.length];
    const isRed = suit === '♥' || suit === '♦';

    cardWrapper.setAttribute('data-suit', suit);
    cardWrapper.setAttribute('data-rank', rank);
    cardWrapper.style.zIndex = idx + 1;

    // Calculate layout transforms based on submode and screen size
    let transformStr = '';
    if (currentDeckSubMode === 'fan') {
      const maxSpanX = isSmallMobile ? 240 : isMobile ? 360 : 820;
      const maxAngle = isSmallMobile ? 32 : isMobile ? 46 : 70;
      const angleStep = Math.min(2.0, maxAngle / N);
      const rotation = (idx - middleIndex) * angleStep;
      const xStep = Math.min(isSmallMobile ? 12 : isMobile ? 18 : 36, maxSpanX / N);
      const translateX = (idx - middleIndex) * xStep;
      const arcFactor = isSmallMobile ? 0.22 : isMobile ? 0.38 : (N > 15 ? 0.65 : 1.1);
      const arcY = Math.pow(idx - middleIndex, 2) * arcFactor;
      transformStr = `translate3d(${translateX}px, ${arcY}px, 0) rotate(${rotation}deg)`;
    } else if (currentDeckSubMode === 'stack') {
      const offsetX = (idx % 3 - 1) * (isMobile ? 3 : 6);
      const offsetY = idx * (isMobile ? 2 : 3.5);
      const rotation = (idx % 5 - 2) * 1.2;
      transformStr = `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${rotation}deg)`;
    } else if (currentDeckSubMode === 'cascade') {
      const stepX = isSmallMobile ? 16 : isMobile ? 22 : 45;
      const translateX = (idx - middleIndex) * stepX;
      const offsetY = (idx % 2) * (isMobile ? 10 : 18);
      const rotation = (idx % 3 - 1) * 2;
      transformStr = `translate3d(${translateX}px, ${offsetY}px, 0) rotate(${rotation}deg)`;
    }

    cardWrapper.style.transform = transformStr;

    // Create standard memory card
    const innerCard = createCardElement(wishItem, idx);
    
    // Add Poker Badge to top right of card
    const pokerBadge = document.createElement('div');
    pokerBadge.className = `poker-badge ${isRed ? 'red-suit' : 'black-suit'}`;
    pokerBadge.innerHTML = `<span class="badge-rank">${rank}</span><span class="badge-suit">${suit}</span>`;
    innerCard.appendChild(pokerBadge);

    cardWrapper.appendChild(innerCard);

    // Click card to open full-screen focused Modal
    cardWrapper.addEventListener('click', () => {
      openDeckModal(idx);
    });

    cardsDeckContainer.appendChild(cardWrapper);
  });
}

function openDeckModal(idx) {
  if (!wishesData[idx] || !deckModalOverlay || !deckModalCardBody) return;
  selectedDeckCardIndex = idx;
  deckModalCardBody.innerHTML = '';
  const cardElement = createCardElement(wishesData[idx], idx);
  deckModalCardBody.appendChild(cardElement);
  deckModalOverlay.classList.add('active');
}

function closeDeckModal() {
  if (deckModalOverlay) deckModalOverlay.classList.remove('active');
}

function shuffleAndPickRandomCard() {
  if (wishesData.length === 0 || !cardsDeckContainer) return;

  const cardWrappers = cardsDeckContainer.querySelectorAll('.playing-card-wrapper');
  
  // Shuffle animation: fly out randomly
  cardWrappers.forEach((card) => {
    const randomX = (Math.random() - 0.5) * 360;
    const randomY = (Math.random() - 0.5) * 200;
    const randomRot = (Math.random() - 0.5) * 80;
    card.style.transition = 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    card.style.transform = `translate3d(${randomX}px, ${randomY}px, 0) rotate(${randomRot}deg)`;
  });

  // After 400ms, reset deck layout and open random card in modal
  setTimeout(() => {
    renderDeckCards();
    const randomIdx = Math.floor(Math.random() * wishesData.length);
    openDeckModal(randomIdx);
  }, 400);
}
