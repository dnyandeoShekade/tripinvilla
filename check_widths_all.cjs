const fs = require('fs');
const path = require('path');

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (fullPath.endsWith('.css')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const blockRegex = /{[^}]*width:\s*[4-9]\d{2}px[^}]*}/g;
            let match;
            while ((match = blockRegex.exec(content)) !== null) {
                const block = match[0];
                if (!block.includes('max-width:')) {
                    console.log(`File: ${fullPath}\nBlock missing max-width:\n${block}\n`);
                }
            }
            const blockRegex2 = /{[^}]*width:\s*1\d{3}px[^}]*}/g;
            let match2;
            while ((match2 = blockRegex2.exec(content)) !== null) {
                const block = match2[0];
                if (!block.includes('max-width:')) {
                    console.log(`File: ${fullPath}\nBlock missing max-width:\n${block}\n`);
                }
            }
        }
    }
}
scanDir('/home/sama/tripinvilla/frontend/src');
