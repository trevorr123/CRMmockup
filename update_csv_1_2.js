const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const results = [];
fs.createReadStream('flow_cleaned_4col.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // Keep 1.1 as is, filter out 1.2, keep 2.1 and later
    const recordsWithout1_2 = results.filter(r => !r['File Name'].includes('1.2 Business Development'));

    const new1_2 = [
      ['1.2 Business Development - Quotation', '1.2.1', '[N/A]', 'STAGE 1.2.1: PREPARE DRAFT QUOTATION', '1.2.1.1'],
      ['', '1.2.1.1', 'Client / Contractors', 'Informs Dyson on Proposal Needs.', '1.2.1.2'],
      ['', '1.2.1.2', 'Sales Executive', 'Sends Admin instructions on quotation T&Cs.', '1.2.1.3'],
      ['', '1.2.1.3', 'Admin', 'Prepare draft Quotation according to templates in Xero.', '1.2.2'],
      
      ['1.2 Business Development - Quotation', '1.2.2', '[N/A]', 'STAGE 1.2.2: ENGROSS QUOTATION', '1.2.2.1'],
      ['', '1.2.2.1', 'Admin', 'Engross Quotation.', '1.2.2.2'],
      ['', '1.2.2.2', 'Admin', 'Send to SE for Review.', '1.2.2.3'],
      ['', '1.2.2.3', 'Sales Executive', 'Review Engrossed Quotation.', '1.2.2.4'],
      ['', '1.2.2.4', 'Sales Executive', 'Is Engrossed Quotation complete?', '1.2.2.5, 1.2.2.6'],
      ['', '1.2.2.5', 'Sales Executive', 'If no, Inform Admin of amendments to engrossed quotation.', '1.2.2.10'],
      ['', '1.2.2.6', 'Sales Executive', 'If yes, Send Engrossed Quotation to MD for Approval and/or Signing.', '1.2.2.7'],
      ['', '1.2.2.7', 'Managing Director', 'Is Engrossed Quotation complete?', '1.2.2.8, 1.2.2.9'],
      ['', '1.2.2.8', 'Managing Director', 'If no, MD gives comments to SE.', '1.2.2.10'],
      ['', '1.2.2.9', 'Managing Director', 'If yes, Sign Engrossed Quotation.', '1.2.3'],
      ['', '1.2.2.10', 'Admin', 'Revise Quotation.', '1.2.2.11'],
      ['', '1.2.2.11', 'Admin', 'Send to SE for Review.', '1.2.2.3'], // loops back
      
      ['1.2 Business Development - Quotation', '1.2.3', '[N/A]', 'STAGE 1.2.3: SEND QUOTATION FOR ACCEPTANCE', '1.2.3.1'],
      ['', '1.2.3.1', 'Admin', "WhatsApp Client's Finance Personnel only the Signed Quotation for acknowledgement.", '1.2.3.2'],
      ['', '1.2.3.2', 'Client', 'Did Client acknowledge receipt?', '1.2.3.3, 1.2.3.4'],
      ['', '1.2.3.3', 'Admin', 'If no, Follow up once with client (on Same Day).', '1.2.3.5'],
      ['', '1.2.3.4', 'Client', 'If yes, Accept Quotation.', '1.2.4'],
      ['', '1.2.3.5', 'Admin', 'Did Client acknowledge receipt?', '1.2.3.6, 1.2.3.4'],
      ['', '1.2.3.6', 'Admin', 'If no, END.', ''],
      
      ['1.2 Business Development - Quotation', '1.2.4', '[N/A]', 'STAGE 1.2.4: GENERATE INVOICE (FOR DEPOSIT)', '1.2.4.1'],
      ['', '1.2.4.1', 'Admin', 'Create invoice #1 (50%) for deposit.', '1.2.4.2'],
      ['', '1.2.4.2', 'Admin', 'Send Invoice to client.', '1.2.4.3'],
      ['', '1.2.4.3', 'Client', 'Receive Invoice #1.', '1.2.4.4'],
      ['', '1.2.4.4', 'Client', 'Did Client pay?', '1.2.4.5, 1.2.4.6'],
      ['', '1.2.4.5', 'Admin', 'If no, Follow up with client on payment (within 1 week).', '1.2.4.7'],
      ['', '1.2.4.6', 'Sales Executive', 'If yes, Run through Checklist of Document for Project Kickoff and prepare necessary documents for client\'s signing.', '2.1, 2.2, 2.3, 2.4'], // Project Kickoff reference
      ['', '1.2.4.7', 'Admin', 'Did Client pay?', '1.2.4.8, 1.2.4.6'],
      ['', '1.2.4.8', 'Admin', 'If no, END.', '']
    ];

    const formattedNew1_2 = new1_2.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    // Find the index to insert 1.2. 
    // It should be after 1.1 and before 2.1
    let insertIndex = recordsWithout1_2.findIndex(r => r['File Name'].includes('2.1 Project Kickoff'));
    if (insertIndex === -1) insertIndex = recordsWithout1_2.length; // fallback

    const finalRecords = [
        ...recordsWithout1_2.slice(0, insertIndex),
        ...formattedNew1_2,
        ...recordsWithout1_2.slice(insertIndex)
    ];

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

    csvWriter.writeRecords(finalRecords)
        .then(() => {
            console.log('Done writing updated CSV with 1.2');
        });
  });
