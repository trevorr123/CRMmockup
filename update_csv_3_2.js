const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const results = [];
fs.createReadStream('flow_cleaned_4col.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    let currentFileName = '';
    for (const r of results) {
        if (r['File Name'] && r['File Name'].trim() !== '') {
            currentFileName = r['File Name'];
        } else {
            r['File Name'] = currentFileName;
        }
    }

    const recordsWithout3_2 = results.filter(r => !r['File Name'].includes('3.2 Post-Submission to Project Completion'));

    const new3_2 = [
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.1', '[N/A]', 'STAGE 3.2.1: RECEIVE REGULATORY NOTIFICATION', '3.2.1.1'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.1.1', 'HDB', 'Issues Notification for rectification / further clarification.', '3.2.1.2'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.1.2', 'Admin', 'Receives Notification (To-Be: Creation of General Email Account for receipt of Notifications).', '3.2.2.1'],

      ['3.2 Post-Submission to Project Completion - HDB', '3.2.2', '[N/A]', 'STAGE 3.2.2: COORDINATE & RESPOND TO QUERIES/ RECTIFICATIONS', '3.2.2.1'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.2.1', 'Admin', "Respond to HDB's queries & rectifications (email / HDB feedback link).", '3.2.2.2'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.2.2', 'Admin', 'Print submissions & attachments.', '3.2.2.3'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.2.3', 'Admin', 'File submissions.', '3.2.2.4'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.2.4', 'HDB', 'Is response / rectifications acceptable?', '3.2.3.1, 3.2.1.2'],

      ['3.2 Post-Submission to Project Completion - HDB', '3.2.3', '[N/A]', 'STAGE 3.2.3: RECEIVE ACCEPTANCE BY AUTHORITIES', '3.2.3.1'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.3.1', 'HDB', 'Issues Approval (general email).', '3.2.3.2'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.3.2', 'Admin', 'Receives Approval.', '3.2.4.1'],

      ['3.2 Post-Submission to Project Completion - HDB', '3.2.4', '[N/A]', 'STAGE 3.2.4: GENERATE BALANCE INVOICE', '3.2.4.1'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.4.1', 'Admin', 'Create Balance Invoice.', '3.2.4.2'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.4.2', 'Admin', 'Send to Client.', '3.2.4.3'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.4.3', 'Client', 'Receive Balance Invoice.', '3.2.4.4'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.4.4', 'Sales Executive', 'Has client paid Balance Invoice?', '3.2.5.1, 3.2.4.5'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.4.5', 'Sales Executive', 'If no, Follow up on payment.', '3.2.4.4'],

      ['3.2 Post-Submission to Project Completion - HDB', '3.2.5', '[N/A]', 'STAGE 3.2.5: NOTIFY CLIENT OF APPROVAL', '3.2.5.1'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.5.1', 'Sales Executive', 'Sends Notice of Approval to client.', '3.2.5.2'],
      ['3.2 Post-Submission to Project Completion - HDB', '3.2.5.2', 'Client', 'Receives Notice of Approval.', 'END']
    ];

    const formattedNew3_2 = new3_2.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout3_2.length;

    let finalRecords = [
        ...recordsWithout3_2.slice(0, insertIndex),
        ...formattedNew3_2,
        ...recordsWithout3_2.slice(insertIndex)
    ];

    currentFileName = '';
    for (const r of finalRecords) {
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

    csvWriter.writeRecords(finalRecords)
        .then(() => {
            console.log('Done writing updated CSV with 3.2');
        });
  });
