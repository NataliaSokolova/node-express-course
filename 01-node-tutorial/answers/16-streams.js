const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../content/big.txt');

const readStream = fs.createReadStream(filePath, { encoding: 'utf8', highWaterMark: 200 });

let chunkCounter = 0;

readStream.on('data', (chunk) => {
  chunkCounter++;
  console.log(`Received chunk #${chunkCounter}:`);
  console.log(chunk);
});

readStream.on('end', () => {
  console.log(`End of stream. Total chunks received: ${chunkCounter}`);
});

readStream.on('error', (err) => {
  console.error('Error reading the file:', err);
});
