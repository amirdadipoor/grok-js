const fs = require('fs');
const path = require('path');
const async = require("async");


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
            console.log(file);
            results.push({ path: filePath, file });
        }
    }

    return results;
}



const filesWithContent = readFilesSyncRecursively(patternDir);


const doLoadDefault = (loadModules, callback) => {
    return fs.readdir(patternsDir, (err, files) => {
        if (err) {
            return callback(err);
        }

        const result = new GrokCollection();

        return async.parallel(
            files.filter(file => {
                return !loadModules || !loadModules.length || loadModules.indexOf(file) !== -1;
            }).map(file => {
                return callback => {
                    return result.load(path.join(patternsDir, file), callback);
                };
            }),

            err => {
                if (err) {
                    return callback(err);
                }

                return callback(null, result);
            });
    });
};





const patternDir = path.join(__dirname, '../lib/patterns');


const readFilesAsyncRecursively = (patternDir, done) => {
    let results = [];
    fs.readdir(patternDir , { withFileTypes: true } , (err, files) => {
        if (err) {
            return done(err);
        }
        async.each(files,
            (file, callback) => {

                const fullPath = path.join(patternDir, file.name);
                if (file.isDirectory()) {
                    readFilesAsyncRecursively(fullPath, (err,res) => {
                        if (err) {
                            return callback(err);
                        }
                        results = results.concat(res);
                        callback()
                    })
                } else if (file.isFile()) {
                    results.push({ path: file.path, file : file.name })
                    callback()
                } else {
                    callback()
                }
            },
            err => {
                if (err) {
                    return done(err);
                }
                done(null, results);
            }
        )
    })
}

readFilesAsyncRecursively(patternDir , (err , done) => {
    if (err) {
        console.error('Error reading files:', err);
    } else {
        console.log('All files:', done);
    }
});


