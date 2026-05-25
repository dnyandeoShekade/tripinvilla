const fs = require('fs');
const path = require('path');

const walkSync = (dir, callback) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    var filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      walkSync(filepath, callback);
    } else if (stats.isFile() && (filepath.endsWith('.js') || filepath.endsWith('.jsx'))) {
      callback(filepath);
    }
  });
};

walkSync(path.join(__dirname, 'src'), (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let changed = false;

  // Replace single quotes: 'http://localhost:5000/api/...' -> `${import.meta.env.VITE_API_BASE}/...`
  const singleQuoteRegex = /'http:\/\/localhost:5000\/api([^']*)'/g;
  if (singleQuoteRegex.test(content)) {
    content = content.replace(singleQuoteRegex, '`${import.meta.env.VITE_API_BASE}$1`');
    changed = true;
  }

  // Replace double quotes: "http://localhost:5000/api/..." -> `${import.meta.env.VITE_API_BASE}/...`
  const doubleQuoteRegex = /"http:\/\/localhost:5000\/api([^"]*)"/g;
  if (doubleQuoteRegex.test(content)) {
    content = content.replace(doubleQuoteRegex, '`${import.meta.env.VITE_API_BASE}$1`');
    changed = true;
  }

  // Replace within backticks: `http://localhost:5000/api/...` -> `${import.meta.env.VITE_API_BASE}/...`
  const backtickRegex = /`http:\/\/localhost:5000\/api([^`]*)`/g;
  if (backtickRegex.test(content)) {
    content = content.replace(backtickRegex, '`${import.meta.env.VITE_API_BASE}$1`');
    changed = true;
  }

  // Replace plain http://localhost:5000/api without quotes
  const plainRegex = /http:\/\/localhost:5000\/api/g;
  if (plainRegex.test(content)) {
    content = content.replace(plainRegex, '${import.meta.env.VITE_API_BASE}');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated ${filepath}`);
  }
});
