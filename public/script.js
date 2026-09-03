// State Variables
let wishesData = [];
let filteredWishes = [];
let jimmyPhotos = [];
let currentPageIndex = 0;
let isAudioPlaying = false;
let audioContext = null;
let synthTimer = null;

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
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const wishCountBadge = document.getElementById('wishCountBadge');

// Modal Elements
const wishModal = document.getElementById('wishModal');
const photoModal = document.getElementById('photoModal');
const openWishModalBtn = document.getElementById('openWishModalBtn');
const closeWishModalBtn = document.getElementById('closeWishModalBtn');
const managePhotosBtn = document.getElementById('managePhotosBtn');
const closePhotoModalBtn = document.getElementById('closePhotoModalBtn');
const wishForm = document.getElementById('wishForm');
const photoForm = document.getElementById('photoForm');
const photoUrlsInput = document.getElementById('photoUrlsInput');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const musicText = document.getElementById('musicText');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  fetchWishesData();

  // Event Listeners
  btnFlipbookView.addEventListener('click', () => switchView('flipbook'));
  btnGridView.addEventListener('click', () => switchView('grid'));
  prevPageBtn.addEventListener('click', goToPrevPage);
  nextPageBtn.addEventListener('click', goToNextPage);

  searchInput.addEventListener('input', handleSearch);
  clearSearchBtn.addEventListener('click', clearSearch);

  openWishModalBtn.addEventListener('click', () => openModal(wishModal));
  closeWishModalBtn.addEventListener('click', () => closeModal(wishModal));
  managePhotosBtn.addEventListener('click', openPhotoModal);
  closePhotoModalBtn.addEventListener('click', () => closeModal(photoModal));

  wishForm.addEventListener('submit', handleWishSubmit);
  photoForm.addEventListener('submit', handlePhotoSubmit);
  musicToggleBtn.addEventListener('click', toggleBackgroundMusic);

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
      filteredWishes = [...wishesData];
      jimmyPhotos = data.photos && data.photos.length > 0 ? data.photos : [];
      
      updateWishCount();
      renderCurrentPage();
      renderGridCards();
      renderPageDots();
    }
  } catch (err) {
    console.error('Error fetching wishes:', err);
  }
}

function updateWishCount() {
  wishCountBadge.innerHTML = `<i class="fa-solid fa-heart"></i> ${filteredWishes.length} Lời Chúc`;
}

// Switch between Flipbook & Grid View
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

// Get photo URL for card index
function getJimmyPhotoForIndex(index) {
  if (jimmyPhotos.length === 0) {
    return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
  }
  return jimmyPhotos[index % jimmyPhotos.length];
}

// Create Card HTML element for a given wish item
function createCardElement(wishItem, index) {
  const styleClass = CARD_STYLES[index % CARD_STYLES.length];
  const photoUrl = getJimmyPhotoForIndex(index);
  const cardId = wishItem.id;
  const isFb = wishItem.fb && wishItem.fb.startsWith('http');

  // Decorative badges & stamps per style
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
      <button class="like-btn" onclick="handleLike('${cardId}', this)">
        <i class="fa-solid fa-heart"></i> <span class="like-count">${wishItem.likes || 5}</span>
      </button>
    </div>

    <div class="card-image-wrap">
      <img src="${photoUrl}" alt="Jimmy Jitaraphol" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'">
    </div>

    <div class="card-body">
      <div class="fan-name">
        <i class="fa-solid fa-sparkles" style="color:#f1c40f"></i> ${escapeHtml(wishItem.name)}
      </div>
      <div class="fan-wish">${escapeHtml(wishItem.wish)}</div>
    </div>

    <div class="card-footer">
      <span><i class="fa-solid fa-calendar-heart"></i> Sinh nhật 32 tuổi P'Jim</span>
      ${isFb ? `<a href="${escapeHtml(wishItem.fb)}" target="_blank" rel="noopener" class="fb-link"><i class="fa-brands fa-facebook"></i> Facebook</a>` : ''}
    </div>
  `;

  return cardDiv;
}

// Render Flipbook Current Active Card
function renderCurrentPage() {
  activeCardContainer.innerHTML = '';
  if (filteredWishes.length === 0) {
    activeCardContainer.innerHTML = `
      <div class="memory-card style-glass" style="text-align:center; justify-content:center;">
        <h3><i class="fa-solid fa-circle-info"></i> Không tìm thấy lời chúc nào!</h3>
        <p style="margin-top:1rem; color:var(--text-muted);">Thử tìm kiếm với từ khóa khác hoặc bấm nút "Gửi Lời Chúc" để viết lời chúc mới.</p>
      </div>
    `;
    pageIndicatorText.textContent = 'Trang 0 / 0';
    prevPageBtn.disabled = true;
    nextPageBtn.disabled = true;
    return;
  }

  if (currentPageIndex >= filteredWishes.length) currentPageIndex = 0;
  if (currentPageIndex < 0) currentPageIndex = filteredWishes.length - 1;

  const currentWish = filteredWishes[currentPageIndex];
  const cardElement = createCardElement(currentWish, currentPageIndex);
  activeCardContainer.appendChild(cardElement);

  pageIndicatorText.textContent = `Trang ${currentPageIndex + 1} / ${filteredWishes.length}`;
  prevPageBtn.disabled = currentPageIndex === 0;
  nextPageBtn.disabled = currentPageIndex === filteredWishes.length - 1;

  updatePageDotsActive();
}

// Render Grid Cards View
function renderGridCards() {
  cardsGridContainer.innerHTML = '';
  if (filteredWishes.length === 0) {
    cardsGridContainer.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">Không có lời chúc nào khớp với tìm kiếm!</p>`;
    return;
  }

  filteredWishes.forEach((wish, idx) => {
    const cardEl = createCardElement(wish, idx);
    cardsGridContainer.appendChild(cardEl);
  });
}

