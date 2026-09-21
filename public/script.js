// Inline dataset to ensure 100% rendering on Cloudflare Pages / Workers / static hosts
const INLINE_WISHES_DATA = [
  {
    "id": "wish-1",
    "name": "Page này high ke JimmySea",
    "wish": "Iu P’Mỏ",},
  {
    "id": "wish-2",
    "name": "Nhật Phương",
    "wish": "Chúc mừng sinh nhật Mỏ Jimmy của Nong Sea. Tuổi mới mong Jimmy luôn vui vẻ, hạnh phúc và là vitamin cho nong Sea và cả Nomnoms",},
  {
    "id": "wish-3",
    "name": "Đỗ Thanh Hạ",
    "wish": "Chúc Khun Mỏ Jimmy luôn khoẻ mạnh, thành công trên mọi con đường anh đã chọn. Mong P’Jim luôn hạnh phúc với những gì anh làm và được mọi người yêu thương nhiều hơn.",},
  {
    "id": "wish-4",
    "name": "Viên Viên",
    "wish": "Bias của mình trong 2 anh là pí Jimmy. Chúc anh lớn một sinh nhật thật vui vẻ, luôn hạnh phúc và đem lại nhiều niềm vui cho mọi người. Chúc con đường bác sĩ cũng như giải trí của anh ngày càng thăng tiến thành công. Mong anh ngày càng rực rỡ tự tin đồng hành cùng pí Sea, cùng Avocean và các fans. Love you",},
  {
    "id": "wish-5",
    "name": "Én",
    "wish": "Chúc mỏ sinh nhật tuổi 32 với thật nhiều thành công trong công việc và cuộc sống. Chúc cho mỗi dự định và ước mơ của P'Jim sẽ luôn luôn toả sáng. Mong tuổi mới sẽ mang đến cho mỏ thật nhiều niềm vui, sức khỏe và những điều thật tốt đẹp. Cứ luôn làm những điều anh yêu thích và nhớ chăm sóc bản thân thật tốt nhé. Vẫn luôn là 1 mảnh ghép quan trọng của JimmySea mỏ nhé 😍 các fans vẫn luôn luôn ở đây. Stay with you till the end 🫶🏻",},
  {
    "id": "wish-6",
    "name": "Nguyễn Như",
    "wish": "Chúc mừng sinh nhật Hia. Tuổi mới phải thật thành công hơn, phát triển hơn nhé. Chúc Hia tuổi mới luôn mạnh khoẻ và luôn có những người mình thương bên cạnh nha❤️🥰💜",},
  {
    "id": "wish-7",
    "name": "Nomnom",
    "wish": "Chúc Mừng Mỏ Jim tuổi mới luôn vui vẻ, gặt nhái thêm nhiều thành công trong công việc và cuộc sống. Luôn hạnh phúc vui vẻ bên P'Sea và nhóc Avocean nakha",},
  {
    "id": "wish-8",
    "name": "Lan Phạm",
    "wish": "Chúc Jimmy tuổi mới bình an và hạnh phúc. Hãy luôn luôn cười và làm những gì mình muốn nhé. ❤️❤️❤️❤️",},
  {
    "id": "wish-9",
    "name": "Nomnom",
    "wish": "chúc Mỏ Jim tuổi mới lun vui vẻ, gặt hái được nhiều thành công trong công việc và cuộc sống. Luôn ben cạnh đồng hành cùng P'Sea Avocean và Nomnom",},
  {
    "id": "wish-10",
    "name": "Vi",
    "wish": "Chúc mừng sinh nhật Number 1 man của em hôm nay là một ngày đặc biệt, mong rằng tuổi mới sẽ mang đến cho anh nhiều niềm vui hơn, nhiều điều may mắn hơn và thật nhiều iu thương dịu dàng đến với anh. Tuổi mới rực rỡ nhé mong mọi điều tốt đẹp nhất sẽ tìm đến anh một cách tự nhiên nhất. Happy Birthday",},
  {
    "id": "wish-11",
    "name": "Châu Giang",
    "wish": "Đây là năm đầu tiên mình đón sinh nhật cùng P’Jim, chúc Mỏ sinh nhật thật vui vẻ. Mong P’Jim sẽ luôn hạnh phúc, mọi điều ước đều thành hiện thực nhe🥹 Cảm ơn P’Mỏ đã luôn là nguồn động lực của tui, mong Mỏ hãy luôn là chính mình ạ💜",},
  {
    "id": "wish-12",
    "name": "Thiên Hoạ",
    "wish": "Chúc mừng Jimmy bước sang tuổi 32 🎂💜\nThêm một tuổi mới, thêm một chương thật đẹp trong hành trình của anh. Mong tuổi 32 sẽ mang đến cho anh thật nhiều khoảnh khắc đáng nhớ, những hành trình mới và thật nhiều điều để tự hào về chính mình. Cảm ơn anh vì đã trở thành một người truyền cảm hứng cho rất nhiều người chỉ bằng việc là chính mình. Mong năm tuổi 32 sẽ thật dịu dàng, rực rỡ và mang đến cho anh tất cả những điều anh xứng đáng có được. 💜",},
  {
    "id": "wish-13",
    "name": "Mai Thu Phương",
    "wish": "Em chúc mừng tuổi mới anh Jim nhé! Em mong rằng sinh nhật năm nay của anh và những ngày tiếp tới luôn thật nhiều hạnh phúc.  Đầu tiên em chúc anh có nhiều sức khoẻ Thứ hai là chúc cho trên mọi con đường anh đã chọn, anh luôn hạnh phúc với mọi thứ mình làm. Em chúc anh thành công ạ. Cuối cùng, dù cho anh ở đâu đi chăng nữa, anh Jim vẫn mãi là anh Jim - anh trai yêu của em Cam nhé!",},
  {
    "id": "wish-14",
    "name": "Ngô Tử Hàm",
    "wish": "Chúc mỏ Jim sinh nhật vui vẻ 💜 Chúc P’Jimmy tuổi mới luôn luôn hạnh phúc, giữ gìn sức khoẻ thật tốt, đạt được những điều mà mỏ mong mỏi nha. E biết là dạo này có nhiều thứ mệt mỏi cho mỏ nhưng mà có Sea nè, có zai iu Cean nè và cả chúng e nữa. Nếu mệt quá chúng ta cùng nghỉ ngơi, tâm sự để giải quyết với nhau nhé. Mọi người luôn bên mỏ 🧡 Iu gia đình JimmySeaAvocean 🫰🏻🥑🌊🛟",},
  {
    "id": "wish-15",
    "name": "Khoa",
    "wish": "Chúc anh tuổi  mới thật nhiều sức khoẻ và hạnh phúc đạt đc những thành công như anh mong muốn và đặc biệt đc về nhà e ấy ăn cơm",},
  {
    "id": "wish-16",
    "name": "Yến Ly",
    "wish": "Chúc Hia Jim tuổi 32 thật nhiều sức khỏe, luôn vui vẻ, hạnh phúc và bình an bên gia đình, người thân và bạn bè. Chúc Hia sẽ có thật nhiều cơ hội mới, dù có gặp những thử thách nào cũng đều mạnh mẽ vượt qua được. Mong rằng con đường trở thành bác sĩ của Hia sẽ thật thành công và rực rỡ, sớm mở được clinic như những gì Hia mong ước nha. Em thương Hia Jim vì Hia luôn là chính mình. Hia không cần phải vì bất kỳ ai hay những lời nói ngoài kia mà thay đổi bản thân đâu. Cứ luôn là Hia, sống theo cách Hia muốn và làm những điều khiến Hia hạnh phúc nhá. \nChúc tất cả những điều tốt đẹp và may mắn nhất sẽ luôn đến với Hia. Thương Hia Jim nhà em lắm nhá. รักเฮียมากนะ🥑💜🎂✨🫶",},
  {
    "id": "wish-17",
    "name": "Linn",
    "wish": "Mong P’Jimmy của tụi mình tuổi mới sẽ luôn được yêu thương, bình an và hạnh phúc thật nhiều. ❤️\nMong P’Mỏ luôn khỏe mạnh, mỗi ngày đều cười thật tươi, được làm những điều mình yêu thích và từng bước chạm đến những ước mơ của mình, dù là một ngày nào đó mở clinic hay bất kỳ điều gì P’Mỏ mong muốn.\nPhía trước chắc chắn sẽ còn rất nhiều chặng đường, mong rằng trên mỗi chặng đường ấy, P’Mỏ luôn có những người yêu thương ở bên cạnh và thật nhiều điều dịu dàng tìm đến. Mãi là P’Jimmy đáng yêu như thế nhé💜",},
  {
    "id": "wish-18",
    "name": "Gọi là vợ iu của Tawinan ạ🙈",
    "wish": "Happy birthday khun Jimmy na🥰\nChúc anh sinh nhật vui vẻ, chúc cho mọi điều tốt đẹp đều đến với anh. Và đặc biệt, em mong anh không quên sơ tâm của mình. Không quên lí do vì sao anh chọn theo học ngành y, không quên lí do vì sao anh lựa chọn tiến vào giới giải trí. Dù lí do đó chỉ là một lí do rất đỗi bình thường, rất nhỏ thôi, nhưng nó chính là sự khởi đầu, góp phần tạo nên Jimmy của hôm nay - một Jimmy đa tài đa nghệ, một Jimmy luôn nỗ lực cống hiến hết mình, một Jimmy được hàng ngàn người yêu thương và ngưỡng mộ. \nVà em cũng cảm ơn những lí do đó, nhờ có nó mà em mới được gặp anh, được biết đến anh và được yêu thương anh🤭.\nChúc chàng trai tuổi 32 thật rực rỡ nhaaa\nHBD bro, love you bro🤟🎉",},
  {
    "id": "wish-19",
    "name": "Khánh Băng",
    "wish": "Xin chào Jimmy\nChúc anh sinh nhật vui vẻ, tuổi mới hạnh phúc bên gia đình ạ, gặp nhiều may mắn thuận lợi trong cuộc sống sự nghiệp ổn định ngày càng phát triển, mong anh giữ gìn sức khỏe thật tốt đừng quá khó khăn với bản thân anh cứ làm việc anh muốn Tiny và NomNom luôn ủng hộ anh, đừng quan tâm đến những lời không tốt nhé, anh không cần phải quá hoàn hảo đâu cứ sống chính mình là được. Em không biết chúc gì nhiều đâu chỉ cần anh luôn khoẻ mạnh \nHappy Birthday Jimmy 💜🎂",},
  {
    "id": "wish-20",
    "name": "Vy",
    "wish": "Tuổi mới chúc mỏ Jim có thêm nhiều khoảnh khắc yên bình và hạnh phúc cùng những người mình yêu thương.\nHãy cứ mang theo dũng khí theo đuổi những gì anh mong muốn, mang theo sự kiên định thực hiện những hoài bão của mình và hãy có những ngày thật xứng đáng với chính anh.\nMong anh luôn luôn giữ cho mình một tâm hồn lạc quan, cởi mở không chỉ trước những điều tốt đẹp đã mong đợi mà còn trước những điều bất ngờ không mong chờ của cuộc đời.💗\nBe yourself and be open to unexpected surprises.🩵⭐️🥑",},
  {
    "id": "wish-21",
    "name": "Cẩm Khuê",
    "wish": "Chúc pi Jimmy tuổi mới thật rực rỡ, hãy luôn tỏa sáng theo cách riêng của anh hạnh phúc nha. Anh luôn là nguồn động lực to lớn để em theo đuổi ước mơ của bản thân, vì thế nên em chúc anh hãy luôn rạng rỡ, hạnh phúc trên con đường của chính mình nha, happy birthday na khaaaa",},
  {
    "id": "wish-22",
    "name": "Thanh Tuyền nhá",
    "wish": "Happy Birthday to my favorite person 🎂🤍\nCảm ơn vì đã luôn cố gắng, luôn tỏa sáng và mang đến cho mọi người thật nhiều niềm vui. Sự xuất hiện của Jimmy đã khiến rất nhiều ngày bình thường trở nên đặc biệt hơn. Mong tuổi mới sẽ dịu dàng với anh, cho anh thật nhiều hạnh phúc, sức khỏe và những khoảnh khắc đáng nhớ. Hãy luôn sống thật vui và làm những điều mình yêu thích. Please stay happy and keep shining forever!🫶🏻💐",},
  {
    "id": "wish-23",
    "name": "Blogxinh",
    "wish": "Chúc Mỏ Jim ngày càng thành công trong công việc, sớm mở được Clinic của riêng mình như anh mong muốn. Mong rằng anh sẽ mãi luôn vui tươi, nhận được nhiều sự yêu mến, công nhận. Mãi hạnh phúc bên gia đình, bên Sea Avocean. Anh hãy cứ nhớ rằng luôn có Tiny, NomNoms ở phía sau ủng hộ anh nhé💜💜🥑🥑🥑💜",},
  {
    "id": "wish-24",
    "name": "Avocado Ocean",
    "wish": "Chúc mừng tuổi mới P’Jimmy của Tiny, Nomnom! ❤️\nThêm một tuổi không chỉ là thêm một con số, mà là minh chứng cho một Jimmy ngày càng bản lĩnh và tỏa sáng. Mong P’Mỏ tuổi mới luôn bình an, mạnh khỏe và mỗi ngày đều nở nụ cười thật tươi. Chúc anh từng bước chạm tay đến mọi giấc mơ của mình, dù là phòng khám riêng trong tương lai hay bất kỳ dự định nào anh ấp ủ.\nHành trình phía trước còn dài, mong rằng ở mỗi chặng đường đi qua, xung quanh anh luôn ngập tràn sự tử tế, có những người chân thành kề cạnh và thật nhiều điều dịu dàng tìm đến. Cảm ơn anh vì đã luôn là một P’Jimmy đáng yêu và ấm áp như thế 💜",},
  {
    "id": "wish-25",
    "name": "Mỹ Anh",
    "wish": "chúc p’Jim tuổi 32 luôn đạt được thành công trong những vai diễn, luôn chú ý tới sức khoẻ, ở tuổi mới không còn những điều không may xảy ra.",},
  {
    "id": "wish-26",
    "name": "Đoàn Lê Na",
    "wish": "Happy Birthday, P'Jimmy. Chúc mừng anh sang tuổi 32 thiệc nhiều niềm vui, thiệc nhiều sức khỏe, thiệc nhiều thành công. Cảm ơn anh vì đã luôn cố gắng và nỗ lực không ngừng để mỗi lần xuất hiện trước NomNom luôn là dáng vẻ chỉn chu nhất.",},
  {
    "id": "wish-27",
    "name": "Jinnie",
    "wish": "Happy Birthday, Jimmy Jitaraphol! <3\n\nSinh nhật này, em không chỉ mong anh có thêm một tuổi mới thật rực rỡ, mà mong trên hành trình phía trước, anh luôn được làm những điều mình yêu, gặp những người thật lòng yêu thương mình, và dù đi đến đâu cũng luôn có những điều tử tế chờ đón.\n\nCảm ơn anh vì đã luôn là Jimmy.\nCó thể với anh, một vai diễn, một nụ cười, một câu nói hay một khoảnh khắc nào đó chỉ là một phần rất bình thường trong công việc và cuộc sống. Nhưng với một người ở phía bên kia màn hình, đôi khi chính những điều rất nhỏ ấy lại làm một ngày buồn trở nên nhẹ hơn, cho họ thêm một điều để mong chờ, hoặc đơn giản là khiến họ mỉm cười mà chẳng cần một lý do đặc biệt. Có lẽ anh sẽ không bao giờ biết hết mình đã đi qua cuộc sống của bao nhiêu người theo những cách như thế. Và với em đó là một điều rất đẹp.\n\nCảm ơn anh vì đã xuất hiện trong những năm tháng của chúng em, để rồi từ lúc nào không hay, anh trở thành một phần của những kỷ niệm mà sau này khi nhớ lại, chúng em vẫn sẽ mỉm cười.\n\nTuổi mới, em mong Hia Jim luôn có thật nhiều sức khỏe. Không chỉ vì anh là bác sĩ, mà vì có rất nhiều người vẫn muốn được nhìn thấy anh khỏe mạnh, vui vẻ, tiếp tục làm những điều anh yêu và xuất hiện thật lâu trên hành trình phía trước.\n\nVà em cũng muốn gửi lời cảm ơn đến JimmySea - Vietnam Fanpage. <3\nCảm ơn page vì đã luôn dành thời gian và tâm huyết cho những project, những món quà, những lời chúc và những dịp để NomNom Việt Nam có thể cùng nhau gửi tình cảm đến Jimmy. \n\nCó thể Jimmy sẽ không biết hết tên của từng NomNom, cũng chẳng thể biết từng người đã vui hay đã xúc động như thế nào khi cùng làm những điều này. Nhưng với chúng em, được cùng nhau yêu quý một người, cùng nhau chuẩn bị một điều gì đó cho sinh nhật của người ấy, và có một nơi để gửi gắm tình cảm, bản thân nó đã là một kỷ niệm rất đẹp rồi.\n\nCảm ơn Jimmy vì đã trở thành một phần của những kỷ niệm ấy.\nHappy Birthday, Hia Jim! สุขสันต์วันเกิดครับคุณหมอจิมมี่ <3 !\n\nWith love,\nA NomNom from Vietnam.",}
];

