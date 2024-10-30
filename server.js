const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 靜態文件
app.use(express.static(path.join(__dirname, 'public')));

// API 路由(/api/message 可以自行命名)
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// 後端伺服器server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});