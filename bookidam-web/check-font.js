const https = require('https');

https.get('https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYBLACK.woff', (res) => {
  console.log('Status Code:', res.statusCode);
}).on('error', (e) => {
  console.error(e);
});
