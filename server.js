const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/health', (_req, res) => {
  res.type('text/plain').status(200).send('ok');
});

// Serve static assets from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback all routes to index.html for Single Page Applications
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
