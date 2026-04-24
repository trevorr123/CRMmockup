import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

async function extractText(pdfPath) {
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = pdfjsLib.getDocument({data: data});
    try {
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        console.log(`\n\n--- ${pdfPath} --- (${numPages} pages)`);
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const items = textContent.items.map(item => item.str);
            // find references like X.Y.Z
            const refs = items.filter(str => str.match(/\b\d\.\d\.\d\b/));
            if (refs.length > 0) {
                console.log(`Page ${pageNum} refs:`, refs);
            }
        }
    } catch (e) {
        console.error('Error:', e);
    }
}

async function run() {
    const files = fs.readdirSync('.').filter(f => f.endsWith('.pdf') && f.includes('Project DE'));
    for (const f of files) {
        await extractText(f);
    }
}

run();