// State Variables
let wishesData = INLINE_WISHES_DATA;
let currentPageIndex = 0;
let isAudioPlaying = false;

// Authentic Jimmy Jitaraphol Photos (Bỏ jimmy_2.jpg khỏi danh sách)
const TOTAL_JIMMY_PHOTOS = 81;
let JIMMY_PHOTOS = Array.from({ length: TOTAL_JIMMY_PHOTOS }, (_, i) => `/assets/jimmy/jimmy_${i + 1}.jpg`)
  .filter(img => img !== '/assets/jimmy/jimmy_2.jpg');

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

// Fetch Data from Server API (with inline fallback to ensure 100% display everywhere)
async function fetchWishesData() {
  // 1. Render immediately with embedded inline wishes data (Bulletproof on Cloudflare Pages)
  wishesData = INLINE_WISHES_DATA;
  renderAllViews();

  // 2. Try dynamic backend endpoint if available
  try {
    const res = await fetch('/api/wishes');
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data && data.success && Array.isArray(data.wishes) && data.wishes.length > 0) {
          wishesData = data.wishes;
          renderAllViews();
          return;
        }
      }
    }
  } catch (err) {}

  // 3. Try static wishes.json if available
  try {
    const staticRes = await fetch('/wishes.json');
    if (staticRes.ok) {
      const contentType = staticRes.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await staticRes.json();
        if (Array.isArray(data) && data.length > 0) {
          wishesData = data;
          renderAllViews();
          return;
        }
      }
    }
  } catch (err) {}
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
