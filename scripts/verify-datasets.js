const fs = require('fs');
const path = require('path');

function readCsv(filename) {
  const [header, ...lines] = fs.readFileSync(filename, 'utf8').trim().split(/\r?\n/);
  const keys = header.split(',');
  return lines.map(line => Object.fromEntries(line.split(',').map((value, index) => [keys[index], value])));
}

const root = path.resolve(__dirname, '..');
const codecRows = readCsv(path.join(root, 'data', 'codec-compression-results.csv'));
const mixtureRows = readCsv(path.join(root, 'data', 'song-mixture-results.csv'));

if (codecRows.length !== 5 || codecRows.some(row => row.median_retained !== '8' || row.median_missed !== '0' || row.median_extra !== '0')) {
  throw new Error('Codec dataset does not match the published fixture medians.');
}
if (mixtureRows.length !== 3 || mixtureRows[0].median_retained !== '7' || mixtureRows[1].median_retained !== '0' || mixtureRows[2].median_retained !== '0') {
  throw new Error('Mixture dataset does not match the published fixture medians.');
}

console.log(`Validated ${codecRows.length} codec rows and ${mixtureRows.length} mixture rows.`);
