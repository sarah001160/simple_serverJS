const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

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

// 後端伺服器server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});