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

    const recordsWithout3_1 = results.filter(r => !r['File Name'].includes('3.1 Post-Submission to Project Completion'));

    const new3_1 = [
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.1', '[N/A]', 'STAGE 3.1.1: RECEIVE REGULATORY NOTIFICATION', '3.1.1.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.1.1', 'Singapore Food Agency', 'SPF issues In-Principal Approval (IPA).', '3.1.1.2'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.1.2', 'Admin', 'Receives IPA.', '3.1.1.3'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.1.3', 'Client', 'Receives IPA.', '3.1.2.1'],

      ['3.1 Post-Submission to Project Completion - SFA', '3.1.2', '[N/A]', 'STAGE 3.1.2: COORDINATE ON RESPONSE TO REGULATORY NOTIFICATIONS', '3.1.2.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.2.1', 'Client', 'Sends IPA to SE.', '3.1.2.2'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.2.2', 'Sales Executive', 'Receives IPA.', '3.1.2.3'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.2.3', 'Sales Executive', 'Forward IPA to Admin (via General Email).', '3.1.2.4'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.2.4', 'Admin', 'Review IPA.', '3.1.2.5'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.2.5', 'Admin', 'Requests documentation / status update on renovation from client.', '3.1.2.6'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.2.6', 'Client', 'Sends Admin documentation / status update on renovation.', '3.1.3.1'],

      ['3.1 Post-Submission to Project Completion - SFA', '3.1.3', '[N/A]', 'STAGE 3.1.3: RESPOND TO REGULATORY NOTIFICATION', '3.1.3.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.3.1', 'Admin', 'Receives information/ documentation/ clarification from client.', '3.1.3.2'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.3.2', 'Admin', 'Is premise ready for inspection by SFA?', '3.1.3.5, 3.1.3.3'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.3.3', 'Sales Executive', 'If no, Check in on work schedule.', '3.1.3.4'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.3.4', 'Client', 'Updates SE on work schedule.', '3.1.3.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.3.5', 'Admin', 'If yes, Log in to iFast.', '3.1.3.6'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.3.6', 'Admin', 'Request OTP from MD.', '3.1.4.1'],

      ['3.1 Post-Submission to Project Completion - SFA', '3.1.4', '[N/A]', 'STAGE 3.1.4: COORDINATE AND SECURE INSPECTION DATE WITH SFA', '3.1.4.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.4.1', 'Managing Director', 'Send OTP.', '3.1.4.2'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.4.2', 'Admin', 'Receive OTP.', '3.1.4.3'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.4.3', 'Admin', 'Check available inspection dates in the Portal.', '3.1.4.4'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.4.4', 'Admin', "Check SE's availability and get SE to check on Client's respective availability.", '3.1.4.5'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.4.5', 'Sales Executive', 'Check with Client on availability.', '3.1.4.6'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.4.6', 'Client', 'Inform SE on availability.', '3.1.4.7'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.4.7', 'Sales Executive', "Inform Admin on both SE and Client's availability.", '3.1.4.8'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.4.8', 'Admin', "Book inspection date based on MD's and Client's respective availability.", '3.1.4.9'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.4.9', 'Singapore Food Agency', 'Issues confirmation on inspection date.', '3.1.5.1'],

      ['3.1 Post-Submission to Project Completion - SFA', '3.1.5', '[N/A]', 'STAGE 3.1.5: UPDATE CLIENT ON INSPECTION DATE AND TIMING', '3.1.5.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.5.1', 'Sales Executive', 'Receives confirmation on inspection date.', '3.1.5.2'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.5.2', 'Sales Executive', 'Informs client on confirmation of inspection date.', '3.1.5.3'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.5.3', 'Singapore Food Agency', 'Contacts SE to confirm time of inspection (1 day before inspection date).', '3.1.5.4'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.5.4', 'Sales Executive', 'Informs client on confirmation of inspection timing.', '3.1.6.1'],

      ['3.1 Post-Submission to Project Completion - SFA', '3.1.6', '[N/A]', 'STAGE 3.1.6: FACILITATE SITE INSPECTION', '3.1.6.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.6.1', 'Sales Executive', 'Facilitate Site Inspection via Zoom (on Inspection Day).', '3.1.7.1'],

      ['3.1 Post-Submission to Project Completion - SFA', '3.1.7', '[N/A]', 'STAGE 3.1.7: RECEIVE NOTICE ON RECTIFICATIONS SOUGHT', '3.1.7.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.7.1', 'Singapore Food Agency', 'Is rectification required by SFA?', '3.1.7.2, 3.1.9.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.7.2', 'Singapore Food Agency', 'If yes, Issue rectifications needed via email.', '3.1.8.1'],

      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8', '[N/A]', 'STAGE 3.1.8: COORDINATE & RESPOND TO RECTIFICATIONS SOUGHT', '3.1.8.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.1', 'Sales Executive', "Receive SFA's notification.", '3.1.8.2'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.2', 'Sales Executive', 'Liaise with client/contractor on rectifications needed.', '3.1.8.3'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.3', 'Client', 'Carry out rectification works.', '3.1.8.4'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.4', 'Client', 'Send photos of rectification & documents to SE.', '3.1.8.5'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.5', 'Sales Executive', 'Review photos of rectification for sufficiency.', '3.1.8.6'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.6', 'Sales Executive', "Are the photos & Docs sufficient to meet SFA's requirement?", '3.1.8.7, 3.1.8.14'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.7', 'Sales Executive', 'If yes, Send photos & docs to Admin.', '3.1.8.8'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.8', 'Admin', 'Receive photos of rectification & documents.', '3.1.8.9'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.9', 'Admin', 'Prepare PPT slide/deck (Information to include in deck: Layout plan, Photos, Address, Application No).', '3.1.8.10'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.10', 'Admin', 'Reply SFA with PPT slide/deck.', '3.1.8.11'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.11', 'Singapore Food Agency', 'Receive PPT slide/deck.', '3.1.8.12'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.12', 'Singapore Food Agency', "Is the PPT slide/deck sufficient to meet SFA's requirement?", '3.1.9.1, 3.1.8.13'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.13', 'Singapore Food Agency', 'If no, Go to PG 4 of 8.', '3.1.8.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.8.14', 'Sales Executive', 'If no, Go onsite to take photos of rectification / Request client to send additonal photos.', '3.1.8.3'],

      ['3.1 Post-Submission to Project Completion - SFA', '3.1.9', '[N/A]', 'STAGE 3.1.9: RECEIVE APPROVAL BY AUTHORITIES AND GENERATE BALANCE INVOICE', '3.1.9.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.9.1', 'Singapore Food Agency', 'Issue Approval.', '3.1.9.2'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.9.2', 'Admin', 'Receive Approval.', '3.1.9.3'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.9.3', 'Admin', 'Create Balance Invoice.', '3.1.9.4'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.9.4', 'Admin', 'Send to Client.', '3.1.9.5'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.9.5', 'Client', 'Receive Balance Invoice.', '3.1.9.6'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.9.6', 'Sales Executive', 'Has client paid Balance Invoice?', '3.1.10.1, 3.1.9.7'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.9.7', 'Sales Executive', 'If no, Follow up on payment.', '3.1.9.6'],

      ['3.1 Post-Submission to Project Completion - SFA', '3.1.10', '[N/A]', 'STAGE 3.1.10: ATTEND TO PAYMENT TO SFA (AFTER RECEIPT OF CLIENT\'S BALANCE PAYMENT)', '3.1.10.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.10.1', 'Admin', 'Log onto Go Business SG (https://www.gobusiness.gov.sg/#).', '3.1.10.2'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.10.2', 'Admin', 'Request OTP from MD.', '3.1.10.3'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.10.3', 'Managing Director', 'Send OTP.', '3.1.10.4'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.10.4', 'Admin', 'Receive OTP.', '3.1.10.5'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.10.5', 'Admin', 'Make Payment.', '3.1.11.1'],

      ['3.1 Post-Submission to Project Completion - SFA', '3.1.11', '[N/A]', 'STAGE 3.1.11: NOTIFY CLIENT OF APPROVAL', '3.1.11.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.11.1', 'Singapore Food Agency', 'Issues email approval to MD.', '3.1.11.2'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.11.2', 'Admin', 'Screenshots approval email.', '3.1.11.3'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.11.3', 'Admin', 'Notifies client on SFA approval.', '3.1.11.4'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.11.4', 'Client', 'Receives notification of SFA Approval.', '3.1.12.1'],

      ['3.1 Post-Submission to Project Completion - SFA', '3.1.12', '[N/A]', 'STAGE 3.1.12: FRAMES LICENCE FOR CLIENT', '3.1.12.1'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.12.1', 'Admin', 'Prints out licence.', '3.1.12.2'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.12.2', 'Admin', "Frames licence up in Dyson's frames.", '3.1.12.3'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.12.3', 'Admin', 'Passes framed licence to MD.', '3.1.12.4'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.12.4', 'Sales Executive', "Pass framed licence to Client & take photos & get Client's consent to use photos for publicity (PDPA).", '3.1.12.5'],
      ['3.1 Post-Submission to Project Completion - SFA', '3.1.12.5', 'Client', 'Receives licence.', 'END']
    ];

    const formattedNew3_1 = new3_1.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout3_1.length;

    let finalRecords = [
        ...recordsWithout3_1.slice(0, insertIndex),
        ...formattedNew3_1,
        ...recordsWithout3_1.slice(insertIndex)
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
            console.log('Done writing updated CSV with 3.1');
        });
  });
