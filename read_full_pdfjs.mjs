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
            const items = textContent.items.map(item => item.str).filter(s => s.trim().length > 0);
            console.log(`Page ${pageNum}:\n${items.join('\n')}`);
        }
    } catch (e) {
        console.error('Error:', e);
    }
}

extractText('Project DE 2.3 Project Kickoff - URA (Swimlane) Chart - To-Be.pdf');
