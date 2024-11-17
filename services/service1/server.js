const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Root endpoint',
    timestamp: new Date()
  });
});

app.get('/api/service1', (req, res) => {
  res.json({
    message: 'Hello from Service 1',
    timestamp: new Date()
  });
});

app.listen(port, () => {
  console.log(`Service 1 listening at http://localhost:${port}`);
});