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

    const recordsWithout3_7 = results.filter(r => !r['File Name'].includes('3.7 Post-Submission to Project Completion'));

    const new3_7 = [
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.1', '[N/A]', 'STAGE 3.7.1: RECEIVE REGULATORY NOTIFICATION', '3.7.1.1'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.1.1', 'Health Sciences Authority', 'HSA issues Notification for further clarification.', '3.7.1.2'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.1.2', 'Admin', 'Receives Notification.', '3.7.2.1, 3.7.3.1'],

      ['3.7 Post-Submission to Project Completion - HSA', '3.7.2', '[N/A]', 'STAGE 3.7.2: COORDINATE ON RECTIFICATIONS', '3.7.2.1'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.2.1', 'Client', 'Was Photos of Premises given earlier?', 'YES: 3.7.4.1, NO: 3.7.2.2'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.2.2', 'Client', 'Visits site to take photo of Shop Front and tobacco storage area.', '3.7.2.3'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.2.3', 'Client', 'Sends site photos to internal group chat.', '3.7.4.1'],

      ['3.7 Post-Submission to Project Completion - HSA', '3.7.3', '[N/A]', 'STAGE 3.7.3: COORDINATE ON HSA QUIZ REQUIREMENTS', '3.7.3.1'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.3.1', 'Sales Executive', 'Informs Client of Quiz Requirement (For submission: Quiz shall be completed by Director for submission. For audit: Quiz to be completed by all staff. Client to be informed that: all new hires have to complete HSA Quiz. Quiz Results should be saved for future audit purposes).', '3.7.3.2'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.3.2', 'Client', 'Completes Quiz (by Director).', '3.7.3.3'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.3.3', 'Client', 'Forward Quiz Results to SE.', '3.7.3.4'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.3.4', 'Sales Executive', 'Receives Quiz Results.', '3.7.3.5'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.3.5', 'Sales Executive', 'Sends Quiz Results to internal group chat.', '3.7.4.1'],

      ['3.7 Post-Submission to Project Completion - HSA', '3.7.4', '[N/A]', 'STAGE 3.7.4: RESPOND TO REGULATORY NOTIFICATION', '3.7.4.1'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.4.1', 'Admin', 'Reply to HSA with requested documents.', '3.7.4.2'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.4.2', 'Health Sciences Authority', 'Receives documents.', '3.7.4.3'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.4.3', 'Health Sciences Authority', 'Further rectifications needed by HSA?', 'YES: 3.7.1.1, NO: 3.7.4.4'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.4.4', 'Health Sciences Authority', 'Sends Approval.', '3.7.5.1'],

      ['3.7 Post-Submission to Project Completion - HSA', '3.7.5', '[N/A]', 'STAGE 3.7.5: RECEIVE ACCEPTANCE BY AUTHORITIES', '3.7.5.1'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.5.1', 'Sales Executive', 'Receives email notification on HSA approval.', '3.7.5.2'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.5.2', 'Sales Executive', 'Sends email approval to Admin.', '3.7.5.3'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.5.3', 'Admin', 'Receives email approval.', '3.7.6.1'],

      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6', '[N/A]', 'STAGE 3.7.6: PAYMENT TO HSA FOR LICENCE ISSUANCE', '3.7.6.1'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.1', 'Admin', 'Log onto Go Business.', '3.7.6.2'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.2', 'Admin', 'Request OTP from MD.', '3.7.6.3'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.3', 'Managing Director', 'Send OTP.', '3.7.6.4'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.4', 'Admin', 'Receive OTP.', '3.7.6.5'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.5', 'Admin', 'Make Payment.', '3.7.6.6'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.6', 'Admin', 'Print receipt of payment.', '3.7.6.7'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.7', 'Admin', 'File printed receipt of payment.', '3.7.6.8'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.8', 'Admin', 'AFTER 2 WORKING DAYS.', '3.7.6.9'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.9', 'Admin', 'Log onto Go Business.', '3.7.6.10'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.10', 'Admin', 'Request OTP from MD.', '3.7.6.11'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.11', 'Managing Director', 'Send OTP.', '3.7.6.12'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.12', 'Admin', 'Receive OTP.', '3.7.6.13'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.6.13', 'Admin', 'Has licence been issued post-payment?', 'YES: 3.7.7.1, NO: Wait 1 working day and retry (3.7.6.9)'],

      ['3.7 Post-Submission to Project Completion - HSA', '3.7.7', '[N/A]', 'STAGE 3.7.7: FRAMES LICENCE FOR CLIENT', '3.7.7.1'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.7.1', 'Admin', 'Prints out licence.', '3.7.7.2'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.7.2', 'Admin', "Frames licence up in Dyson's frames.", '3.7.7.3'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.7.3', 'Admin', 'Passes framed licence to SE.', '3.7.7.4'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.7.4', 'Sales Executive', 'Take photo of licence for record & photo with Client for marketing.', '3.7.7.5'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.7.5', 'Sales Executive', 'Pass framed licence to Client.', '3.7.7.6'],
      ['3.7 Post-Submission to Project Completion - HSA', '3.7.7.6', 'Client', 'Receives licence.', 'END']
    ];

    const formattedNew3_7 = new3_7.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout3_7.length;

    let finalRecords = [
        ...recordsWithout3_7.slice(0, insertIndex),
        ...formattedNew3_7,
        ...recordsWithout3_7.slice(insertIndex)
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
            console.log('Done writing updated CSV with 3.7');
        });
  });
