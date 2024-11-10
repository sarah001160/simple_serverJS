// get api
document.getElementById('fetch').addEventListener('click', () => {
  fetch('/api/message')
    .then(response => response.json())
    .then(data => {
      document.getElementById('message').innerText = data.message;
    })
    .catch(error => {
      console.error('Error fetching message:', error);
    });
});
// try post api 
function sendMessage() {
  const message = document.getElementById('messageInput').value; // input 值

  // 發送 POST 請求
  fetch('/api/echo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message }), // 將 JavaScript 物件轉為 JSON 格式、物件是 es6 寫法
  })
    .then(response => response.json())       // 將回應解析為 JSON 格式
    .then(data => {
      // 顯示伺服器的回應
      console.log('data', data)
      //document.getElementById('response').textContent = `Server response: ${data.echo}`;
    })
    .catch(error => console.error('Error:', error));
}
