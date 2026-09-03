const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_DIR = path.join(__dirname, 'data');
const CUSTOM_WISHES_FILE = path.join(DATA_DIR, 'custom_wishes.json');
const PHOTOS_FILE = path.join(DATA_DIR, 'jimmy_photos.json');
const LIKES_FILE = path.join(DATA_DIR, 'likes.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Jimmy photos array (Can be updated via API or user provided links)
const DEFAULT_PHOTOS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
];

// Read initial photos or create default
function getJimmyPhotos() {
  if (fs.existsSync(PHOTOS_FILE)) {
    try {
      const data = fs.readFileSync(PHOTOS_FILE, 'utf8');
      const photos = JSON.parse(data);
      if (Array.isArray(photos) && photos.length > 0) {
        return photos;
      }
    } catch (err) {
      console.error('Error reading photos file:', err);
    }
  }
  return DEFAULT_PHOTOS;
}

function saveJimmyPhotos(photos) {
  fs.writeFileSync(PHOTOS_FILE, JSON.stringify(photos, null, 2), 'utf8');
}

// Read likes dictionary
function getLikesMap() {
  if (fs.existsSync(LIKES_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(LIKES_FILE, 'utf8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function saveLikesMap(likesMap) {
  fs.writeFileSync(LIKES_FILE, JSON.stringify(likesMap, null, 2), 'utf8');
}

// Parse Excel responses file
function getExcelWishes() {
  const excelPath = path.join(__dirname, "Minigame Sinh Nhật P'Jim (Responses).xlsx");
  if (!fs.existsSync(excelPath)) {
    // Search for any xlsx file in root
    const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.xlsx'));
    if (files.length === 0) return [];
    var targetPath = path.join(__dirname, files[0]);
  } else {
    var targetPath = excelPath;
  }

  try {
    const workbook = xlsx.readFile(targetPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    if (rows.length < 2) return [];

    const wishes = [];
    const likesMap = getLikesMap();

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;

      const name = (row[2] || 'Người hâm mộ ẩn danh').toString().trim();
      const fbLink = (row[3] || '').toString().trim();
      const wishText = (row[4] || '').toString().trim();

      if (name || wishText) {
        const id = `excel-${i}`;
        wishes.push({
          id,
          name: name || 'Nomnom Fan',
          wish: wishText || "Chúc P'Jim tuổi 32 sinh nhật thật vui vẻ và luôn tỏa sáng!",
          fb: fbLink,
          likes: likesMap[id] || Math.floor(Math.random() * 15) + 5,
          timestamp: row[0] ? row[0].toString() : null,
          source: 'excel'
        });
      }
    }
    return wishes;
  } catch (err) {
    console.error('Error parsing Excel file:', err);
    return [];
  }
}

// Read custom submitted wishes
function getCustomWishes() {
  if (fs.existsSync(CUSTOM_WISHES_FILE)) {
    try {
      const data = fs.readFileSync(CUSTOM_WISHES_FILE, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveCustomWishes(wishes) {
  fs.writeFileSync(CUSTOM_WISHES_FILE, JSON.stringify(wishes, null, 2), 'utf8');
}

// APIs
app.get('/api/wishes', (req, res) => {
  const excelWishes = getExcelWishes();
  const customWishes = getCustomWishes();
  const allWishes = [...excelWishes, ...customWishes];
  const photos = getJimmyPhotos();

  res.json({
    success: true,
    total: allWishes.length,
    photos: photos,
    wishes: allWishes
  });
});

app.post('/api/wishes', (req, res) => {
  const { name, wish, fb } = req.body;
  if (!wish || !wish.trim()) {
    return res.status(400).json({ success: false, message: 'Lời chúc không được để trống!' });
  }

  const customWishes = getCustomWishes();
  const newWish = {
    id: `custom-${Date.now()}`,
    name: (name && name.trim()) ? name.trim() : 'Nomnom Fan',
    wish: wish.trim(),
    fb: (fb && fb.trim()) ? fb.trim() : '',
    likes: 1,
    createdAt: new Date().toISOString(),
    source: 'web'
  };

  customWishes.unshift(newWish);
  saveCustomWishes(customWishes);

  res.json({
    success: true,
    message: 'Gửi lời chúc thành công!',
    data: newWish
  });
});

app.post('/api/wishes/:id/like', (req, res) => {
  const { id } = req.params;
  const likesMap = getLikesMap();
  likesMap[id] = (likesMap[id] || 5) + 1;
  saveLikesMap(likesMap);

  // If it's a custom wish, update in custom_wishes.json too
  const customWishes = getCustomWishes();
  const customIndex = customWishes.findIndex(w => w.id === id);
  if (customIndex !== -1) {
    customWishes[customIndex].likes = likesMap[id];
    saveCustomWishes(customWishes);
  }

  res.json({
    success: true,
    id: id,
    likes: likesMap[id]
  });
});

app.get('/api/photos', (req, res) => {
  res.json({
    success: true,
    photos: getJimmyPhotos()
  });
});

app.post('/api/photos', (req, res) => {
  const { photos } = req.body;
  if (!Array.isArray(photos)) {
    return res.status(400).json({ success: false, message: 'Danh sách ảnh phải là mảng Array!' });
  }

  const cleanPhotos = photos.map(p => p.trim()).filter(p => p.length > 0);
  saveJimmyPhotos(cleanPhotos);

  res.json({
    success: true,
    message: `Đã cập nhật ${cleanPhotos.length} ảnh của P'Jim!`,
    photos: cleanPhotos
  });
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✨ Server Lưu Bút Sinh Nhật P'Jim đang chạy tại http://localhost:${PORT}`);
});
