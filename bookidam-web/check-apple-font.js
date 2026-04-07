const https = require('https');
https.get('https://www.apple.com/wss/fonts?families=SF+Pro,v3', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Status Code:', res.statusCode, 'Content length:', data.length));
});
