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

// Read wishes from static JSON file
function getWishes() {
  const jsonPath = path.join(__dirname, 'public', 'wishes.json');
  if (fs.existsSync(jsonPath)) {
    try {
      return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch (err) {
      console.error('Error reading wishes.json:', err);
    }
  }
  return [];
}

// API to get all wishes
app.get('/api/wishes', (req, res) => {
  const wishes = getWishes();
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
