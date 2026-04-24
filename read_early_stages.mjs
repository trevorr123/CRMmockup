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
            
            // just look for things resembling "2.1.X" or "1.1.X"
            const refs = items.filter(s => s.match(/^\d\.\d\.\d/));
            if (refs.length > 0) {
                console.log(`Page ${pageNum} Refs:`, refs);
            }
        }
    } catch (e) {
        console.error('Error:', e);
    }
}

async function run() {
    await extractText('Project DE 1.1 Business Development - Understanding Referral Needs (Swimlane) Chart - To-Be.pdf');
    await extractText('Project DE 1.2 Business Development - Quotation (Swimlane) Chart - To-Be.pdf');
    await extractText('Project DE 2.1 Project Kickoff - SFA (Swimlane) Chart - To-Be.pdf');
    await extractText('Project DE 2.2 Pr﻿oject Kickoff - HDB (Swimlane) Chart - To-Be.pdf');
}

run();