// Render Pagination Dots
function renderPageDots() {
  pageDots.innerHTML = '';
  const total = filteredWishes.length;
  if (total > 35) return; // Limit dots if too many items

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
  if (currentPageIndex < filteredWishes.length - 1) {
    currentPageIndex++;
    renderCurrentPage();
  }
}

// Search Handler
function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (query.length > 0) {
    clearSearchBtn.style.display = 'block';
    filteredWishes = wishesData.filter(w => 
      (w.name && w.name.toLowerCase().includes(query)) ||
      (w.wish && w.wish.toLowerCase().includes(query))
    );
  } else {
    clearSearchBtn.style.display = 'none';
    filteredWishes = [...wishesData];
  }
  currentPageIndex = 0;
  updateWishCount();
  renderCurrentPage();
  renderGridCards();
  renderPageDots();
}

function clearSearch() {
  searchInput.value = '';
  handleSearch();
}

// Like / Heart Reaction Handler
async function handleLike(wishId, buttonEl) {
  const countSpan = buttonEl.querySelector('.like-count');
  let currentLikes = parseInt(countSpan.textContent) || 0;
  countSpan.textContent = currentLikes + 1;
  buttonEl.style.transform = 'scale(1.25)';
  setTimeout(() => buttonEl.style.transform = 'scale(1)', 200);

  // Trigger heart floating effect
  createHeartParticle(buttonEl);

  try {
    await fetch(`/api/wishes/${wishId}/like`, { method: 'POST' });
  } catch (err) {
    console.error('Error sending like:', err);
  }
}

function createHeartParticle(element) {
  const rect = element.getBoundingClientRect();
  const heart = document.createElement('div');
  heart.innerHTML = '❤️';
  heart.style.position = 'fixed';
  heart.style.left = `${rect.left + rect.width / 2}px`;
  heart.style.top = `${rect.top}px`;
  heart.style.fontSize = '1.5rem';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '999';
  heart.style.transition = 'all 1s ease-out';
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.style.transform = 'translateY(-60px) scale(1.5)';
    heart.style.opacity = '0';
  }, 10);

  setTimeout(() => heart.remove(), 1000);
}

// Modal Helpers
function openModal(modalEl) {
  modalEl.classList.add('active');
}

function closeModal(modalEl) {
  modalEl.classList.remove('active');
}

// Handle Submitting New Wish
async function handleWishSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('fanNameInput').value;
  const fb = document.getElementById('fanFbInput').value;
  const wish = document.getElementById('fanWishInput').value;

  try {
    const res = await fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, fb, wish })
    });
    const data = await res.json();
    if (data.success) {
      alert('🎉 Đã gửi lời chúc sinh nhật tới P\'Jim thành công!');
      wishForm.reset();
      closeModal(wishModal);
      await fetchWishesData();
      currentPageIndex = 0;
      switchView('flipbook');
    }
  } catch (err) {
    alert('Có lỗi xảy ra khi gửi lời chúc!');
  }
}

// Handle Photo URLs Update
function openPhotoModal() {
  photoUrlsInput.value = jimmyPhotos.join('\n');
  openModal(photoModal);
}

async function handlePhotoSubmit(e) {
  e.preventDefault();
  const lines = photoUrlsInput.value.split('\n');
  const photos = lines.map(l => l.trim()).filter(l => l.startsWith('http'));

  try {
    const res = await fetch('/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photos })
    });
    const data = await res.json();
    if (data.success) {
      alert(`✨ Đã lưu ${data.photos.length} link ảnh của P'Jim!`);
      closeModal(photoModal);
      await fetchWishesData();
    }
  } catch (err) {
    alert('Không thể lưu link ảnh!');
  }
}

// Background Music Synthesizer (Ambient Gentle Melody using Web Audio API)
function toggleBackgroundMusic() {
  if (isAudioPlaying) {
    stopSynthMusic();
    musicText.textContent = 'Phát Nhạc';
    musicToggleBtn.classList.remove('active');
    isAudioPlaying = false;
  } else {
    startSynthMusic();
    musicText.textContent = 'Tắt Nhạc';
    musicToggleBtn.classList.add('active');
    isAudioPlaying = true;
  }
}

function startSynthMusic() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23]; // C4, E4, G4, C5, A4, F4
  let noteIdx = 0;

  synthTimer = setInterval(() => {
    if (!isAudioPlaying) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(notes[noteIdx % notes.length], audioContext.currentTime);

    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.8);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + 1.8);

    noteIdx++;
  }, 1200);
}

function stopSynthMusic() {
  if (synthTimer) clearInterval(synthTimer);
}

// Particle Canvas Animation (Floating Stars & Emerald Sparkles)
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      color: Math.random() > 0.4 ? '#a8ff78' : '#d6a2e8'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  animate();
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
