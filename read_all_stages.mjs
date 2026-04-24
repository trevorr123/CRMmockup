import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

async function extractText(pdfPath) {
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = pdfjsLib.getDocument({data: data});
    try {
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        console.log(`\n--- ${pdfPath} ---`);
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const items = textContent.items.map(item => item.str).filter(s => s.trim().length > 0);
            
            // Look for "STAGE X.Y.Z"
            const stages = items.filter(s => s.match(/STAGE\s+\d\.\d\.\d/i));
            if (stages.length > 0) {
                console.log(`Page ${pageNum} Stages:`, stages);
            }
            // Look for blue circles
            const refs = items.filter(s => s.match(/^\d\.\d\.\d[a-zA-Z]*$/) || s.match(/^\d\.\d$/));
            if (refs.length > 0) {
                console.log(`Page ${pageNum} Refs:`, refs);
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
