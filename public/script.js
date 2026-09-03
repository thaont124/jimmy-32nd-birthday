// State Variables
let wishesData = [];
let currentPageIndex = 0;
let isAudioPlaying = false;

// Direct Instagram CDN Image URLs provided by User + High Quality Portrait Photos of Jimmy Jitaraphol
let JIMMY_INSTAGRAM_PHOTOS = [
  "https://instagram.fhan2-5.fna.fbcdn.net/v/t51.82787-15/786827856_18619758646031903_4659904254563312416_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzk3MjEwMTUwMzk0Mjc3MTc3Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMzI3Ny5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=CnTmRoA5VMQQ7kNvwEEmswB&_nc_oc=AdrzY-g1P9LqyX_ZAHPP14GiTk-cnVvNz9UrG-DQ7jeYkVg1mdJRLIrmc04gSIe1LrroBS0Yqpzl_fCF_NwBc5tz&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan2-5.fna&_nc_gid=I5HVLD1kuOUB_2NIPw3mBg&_nc_ss=7a22e&oh=00_AQIGbyJhs8m34ZscYDHIwkcOka6ifdnqjunvgv11M4itww&oe=6A9F626D",
  "https://instagram.fhan2-4.fna.fbcdn.net/v/t51.82787-15/782876245_18618141547031903_7556603494018726563_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=Mzk2ODY0NzIwNjkzNjU4MDE5MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTI1NC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=W9zfxprbWmcQ7kNvwFAswbe&_nc_oc=Adpi3CyMUEdALh5M12vyfUtD2l1lnOVe1yZo25W3GVlfA3qQeQcVONyzF3h-GA7keqlwgNrm1NzI26RbBuweo9aC&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan2-4.fna&_nc_gid=I5HVLD1kuOUB_2NIPw3mBg&_nc_ss=7a22e&oh=00_AQI_Qyu9Fbq4j_PnGBPV8b0JvFl9JColWWcMcTky4zwcfQ&oe=6A9F66F7",
  "https://instagram.fhan20-1.fna.fbcdn.net/v/t51.82787-15/778660457_18618066796031903_5183443227503007078_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=Mzk6ODQ3MDU1ODc1NzA3MTY5MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjMxNi5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=zeF0lPp-0QkQ7kNvwFiROq5&_nc_oc=AdovCDSkKfGicPsbBJIovs1RTBVt1GlPqJyj_LdDbzOYajSbtQAMJVty5l6eAXlvmZvMZBlmb5ylyrVg3tsDVqb7&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan20-1.fna&_nc_gid=I5HVLD1kuOUB_2NIPw3mBg&_nc_ss=7a22e&oh=00_AQIwtlb4DcqvgRLUAtggybwprGTuTW5SvezN5QauDzMR8w&oe=6A9F6287",
  "https://instagram.fhan20-1.fna.fbcdn.net/v/t51.82787-15/775926010_18616937446031903_6701240414164034650_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=Mzk2NjI2MzA1NTc0NzM3NTUwMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMzA3Mi5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=fOdeZ7UiLkkQ7kNvwGj9iv1&_nc_oc=Adr1_xp5LF98ZhSvCQhUohsgzjDL7MQy90SwUQFxGcR3PyjFpb-h9fBGeKnjgK_RsUhPXby4cPcvn31MQ7JSsYVg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan20-1.fna&_nc_gid=I5HVLD1kuOUB_2NIPw3mBg&_nc_ss=7a22e&oh=00_AQJn6V_fub-h9JlYywPiADCxT-3ZCpd4fUMPpRxsZUFT_w&oe=6A9F583A",
  "https://instagram.fhan2-5.fna.fbcdn.net/v/t51.82787-15/747548884_18605406763031903_9210979503805308819_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=107&ig_cache_key=Mzk0MDg0MzkyNTEyNDUwNjYyODE4NjA1NDA6NzYwMDMxOTAz.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjEzMjAuc2RyLnZpZGVvX2RlZmF1bHRfY292ZXJfZnJhbWUuQzMifQ%3D%3D&_nc_ohc=hnhqu5QZsgIQ7kNvwFrKqn1&_nc_oc=AdoYMG8f5KsXBiayDVX9mrm1uwfCEUwe6GjsDfJHAsNBFiPNIrtEgxr6lcEnPpWT5itYzqWhH6HuQKuWGguAndeI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan2-5.fna&_nc_gid=I5HVLD1kuOUB_2NIPw3mBg&_nc_ss=7a22e&oh=00_AQJ2L7KWdFg-dn-oWh0wS-u-ZKQaBQnpS32Oi4a5LnbfYw&oe=6A9F6554",
  "https://instagram.fhan2-5.fna.fbcdn.net/v/t51.82787-15/732586480_18602485807031903_1801311161580779062_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=MzkzMzgyNDY3ODcyODk5MDExNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTM2NS5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=8GrNHmk8jjwQ7kNvwFN0kCm&_nc_oc=AdoH2WTkFDdJuNo5Dt8IDmpeFcWwIswLVqo_VpaBJtOoous2toldzwT1Ac9JFZwdMwkfLqWMfIkNjNvxEQmq6w-Y&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan2-5.fna&_nc_gid=I5HVLD1kuOUB_2NIPw3mBg&_nc_ss=7a22e&oh=00_AQIHaU9bgxSU9vsZBMFElPfKMUITIPUWKRuQTYa2DSnyKA&oe=6A9F68B5",
  "https://instagram.fhan2-4.fna.fbcdn.net/v/t51.82787-15/735608270_18603680761031903_8213557627758214198_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MzkzNjcxNzExMjM2NjQ0NTcyOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMzI2Ny5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=2vLHSMHtcLwQ7kNvwEflcN3&_nc_oc=Adp10-1paWCRXJ3El_f0Ge3R2IdX348bqc9zHIMQf8zzPEd1ftUkfTzyQ8WN--kAA78kKmv97-l-wbNOzFF5ZfOg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan2-4.fna&_nc_gid=I5HVLD1kuOUB_2NIPw3mBg&_nc_ss=7a22e&oh=00_AQL4ydHXsarQzGUOkevcZnIabBLMoomT2jbaDyAQzfhJsA&oe=6A9F8123",
  "https://instagram.fhan20-1.fna.fbcdn.net/v/t51.82787-15/731695248_18601890280031903_5542692291156719536_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=Mzk3MjE2MzA1NTc0NzM3NTUwMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjczMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=fVYANvPBcPkQ7kNvwFxy-FE&_nc_oc=AdrD4sVsez0Br6pMHR9hotxPQFDocYb5j4hoXzInOXpyaUek9_WYk4wIbMMm8oc2-UUTbZaJw5pxnEttFRIpdL-b&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan20-1.fna&_nc_gid=I5HVLD1kuOUB_2NIPw3mBg&_nc_ss=7a22e&oh=00_AQIowS1fXcI1DG-s4cKSWO7u-bxiuTdWqMSyeCnxidxM9w&oe=6A9F84F5",
  "https://instagram.fhan2-3.fna.fbcdn.net/v/t51.82787-15/724795262_18596868490031903_4697262558948894936_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzkyMTQzNTgyMjg3MjU1OTk4Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjczNy5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=IrRXn9dozjYQ7kNvwGpw7Vn&_nc_oc=Adr4F5OSOwVm12_6OmOOWWanI8QPQ9IiNjaVUrjFWC1UwQ54LRn3fUPeNOlBJ9GXOd6ALO6wOlt3zf1R9CKxIipw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan2-3.fna&_nc_gid=I5HVLD1kuOUB_2NIPw3mBg&_nc_ss=7a22e&oh=00_AQKXnKGkfYqogOQUq27NN3BOmlhWSKBt-m1DBkICAB0o2w&oe=6A9F8865",
  "https://instagram.fhan2-4.fna.fbcdn.net/v/t51.82787-15/730373528_18600870646031903_8485330230861129191_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MzkzMDIwMTc1MTc0MzY2NjQyMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMzA3NS5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=H0roLDd4VDsQ7kNvwHdppbO&_nc_oc=Ado7bNOf_BGgmUkmgg_UA0ZZzE0po8PlcoJ_yTE2ottUTyQusd-4Jn442dzTcd_3yaVn6ojBWMTFd3AB4bZOeH8f&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan2-4.fna&_nc_gid=I5HVLD1kuOUB_2NIPw3mBg&_nc_ss=7a22e&oh=00_AQICqAK34CDoQKOriLja6Y12eh5CiVjfde4PV3BM9o8RxQ&oe=6A9F617E",
  "https://instagram.fhan20-1.fna.fbcdn.net/v/t51.71878-15/707739209_1321183386561950_6046897013284428733_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=109&ig_cache_key=MzkwNjA5MTc0NTU3MDQxNDgyNjE0Nzg4NDI0ODAyMzI5NTk%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjY0MC5zZHIudmlkZW9fbmZyYW1lX2NvdmVyX2ZyYW1lLkMzIn0%3D&_nc_ohc=6GNnhk8BoO0Q7kNvwF5MD7s&_nc_oc=AdqLTV_IqDRT5hgSA3VB_4PlyeS8Lmue36EcE_Zt9osMJfkTjFYEazeOMBCzXIf5mfGONPP99-U9JsdJpw0aNmiS&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan20-1.fna&_nc_gid=I5HVLD1kuOUB_2NIPw3mBg&_nc_ss=7a22e&oh=00_AQKF6gFql4HeAqx9BzrX_Zw2Bk_u5fZ9tvGL_k0Xd3IvaQ&oe=6A9F7085",
  "https://instagram.fhan2-5.fna.fbcdn.net/v/t51.82787-15/705452578_18590163424031903_8866852260100657491_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=MzkwNDg2MjkyNTM5NTc2NDcwOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjQ5Ni5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=2CwiAg-Y6PIQ7kNvwE74ojG&_nc_oc=AdpN6h7zGpHrVBJPT0VPSb6TXHg_F4LTniNIPmu6JQjWdgIZpl4Vo-lZ8pOTYg9fSSQg8aYvQUpwL7dgpJck07Ad&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan2-5.fna&_nc_gid=I5HVLD1kuOUB_2NIPw3mBg&_nc_ss=7a22e&oh=00_AQJGaw9nWECMf_WHdGj5j15XDVBTiqv4Rc0ckJdic6AULg&oe=6A9F8028",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80"
];

