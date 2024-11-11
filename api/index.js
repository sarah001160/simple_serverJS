const express = require('express');
const path = require('path');
const fs = require('fs'); // 引用 fs 模組來操作檔案

const app = express();
const PORT = 3000;
// 簡單的記事檔案路徑，資料夾內自動新增檔案 notes.json
const notesFilePath = path.join(__dirname, 'notes.json');

// 需使用這段，才可以post
app.use(express.json());

// 靜態文件
app.use(express.static(path.join(__dirname, 'public')));


// API 路由(/api/message 可以自行命名)
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

//try POST 請求的 API 路由
app.post('/api/echo', (req, res) => {
  const { message } = req.body;  // 確保 express.json() 中間件已啟用
  res.json({ echo: message });
});


// GET 請求，回傳所有記事
app.get('/api/getnotes', (req, res) => {
  // 讀取記事檔案
  fs.readFile(notesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading notes file:', err);
      return res.status(500).json({ error: 'Failed to load notes' });
    }

    const notes = JSON.parse(data || '[]'); // 將讀取到的資料解析成陣列
    res.json(notes); // 回傳所有記事作為陣列
  });
});

// 新增記事的 POST 請求
app.post('/api/notes', (req, res) => {
  const { message } = req.body;

  // 讀取現有的記事資料
  fs.readFile(notesFilePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Error reading notes file:', err);
      return res.status(500).json({ error: '讀取 files 失敗' });
    }

    const notes = JSON.parse(data || '[]'); // 解析 JSON，或空陣列

    // 新增新的記事
    notes.push({ message, timestamp: new Date() });

    // 將資料寫入檔案
    fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error('Error writing notes file:', err);
        return res.status(500).json({ error: 'Failed to save note' });
      }
      res.json({ success: true, message: 'Note saved successfully!' });
    });
  });
});


// 啟動後端伺服器server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;