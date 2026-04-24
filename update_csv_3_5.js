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

    const recordsWithout3_5 = results.filter(r => !r['File Name'].includes('3.5 Post-Submission to Project Completion'));

    const new3_5 = [
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.1', '[N/A]', 'STAGE 3.5.1: RECEIVE REGULATORY NOTIFICATION', '3.5.1.1'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.1.1', 'Singapore Police Force', 'SPF issues Notification to acknowledge receipt and inform that application is in process/rejected.', '3.5.1.2'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.1.2', 'Singapore Police Force', 'Is further clarification needed?', 'YES: 3.5.1.3, NO: 3.5.4.1'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.1.3', 'Singapore Police Force', 'If yes, SPF Issues Notification for further clarification.', '3.5.1.4'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.1.4', 'Admin', 'Receives Notification for clarification.', '3.5.2.1'],

      ['3.5 Post-Submission to Project Completion - SPF', '3.5.2', '[N/A]', 'STAGE 3.5.2: COORDINATE ON RECTIFICATIONS', '3.5.2.1'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.2.1', 'Admin', 'Requests information/ documentation/ clarification from client.', '3.5.2.2'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.2.2', 'Client', 'Sends SE information/ documentation/ clarification.', '3.5.2.3'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.2.3', 'Sales Executive', 'Receives information/ documentation/ clarification from client.', '3.5.2.4'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.2.4', 'Client', 'Has Client given the necessary documents?', 'YES: 3.5.2.6, NO: 3.5.2.5'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.2.5', 'Sales Executive', 'Follow up with Client on list of documents.', '3.5.2.4'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.2.6', 'Client', 'Forwards information/ documentation/ clarification to Admin.', '3.5.3.1'],

      ['3.5 Post-Submission to Project Completion - SPF', '3.5.3', '[N/A]', 'STAGE 3.5.3: RESPOND TO REGULATORY NOTIFICATION', '3.5.3.1'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.3.1', 'Admin', 'Submits via email to SPF.', '3.5.4.1'],

      ['3.5 Post-Submission to Project Completion - SPF', '3.5.4', '[N/A]', 'STAGE 3.5.4: RECEIVE ACCEPTANCE BY AUTHORITIES', '3.5.4.1'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.4.1', 'Client', 'Receives approval & payment instructions from SPF.', '3.5.4.2'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.4.2', 'Client', 'Forwards email approval & payment instructions to Admin.', '3.5.4.3'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.4.3', 'Admin', 'Receives forwarded SPF email approval & payment instructions.', '3.5.5.1'],

      ['3.5 Post-Submission to Project Completion - SPF', '3.5.5', '[N/A]', 'STAGE 3.5.5: MAKE PAYMENT', '3.5.5.1'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.5.1', 'Admin', 'Log onto Go Business SG.', '3.5.5.2'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.5.2', 'Admin', 'Request OTP from MD.', '3.5.5.3'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.5.3', 'Managing Director', 'Send OTP.', '3.5.5.4'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.5.4', 'Admin', 'Receive OTP.', '3.5.5.5'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.5.5', 'Admin', 'Make Payment.', '3.5.5.6'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.5.6', 'Singapore Police Force', 'Issues email approval.', '3.5.5.7'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.5.7', 'Admin', 'Screenshots approval email.', '3.5.5.8'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.5.8', 'Admin', 'Notifies client on SPF approval.', '3.5.6.1'],

      ['3.5 Post-Submission to Project Completion - SPF', '3.5.6', '[N/A]', 'STAGE 3.5.6: OBTAIN HARDCOPY LICENCE FROM SPF', '3.5.6.1'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.6.1', 'Client', 'Did client receive hardcopy licence from SPF?', 'YES: 3.5.6.2, NO: 3.5.6.3'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.6.2', 'Client', 'If yes, Receives hardcopy licence from SPF.', '3.5.7.1'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.6.3', 'Client', 'If no, Makes online appointment to go Cantoment branch to pick up hardcopy licence.', '3.5.6.4'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.6.4', 'Client', 'Goes to Cantoment branch with email confirmation to retrieve hardcopy licence.', '3.5.6.5'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.6.5', 'Client', 'Pass hardcopy licence to Admin for framing.', '3.5.7.4'],

      ['3.5 Post-Submission to Project Completion - SPF', '3.5.7', '[N/A]', 'STAGE 3.5.7: FRAMES LICENCE FOR CLIENT', '3.5.7.1, 3.5.7.4'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.7.1', 'Sales Executive', 'Visits site with empty frame.', '3.5.7.2'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.7.2', 'Sales Executive', "Frames licence up in Dyson's frames.", '3.5.7.3'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.7.3', 'Sales Executive', 'Take photo of licence for record & photo with Client for marketing.', '3.5.7.7'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.7.4', 'Admin', "Frames licence up in Dyson's frames.", '3.5.7.5'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.7.5', 'Admin', 'Passes framed licence to MD.', '3.5.7.6'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.7.6', 'Managing Director', 'Pass framed licence to Client.', '3.5.7.7'],
      ['3.5 Post-Submission to Project Completion - SPF', '3.5.7.7', 'Client', 'Receives licence.', 'END']
    ];

    const formattedNew3_5 = new3_5.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout3_5.length;

    let finalRecords = [
        ...recordsWithout3_5.slice(0, insertIndex),
        ...formattedNew3_5,
        ...recordsWithout3_5.slice(insertIndex)
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
            console.log('Done writing updated CSV with 3.5');
        });
  });
