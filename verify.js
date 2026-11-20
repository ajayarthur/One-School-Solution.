const http = require('http');

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/index.html',
  'http://localhost:3000/portal.html',
  'http://localhost:3000/css/style.css',
  'http://localhost:3000/js/main.js',
  'http://localhost:3000/img/school-campus.jpg',
  'http://localhost:3000/img/parent-principal.jpg',
  'http://localhost:3000/img/classroom-scene.jpg',
  'http://localhost:3000/img/time-morning.jpg',
  'http://localhost:3000/img/time-afternoon.jpg',
  'http://localhost:3000/img/time-evening.jpg',
  'http://localhost:3000/img/time-night.jpg',
  'http://localhost:3000/img/app-interface-screenshot.jpg',
  'http://localhost:3000/img/aadhya-avatar.jpg',
  'http://localhost:3000/img/aditi-avatar.jpg',
  'http://localhost:3000/img/teacher-app-top.jpg',
  'http://localhost:3000/img/teacher-app-bottom.jpg',
  'http://localhost:3000/img/logo.png',
  'http://localhost:3000/img/logo.jpg'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url, status: res.statusCode, length: data.length });
      });
    }).on('error', (err) => {
      resolve({ url, status: 'ERR', length: 0, error: err.message });
    });
  });
}

(async () => {
  let allPass = true;
  for (const u of urls) {
    const res = await checkUrl(u);
    const pass = res.status === 200;
    if (!pass) allPass = false;
    console.log(`[${pass ? 'PASS' : 'FAIL'}] Status: ${res.status} | Size: ${res.length.toString().padStart(7)} bytes | ${res.url}`);
  }
  console.log(`\nAll endpoints verified: ${allPass ? 'SUCCESS (100% Passing)' : 'FAILURES DETECTED'}`);
  process.exit(allPass ? 0 : 1);
})();

