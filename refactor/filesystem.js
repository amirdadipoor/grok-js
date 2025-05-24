const fs = require('fs');
const path = require('path');

const readFilesSyncRecursively = (dir) => {
    const results = [];

    const list = fs.readdirSync(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            // Recurse into subdirectory
            results.push(...readFilesSyncRecursively(filePath));
        } else if (stat && stat.isFile()) {
            const content = fs.readFileSync(filePath, 'utf8');
            results.push({ path: filePath/*, content*/ , file });
        }
    }

    return results;
}

// Usage example:
const patternDir = path.join(__dirname, '../lib/patterns');
//console.log(__dirname)


const filesWithContent = readFilesSyncRecursively(patternDir);
console.log(filesWithContent);

filesWithContent.forEach(({ path, content }) => {
    //console.log(`--- ${path} ---`);
    //console.log(content);
});