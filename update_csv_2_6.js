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

    const recordsWithout2_6 = results.filter(r => !r['File Name'].includes('2.6 Project Kickoff'));

    const new2_6 = [
      ['2.6 Project Kickoff - NEA', '2.6.1', '[N/A]', 'STAGE 2.6.1: CONNECT STAKEHOLDERS', '2.6.1.1'],
      ['2.6 Project Kickoff - NEA', '2.6.1.1', 'Sales Executive', 'Create Group Chat & add all stakeholders.', '2.6.1.2'],
      ['2.6 Project Kickoff - NEA', '2.6.1.2', 'Sales Executive', "Sends list of required docs in Client Group Chat (Information needed for LoA: ACRA (or client's confirmation that no company is registered yet), NRIC of Director, Contact Number, Email. Other information needed: Business Plan, Layout plan).", '2.6.1.3'],
      ['2.6 Project Kickoff - NEA', '2.6.1.3', 'Client', 'Receive & execute forms.', '2.6.1.4'],
      ['2.6 Project Kickoff - NEA', '2.6.1.4', 'Client', 'Send executed forms to SE.', '2.6.1.5'],
      ['2.6 Project Kickoff - NEA', '2.6.1.5', 'Sales Executive', 'Receive executed Forms.', '2.6.1.6'],
      ['2.6 Project Kickoff - NEA', '2.6.1.6', 'Sales Executive', 'Has Client given the necessary documents?', '2.6.1.7, 2.6.1.8'],
      ['2.6 Project Kickoff - NEA', '2.6.1.7', 'Client', 'If yes, Sends requested Docs & Information.', '2.6.2'],
      ['2.6 Project Kickoff - NEA', '2.6.1.8', 'Sales Executive', 'If no, Follow up with Client on list of documents.', '2.6.1.6'],

      ['2.6 Project Kickoff - NEA', '2.6.2', '[N/A]', 'STAGE 2.6.2: OBTAIN CORP PASS ACCESS', '2.6.2.1'],
      ['2.6 Project Kickoff - NEA', '2.6.2.1', 'Admin', 'Has Client registered a company?', '2.6.2.2, 2.6.2.5'],
      ['2.6 Project Kickoff - NEA', '2.6.2.2', 'Admin', "If yes, Request Client to add MD on Client's Corp Pass.", '2.6.2.3'],
      ['2.6 Project Kickoff - NEA', '2.6.2.3', 'Client', 'Does Client know how to add?', '2.6.2.4, 2.6.2.6'],
      ['2.6 Project Kickoff - NEA', '2.6.2.4', 'Client', 'If yes, Add MD on Corp Pass.', '2.6.3'],
      ['2.6 Project Kickoff - NEA', '2.6.2.5', 'Admin', "If no, Where client has not registered a company, Dyson will then make the application to NEA directly in MD's name.", '2.6.3'],
      ['2.6 Project Kickoff - NEA', '2.6.2.6', 'Admin', "If no, Help Client to add MD on Client's Corp Pass at client's site (Must be done face-to-face with client for PDPA compliance).", '2.6.3'],

      ['2.6 Project Kickoff - NEA', '2.6.3', '[N/A]', 'STAGE 2.6.3: PREPARE BUSINESS PLAN FOR REGULATORY COMPLIANCE', '2.6.3.1'],
      ['2.6 Project Kickoff - NEA', '2.6.3.1', 'Admin', 'Review received documents & information (Information Required: Business Plan/Concept).', '2.6.3.2'],
      ['2.6 Project Kickoff - NEA', '2.6.3.2', 'Admin', "Edits Business Plan for compliance with NEA's requirements (Note: If guidance is required, Admin is able to offer).", '2.6.3.3'],
      ['2.6 Project Kickoff - NEA', '2.6.3.3', 'Admin', 'Send edited Business Plan to MD for review & approval.', '2.6.3.4'],
      ['2.6 Project Kickoff - NEA', '2.6.3.4', 'Managing Director', 'Receives edited Business Plan.', '2.6.3.5'],
      ['2.6 Project Kickoff - NEA', '2.6.3.5', 'Managing Director', 'Reviews edited Business Plan.', '2.6.3.6'],
      ['2.6 Project Kickoff - NEA', '2.6.3.6', 'Managing Director', 'Is edited Business Plan approved?', '2.6.3.7, 2.6.3.8'],
      ['2.6 Project Kickoff - NEA', '2.6.3.7', 'Sales Executive', 'If yes, Sends revised/edited Business Plan to client for approval.', '2.6.4'],
      ['2.6 Project Kickoff - NEA', '2.6.3.8', 'Managing Director', 'If no, Gives SE comments on edited Business Plan.', '2.6.3.9'],
      ['2.6 Project Kickoff - NEA', '2.6.3.9', 'Admin', "Takes in MD's comments and revises Business Plan.", '2.6.3.3'],

      ['2.6 Project Kickoff - NEA', '2.6.4', '[N/A]', 'STAGE 2.6.4: SUBMISSION ON NEA', '2.6.4.1'],
      ['2.6 Project Kickoff - NEA', '2.6.4.1', 'Admin', 'Log onto NEA (https://www.eportal.nea.gov.sg/).', '2.6.4.2'],
      ['2.6 Project Kickoff - NEA', '2.6.4.2', 'Admin', 'Request OTP from MD.', '2.6.4.3'],
      ['2.6 Project Kickoff - NEA', '2.6.4.3', 'Managing Director', 'Send OTP.', '2.6.4.4'],
      ['2.6 Project Kickoff - NEA', '2.6.4.4', 'Admin', 'Receive OTP.', '2.6.4.5'],
      ['2.6 Project Kickoff - NEA', '2.6.4.5', 'Admin', 'Prepare Draft Submission (& attach documents).', '2.6.4.6'],
      ['2.6 Project Kickoff - NEA', '2.6.4.6', 'Admin', 'Verify details of Draft Submission.', '2.6.4.7'],
      ['2.6 Project Kickoff - NEA', '2.6.4.7', 'Admin', 'Print/ Screenshot Summary & attachments.', '2.6.4.8'],
      ['2.6 Project Kickoff - NEA', '2.6.4.8', 'Admin', 'Submit on NEA.', '2.6.4.9'],
      ['2.6 Project Kickoff - NEA', '2.6.4.9', 'Admin', 'Print acknowledgment of submission.', '2.6.4.10'],
      ['2.6 Project Kickoff - NEA', '2.6.4.10', 'Admin', 'File printed Summary & attachments & acknowledgement.', '3.7.1']
    ];

    const formattedNew2_6 = new2_6.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout2_6.findIndex(r => r['File Name'].includes('3.1 Post-Submission'));
    if (insertIndex === -1) insertIndex = recordsWithout2_6.length; 

    let finalRecords = [
        ...recordsWithout2_6.slice(0, insertIndex),
        ...formattedNew2_6,
        ...recordsWithout2_6.slice(insertIndex)
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
            console.log('Done writing updated CSV with 2.6');
        });
  });
