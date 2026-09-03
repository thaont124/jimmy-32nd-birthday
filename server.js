const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Set no-cache header for static files to prevent browser caching old CSS
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Parse Excel responses file
function getExcelWishes() {
  const excelPath = path.join(__dirname, "Minigame Sinh Nhật P'Jim (Responses).xlsx");
  let targetPath = excelPath;
  if (!fs.existsSync(excelPath)) {
    const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.xlsx'));
    if (files.length === 0) return [];
    targetPath = path.join(__dirname, files[0]);
  }

  try {
    const workbook = xlsx.readFile(targetPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    if (rows.length < 2) return [];

    const wishes = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;

      const name = (row[2] || 'Người hâm mộ ẩn danh').toString().trim();
      const fbLink = (row[3] || '').toString().trim();
      const wishText = (row[4] || '').toString().trim();

      if (name || wishText) {
        wishes.push({
          id: `wish-${i}`,
          name: name || 'Nomnom Fan',
          wish: wishText || "Chúc P'Jim tuổi 32 sinh nhật thật vui vẻ!",
          fb: fbLink
        });
      }
    }
    return wishes;
  } catch (err) {
    console.error('Error parsing Excel file:', err);
    return [];
  }
}

// API to get all wishes
app.get('/api/wishes', (req, res) => {
  const wishes = getExcelWishes();
  res.json({
    success: true,
    total: wishes.length,
    wishes: wishes
  });
});

// Serve main page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✨ Server Lưu Bút Sinh Nhật P'Jim đang chạy tại http://localhost:${PORT}`);
});
