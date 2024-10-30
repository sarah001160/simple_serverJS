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