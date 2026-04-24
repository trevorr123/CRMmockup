const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const results = [];
fs.createReadStream('flow_cleaned_4col.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // Populate missing File Names
    let currentFileName = '';
    for (const r of results) {
        if (r['File Name'] && r['File Name'].trim() !== '') {
            currentFileName = r['File Name'];
        } else {
            r['File Name'] = currentFileName;
        }
    }

    // Now filter out the old rows that don't match the new hierarchical numbering
    // The old rows had Step # like '1', '2', '3', '4.1'
    // The new rows have Step # like '1.1.1', '1.1.1.1', etc.
    
    const cleanedRecords = results.filter(r => {
        // If it's 1.1 or 1.2, keep only the ones that start with '1.1.' or '1.2.'
        if (r['File Name'].includes('1.1 Business Development')) {
            return r['Step #'].startsWith('1.1.');
        }
        if (r['File Name'].includes('1.2 Business Development')) {
            return r['Step #'].startsWith('1.2.');
        }
        return true;
    });

    // Strip File Name from subsequent rows to make it look clean like before
    currentFileName = '';
    for (const r of cleanedRecords) {
        if (r['File Name'] === currentFileName) {
            r['File Name'] = '';
        } else {
            currentFileName = r['File Name'];
        }
    }

    const csvWriter = createCsvWriter({
        path: 'flow_cleaned_4col.csv',
        header: [
            {id: 'File Name', title: 'File Name'},
            {id: 'Step #', title: 'Step #'},
            {id: 'Person-in-charge', title: 'Person-in-charge'},
            {id: 'Step', title: 'Step'},
            {id: 'Next Step / Reference', title: 'Next Step / Reference'}
        ]
    });

    csvWriter.writeRecords(cleanedRecords)
        .then(() => {
            console.log('Done cleaning CSV');
        });
  });
