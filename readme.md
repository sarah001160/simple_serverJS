## port 號被佔用，處理方式

終端機回報錯誤說 port 3000 已被佔用了，這個錯誤是由於端口 3000 已經被其他程序佔用，導致你的 Node.js 應用無法在該端口啟動。你可以通過以下幾個步驟來解決這個問題：

```
netstat -ano | findstr :3000
```

該命令會顯示佔用端口的程序的 PID（進程 ID）。例如，你會看到類似這樣的輸出：

```
TCP    [::]:3000              [::]:0                 LISTENING       1234
```

### 1.終止該程序：

使用 taskkill 命令根據 PID 終止進程。假設 PID 是 1234，則運行：

```
taskkill /PID 1234 /F
```

### 2.再跑一次 npm run start

你執行這個指令時，要先確保你開啟的檔案是 client 端的 script.js

## express.js 資源連結

https://developer.mozilla.org/zh-TW/docs/Learn/Server-side/Express_Nodejs/skeleton_website
https://hackmd.io/@Heidi-Liu/note-be201-express-node
