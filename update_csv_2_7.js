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

    const recordsWithout2_7 = results.filter(r => !r['File Name'].includes('2.7 Project Kickoff'));

    const new2_7 = [
      ['2.7 Project Kickoff - HSA', '2.7.1', '[N/A]', 'STAGE 2.7.1: CONNECT STAKEHOLDERS', '2.7.1.1'],
      ['2.7 Project Kickoff - HSA', '2.7.1.1', 'Sales Executive', 'Create Group Chat & add all stakeholders.', '2.7.1.2'],
      ['2.7 Project Kickoff - HSA', '2.7.1.2', 'Sales Executive', 'Sends list of required docs in Client Group Chat (Information needed for LoA: ACRA, NRIC of Director, Contact Number, Email. Other information needed: Tenancy Agreement, Layout plan, Photos of Premises (shopfront), Photos of Premises (places to keep tobacco)).', '2.7.2.1'],

      ['2.7 Project Kickoff - HSA', '2.7.2', '[N/A]', 'STAGE 2.7.2: OBTAIN CORP PASS ACCESS', '2.7.2.1'],
      ['2.7 Project Kickoff - HSA', '2.7.2.1', 'Admin', "Request Client to add MD on Client's Corp Pass.", '2.7.2.2'],
      ['2.7 Project Kickoff - HSA', '2.7.2.2', 'Client', 'Does Client know how to add?', '2.7.2.3, 2.7.2.4'],
      ['2.7 Project Kickoff - HSA', '2.7.2.3', 'Client', 'If yes, Add MD on Corp Pass.', '2.7.1.3'],
      ['2.7 Project Kickoff - HSA', '2.7.2.4', 'Admin', "If no, Help Client to add MD on Client's Corp Pass.", '2.7.1.3'],

      ['2.7 Project Kickoff - HSA', '2.7.1.3', 'Sales Executive', 'Has Client given the necessary documents?', '2.7.1.4, 2.7.1.5'],
      ['2.7 Project Kickoff - HSA', '2.7.1.4', 'Client', 'If yes, Sends requested Docs & Information (Note: If client has paid).', '2.7.3, 2.7.4'],
      ['2.7 Project Kickoff - HSA', '2.7.1.5', 'Sales Executive', 'If no, Follow up with Client on list of documents.', '2.7.1.3'],

      ['2.7 Project Kickoff - HSA', '2.7.3', '[N/A]', 'STAGE 2.7.3: PREPARE LETTER OF AUTHORISATION', '2.7.3.1'],
      ['2.7 Project Kickoff - HSA', '2.7.3.1', 'Admin', 'Review received documents & information (Information Required: ACRA, NRIC of Director, Contact Number, Email).', '2.7.3.2'],
      ['2.7 Project Kickoff - HSA', '2.7.3.2', 'Admin', "Prepare Letter of Authorisation (LoA) in MD's name.", '2.7.3.3'],
      ['2.7 Project Kickoff - HSA', '2.7.3.3', 'Admin', 'Send LoA to client for execution.', '2.7.3.4'],
      ['2.7 Project Kickoff - HSA', '2.7.3.4', 'Client', 'Executes LoA.', '2.7.3.5'],
      ['2.7 Project Kickoff - HSA', '2.7.3.5', 'Client', 'Sends executed LoA to Admin.', '2.7.3.6'],
      ['2.7 Project Kickoff - HSA', '2.7.3.6', 'Admin', 'Receives LoA.', '2.7.5'],

      ['2.7 Project Kickoff - HSA', '2.7.4', '[N/A]', 'STAGE 2.7.4: REVIEW LAYOUT FOR REGULATORY COMPLIANCE', '2.7.4.1'],
      ['2.7 Project Kickoff - HSA', '2.7.4.1', 'Admin', 'Review received documents & information (Information Required: Tenancy Agreement, Layout Plan, Photos of Premises (shopfront), Photos of Premises (Photos of places to keep the tobacco)).', '2.7.4.2'],
      ['2.7 Project Kickoff - HSA', '2.7.4.2', 'Admin', 'Review Layout Plan.', '2.7.4.3'],
      ['2.7 Project Kickoff - HSA', '2.7.4.3', 'Admin', "Is Layout Plan compliant with HSA's requirements?", '2.7.5, 2.7.4.4'],
      ['2.7 Project Kickoff - HSA', '2.7.4.4', 'Admin', 'If no, Edit Layout Plan.', '2.7.4.5'],
      ['2.7 Project Kickoff - HSA', '2.7.4.5', 'Admin', 'Send edited Layout Plan to SE to forward client for review & approval.', '2.7.4.6'],
      ['2.7 Project Kickoff - HSA', '2.7.4.6', 'Sales Executive', 'Receives edited Layout Plan and forwards to client.', '2.7.4.7'],
      ['2.7 Project Kickoff - HSA', '2.7.4.7', 'Client', 'Receives edited Layout Plan.', '2.7.4.8'],
      ['2.7 Project Kickoff - HSA', '2.7.4.8', 'Client', 'Reviews edited Layout Plan.', '2.7.4.9'],
      ['2.7 Project Kickoff - HSA', '2.7.4.9', 'Client', 'Is edited Layout Plan approved?', '2.7.4.10, 2.7.4.12'],
      ['2.7 Project Kickoff - HSA', '2.7.4.10', 'Sales Executive', 'If yes, Informs PM of approval.', '2.7.4.11'],
      ['2.7 Project Kickoff - HSA', '2.7.4.11', 'Project Manager', 'Sends to Admin for Submission.', '2.7.5'],
      ['2.7 Project Kickoff - HSA', '2.7.4.12', 'Client', 'If no, Gives Sales Executive comments on edited Layout Plan.', '2.7.4.13'],
      ['2.7 Project Kickoff - HSA', '2.7.4.13', 'Sales Executive', "Takes in Client's comments and revises Layout Plan.", '2.7.4.4'],

      ['2.7 Project Kickoff - HSA', '2.7.5', '[N/A]', 'STAGE 2.7.5: SUBMISSION ON GO BUSINESS', '2.7.5.1'],
      ['2.7 Project Kickoff - HSA', '2.7.5.1', 'Admin', 'Log onto Go Business (https://www.gobusiness.gov.sg/#).', '2.7.5.2'],
      ['2.7 Project Kickoff - HSA', '2.7.5.2', 'Admin', 'Request OTP from MD.', '2.7.5.3'],
      ['2.7 Project Kickoff - HSA', '2.7.5.3', 'Managing Director', 'Send OTP.', '2.7.5.4'],
      ['2.7 Project Kickoff - HSA', '2.7.5.4', 'Admin', 'Receive OTP.', '2.7.5.5'],
      ['2.7 Project Kickoff - HSA', '2.7.5.5', 'Admin', 'Prepare Draft Submission (& attach documents).', '2.7.5.6'],
      ['2.7 Project Kickoff - HSA', '2.7.5.6', 'Admin', 'Verify details of Draft Submission.', '2.7.5.7'],
      ['2.7 Project Kickoff - HSA', '2.7.5.7', 'Admin', 'Print/ Screenshot Summary & attachments.', '2.7.5.8'],
      ['2.7 Project Kickoff - HSA', '2.7.5.8', 'Admin', 'Submit on Go Business.', '2.7.5.9'],
      ['2.7 Project Kickoff - HSA', '2.7.5.9', 'Admin', 'Make Payment.', '2.7.5.10'],
      ['2.7 Project Kickoff - HSA', '2.7.5.10', 'Admin', 'Print acknowledgment of submission.', '2.7.5.11'],
      ['2.7 Project Kickoff - HSA', '2.7.5.11', 'Admin', 'File printed Summary & attachments & acknowledgement.', '3.7']
    ];

    const formattedNew2_7 = new2_7.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout2_7.findIndex(r => r['File Name'].includes('3.1 Post-Submission'));
    if (insertIndex === -1) insertIndex = recordsWithout2_7.length; 

    let finalRecords = [
        ...recordsWithout2_7.slice(0, insertIndex),
        ...formattedNew2_7,
        ...recordsWithout2_7.slice(insertIndex)
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
            console.log('Done writing updated CSV with 2.7');
        });
  });