// Fisher-Yates Shuffle Algorithm to randomize photo order on every page load
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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
  document.body.classList.add('flipbook-mode');
  
  // Randomize photos on every page reload
  shuffleArray(JIMMY_INSTAGRAM_PHOTOS);

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
    document.body.classList.add('flipbook-mode');
  } else {
    gridSection.classList.add('active');
    flipbookSection.classList.remove('active');
    btnGridView.classList.add('active');
    btnFlipbookView.classList.remove('active');
    document.body.classList.remove('flipbook-mode');
    renderGridCards();
  }
}

// Get photo URL for card index (Randomized order from Instagram photos list)
function getJimmyPhotoForIndex(index) {
  return JIMMY_INSTAGRAM_PHOTOS[index % JIMMY_INSTAGRAM_PHOTOS.length];
}

// Create Card HTML element for a given wish item
function createCardElement(wishItem, index) {
  const styleClass = CARD_STYLES[index % CARD_STYLES.length];
  const photoUrl = getJimmyPhotoForIndex(index);

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
      <img src="${photoUrl}" alt="Jimmy Jitaraphol" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'">
    </div>

    <div class="card-body">
      <div class="fan-name">
        <i class="fa-solid fa-star" style="color:#f1c40f; font-size: 0.9rem;"></i> ${escapeHtml(wishItem.name)}
      </div>
      <div class="fan-wish">${escapeHtml(wishItem.wish)}</div>
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
