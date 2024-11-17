const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.raw({ type: '*/*', limit: '10mb' }));

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

app.post('/logs', (req, res) => {
  // Log both raw and parsed body
  console.log('Headers:', req.headers);
  
  if (Buffer.isBuffer(req.body)) {
    console.log('Raw body:', 'req.body.toString()');
    try {
      const jsonBody = JSON.parse(req.body.toString());
      console.log('Parsed body:', 'jsonBody');
    } catch (e) {
      console.log('Could not parse body as JSON');
    }
  } else {
    console.log('Body:', 'req.body');
  }
  
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Service 1 listening at http://localhost:${port}`);
});