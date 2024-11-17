const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'root endpoint Service 2',
    timestamp: new Date()
  });
});

app.get('/api/service2', (req, res) => {
  res.json({
    message: 'Hello from Service 2',
    timestamp: new Date()
  });
});

app.listen(port, () => {
  console.log(`Service 2 listening at http://localhost:${port}`);
});