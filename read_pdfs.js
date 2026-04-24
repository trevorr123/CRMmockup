const fs = require('fs');
const pdf = require('pdf-parse');

async function extractText() {
    const files = fs.readdirSync('.').filter(f => f.endsWith('.pdf'));
    for (const file of files) {
        if (!file.includes('Project DE')) continue;
        let dataBuffer = fs.readFileSync(file);
        try {
            let data = await pdf(dataBuffer);
            console.log(`\n\n--- ${file} ---`);
            const lines = data.text.split('\n');
            const refs = lines.filter(line => line.match(/\b\d\.\d\.\d\b/));
            if(refs.length > 0) {
                console.log("Found possible references:");
                console.log(refs.join('\n'));
            } else {
                console.log("No simple references found.");
            }
            
            // Just print the whole text to see how it's structured
            // console.log(data.text.substring(0, 500));
        } catch (e) {
            console.log(`Error reading ${file}: ${e.message}`);
        }
    }
}

extractText();
