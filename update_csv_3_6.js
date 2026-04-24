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

    const recordsWithout3_6 = results.filter(r => !r['File Name'].includes('3.6 Post-Submission to Project Completion'));

    const new3_6 = [
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.1', '[N/A]', 'STAGE 3.6.1: RECEIVE REGULATORY NOTIFICATION', '3.6.1.1'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.1.1', 'National Environment Agency', 'NEA issues Notification for further clarification.', '3.6.1.2'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.1.2', 'Admin', 'Receives Notification.', '3.6.2.1'],

      ['3.6 Post-Submission to Project Completion - NEA', '3.6.2', '[N/A]', 'STAGE 3.6.2: COORDINATE ON RESPONSE TO QUERIES / RECTIFICATIONS', '3.6.2.1'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.2.1', 'Sales Executive', 'Requests information/ documentation/ clarification from client.', '3.6.2.2'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.2.2', 'Client', 'Sends SE information/ documentation/ clarification.', '3.6.2.3'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.2.3', 'Sales Executive', 'Receives information/ documentation/ clarification from client.', '3.6.2.4'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.2.4', 'Sales Executive', 'Forwards information/ documentation/ clarification from client.', '3.6.3.1'],

      ['3.6 Post-Submission to Project Completion - NEA', '3.6.3', '[N/A]', 'STAGE 3.6.3: RESPOND TO REGULATORY NOTIFICATION', '3.6.3.1'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.3.1', 'Admin', 'Log onto NEA.', '3.6.3.2'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.3.2', 'Admin', 'Request OTP from MD.', '3.6.3.3'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.3.3', 'Managing Director', 'Send OTP.', '3.6.3.4'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.3.4', 'Admin', 'Receive OTP.', '3.6.3.5'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.3.5', 'Admin', 'Prepare Draft Submission (& attach documents).', '3.6.3.6'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.3.6', 'Admin', 'Verify details of Draft Submission.', '3.6.3.7'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.3.7', 'Admin', 'Print/ Screenshot Summary & attachments.', '3.6.3.8'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.3.8', 'Admin', 'Submit on NEA.', '3.6.3.9'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.3.9', 'Admin', 'Print acknowledgment of submission.', '3.6.3.10'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.3.10', 'Admin', 'File printed Summary & attachments & acknowledgement.', '3.6.3.11'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.3.11', 'National Environment Agency', 'Further rectifications needed by NEA?', 'YES: 3.6.1.1, NO: 3.6.4.1'],

      ['3.6 Post-Submission to Project Completion - NEA', '3.6.4', '[N/A]', 'STAGE 3.6.4: RECEIVE ACCEPTANCE BY AUTHORITIES', '3.6.4.1'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.4.1', 'National Environment Agency', 'Sends Approval.', '3.6.4.2'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.4.2', 'Sales Executive', 'Receives email notification on NEA approval.', '3.6.4.3'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.4.3', 'Sales Executive', 'Sends email approval to Admin.', '3.6.6.1'],

      ['3.6 Post-Submission to Project Completion - NEA', '3.6.5', '[N/A]', 'STAGE 3.6.5: RESPOND TO REJECTION', '3.6.5.1'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.5.1', 'National Environment Agency', 'Issues Notice.', '3.6.5.2'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.5.2', 'National Environment Agency', 'Is the Notice an Approval or a Rejection? (If further advice is needed, to consult MD and/or Admin)', 'APPROVAL: 3.6.6.1, REJECTION: 3.6.5.3'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.5.3', 'Sales Executive', 'Draft Appeal Letter.', '3.6.5.4'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.5.4', 'Sales Executive', 'Send Appeal Letter to Admin.', '3.6.5.5'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.5.5', 'Admin', 'Submit Appeal via portal.', '3.6.5.6'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.5.6', 'National Environment Agency', 'Receive Appeal.', '3.6.5.7'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.5.7', 'National Environment Agency', 'Is Appeal successful or further clarification required?', 'APPROVED: 3.6.5.8, NOT APPROVED: 3.6.5.9'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.5.8', 'National Environment Agency', 'Issues Notice of Approval.', '3.6.6.1'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.5.9', 'Sales Executive', 'Receives request for clarification.', '3.6.5.10'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.5.10', 'Sales Executive', 'Seek clarification from client.', '3.6.5.11'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.5.11', 'Client', 'Provides clarification.', '3.6.5.5'],

      ['3.6 Post-Submission to Project Completion - NEA', '3.6.6', '[N/A]', 'STAGE 3.6.6: NOTIFY CLIENT OF APPROVAL', '3.6.6.1'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.6.1', 'Sales Executive', 'Sends Notice of Approval to client.', '3.6.6.2'],
      ['3.6 Post-Submission to Project Completion - NEA', '3.6.6.2', 'Client', 'Receives Notice of Approval.', 'END']
    ];

    const formattedNew3_6 = new3_6.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout3_6.length;

    let finalRecords = [
        ...recordsWithout3_6.slice(0, insertIndex),
        ...formattedNew3_6,
        ...recordsWithout3_6.slice(insertIndex)
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
            console.log('Done writing updated CSV with 3.6');
        });
  });
