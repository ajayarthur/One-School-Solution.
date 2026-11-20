import { startTunnel } from 'untun';

async function main() {
  console.log('Starting Cloudflare direct public tunnel on port 3000...');
  const tunnel = await startTunnel({ url: 'http://localhost:3000' });
  const url = await tunnel.getURL();
  console.log('========================================================');
  console.log('DIRECT PUBLIC URL (NO PASSWORD NEEDED):');
  console.log(url);
  console.log('========================================================');
}

main().catch(err => {
  console.error('Error starting cloudflare tunnel:', err);
});

