const grok = require('../lib');



const p = '%{IP:client} \\[%{TIMESTAMP_ISO8601:timestamp}\\] "%{WORD:method} %{URIHOST:site}%{URIPATHPARAM:url}" %{INT:code} %{INT:request} %{INT:response} - %{NUMBER:took} \\[%{DATA:cache}\\] "%{DATA:mtag}" "%{DATA:agent}"';
const str = '203.35.135.165 [2016-03-15T12:42:04+11:00] "GET memz.co/cloud/" 304 962 0 - 0.003 [MISS] "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36"';

const parser = async ( ) => {
    try {
        const patterns = await grok.loadDefaultSync();
        const pattern = await patterns.createPattern(p);

        const result = await pattern.parseSync(str)

        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

parser()

/*
grok.loadDefault((err, patterns) => {
    if (err) {
        console.error(err);
        return;
    }

    const pattern = patterns.createPattern(p);
    console.log( patterns.getPattern("WORD").id);

    pattern.parse(str, (err, obj) => {
        if (err) {
            console.error(err);
            return;
        }

        //console.log(obj);
    });
});*/
