const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const results = [];
fs.createReadStream('flow_cleaned_4col.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // We want to keep everything EXCEPT the old 2.1 records.
    // The old 2.1 records might have 'File Name' empty, but we can detect them by populating File Name first.

    let currentFileName = '';
    for (const r of results) {
        if (r['File Name'] && r['File Name'].trim() !== '') {
            currentFileName = r['File Name'];
        } else {
            r['File Name'] = currentFileName;
        }
    }

    const recordsWithout2_1 = results.filter(r => !r['File Name'].includes('2.1 Project Kickoff'));

    const new2_1 = [
      ['2.1 Project Kickoff - SFA', '2.1.1', '[N/A]', 'STAGE 2.1.1: CONNECT STAKEHOLDERS', '2.1.1.1'],
      ['2.1 Project Kickoff - SFA', '2.1.1.1', 'Sales Executive', 'Create Group Chat & add all stakeholders.', '2.1.1.2'],
      ['2.1 Project Kickoff - SFA', '2.1.1.2', 'Sales Executive', "Sends list of required docs in Client Group Chat (Requested Information: ACRA, NRIC, Contact Number, Email. Other: Tenancy agreement, Layout plan, Food & drinks menu, Pest control contract, Food handlers' certificate(s) and NRIC(s), Food Hygiene Officer's certificate and NRIC (if unit exceeds 16sqm), Stamp duty).", '2.1.1.3'],
      ['2.1 Project Kickoff - SFA', '2.1.1.3', 'Admin', "Request Client to add MD on Client's Corp Pass.", '2.1.1.4'],
      ['2.1 Project Kickoff - SFA', '2.1.1.4', 'Client', 'Does Client know how to add?', '2.1.1.5, 2.1.1.6'],
      ['2.1 Project Kickoff - SFA', '2.1.1.5', 'Client', 'If yes, Add MD on Corp Pass.', '2.1.2'],
      ['2.1 Project Kickoff - SFA', '2.1.1.6', 'Admin', "If no, Help Client to add MD on Client's Corp Pass.", '2.1.2'],

      ['2.1 Project Kickoff - SFA', '2.1.2', '[N/A]', 'STAGE 2.1.2: OBTAIN CORP PASS ACCESS', '2.1.2.1'],
      ['2.1 Project Kickoff - SFA', '2.1.2.1', 'Client', 'Has Client given the necessary documents?', '2.1.2.2, 2.1.2.3'],
      ['2.1 Project Kickoff - SFA', '2.1.2.2', 'Client', 'If yes, Sends requested Docs & Information.', '2.1.2.4'],
      ['2.1 Project Kickoff - SFA', '2.1.2.3', 'Sales Executive', 'If no, Follow up with Client on list of documents.', '2.1.2.1'],
      ['2.1 Project Kickoff - SFA', '2.1.2.4', 'Admin', 'Check if client has paid.', '2.1.3, 2.1.4'],

      ['2.1 Project Kickoff - SFA', '2.1.3', '[N/A]', 'STAGE 2.1.3: PREPARE LETTER OF AUTHORISATION', '2.1.3.1'],
      ['2.1 Project Kickoff - SFA', '2.1.3.1', 'Admin', 'Review received documents & information.', '2.1.3.2'],
      ['2.1 Project Kickoff - SFA', '2.1.3.2', 'Admin', 'Prepare Letter of Authorisation (LoA).', '2.1.3.3'],
      ['2.1 Project Kickoff - SFA', '2.1.3.3', 'Admin', 'Send LoA to client for execution.', '2.1.3.4'],
      ['2.1 Project Kickoff - SFA', '2.1.3.4', 'Client', 'Executes LoA.', '2.1.3.5'],
      ['2.1 Project Kickoff - SFA', '2.1.3.5', 'Client', 'Sends executed LoA to Admin.', '2.1.3.6'],
      ['2.1 Project Kickoff - SFA', '2.1.3.6', 'Admin', 'Receives LoA.', '2.1.3.7'],
      ['2.1 Project Kickoff - SFA', '2.1.3.7', 'Admin', 'Send documents to Admin for online submission.', '2.1.6'],

      ['2.1 Project Kickoff - SFA', '2.1.4', '[N/A]', 'STAGE 2.1.4: PREPARE PLANS FOR REGULATORY COMPLIANCE', '2.1.4.1'],
      ['2.1 Project Kickoff - SFA', '2.1.4.1', 'Project Manager', 'Review layout plan.', '2.1.4.2'],
      ['2.1 Project Kickoff - SFA', '2.1.4.2', 'Admin', "Is the floor plan compliant with SFA's requirements? (Common requirements: Tray return location, Number of wash basins, Number of toilets, Greasetrap access).", '2.1.6, 2.1.4.3'],
      ['2.1 Project Kickoff - SFA', '2.1.4.3', 'Admin', 'If no, Suggest rectifications (Edit Layout Plan with suggested rectifications).', '2.1.4.4'],
      ['2.1 Project Kickoff - SFA', '2.1.4.4', 'Sales Executive', 'Receives edited Layout Plan and forwards to client.', '2.1.4.5'],
      ['2.1 Project Kickoff - SFA', '2.1.4.5', 'Client', 'Receive rectification comments.', '2.1.4.6'],
      ['2.1 Project Kickoff - SFA', '2.1.4.6', 'Client', 'Do clients have further comments to suggested rectifications?', '2.1.4.7, 2.1.4.10'],
      ['2.1 Project Kickoff - SFA', '2.1.4.7', 'Project Manager', 'If yes, Collate comments from client.', '2.1.4.8'],
      ['2.1 Project Kickoff - SFA', '2.1.4.8', 'Project Manager', 'Send layout plan & consolidated rectification comments to Freelancers.', '2.1.4.9'],
      ['2.1 Project Kickoff - SFA', '2.1.4.9', 'Freelancers', 'Touch up layout plan & include comments (Content of project: List of equipment, Compliance with Food Hygiene code).', '2.1.4.10'],
      ['2.1 Project Kickoff - SFA', '2.1.4.10', 'Freelancers', 'Sends to PM.', '2.1.4.11'],
      ['2.1 Project Kickoff - SFA', '2.1.4.11', 'Project Manager', 'Receives revised layout plan.', '2.1.4.12'],
      ['2.1 Project Kickoff - SFA', '2.1.4.12', 'Project Manager', 'Sends to client as project update.', '2.1.5'],

      ['2.1 Project Kickoff - SFA', '2.1.5', '[N/A]', "STAGE 2.1.5: SEEK CLIENT'S COMMENTS, IF ANY", '2.1.5.1'],
      ['2.1 Project Kickoff - SFA', '2.1.5.1', 'Client', 'Receives revised floor plans.', '2.1.5.2'],
      ['2.1 Project Kickoff - SFA', '2.1.5.2', 'Client', 'Do clients have any comments on floor plans?', '2.1.5.3, 2.1.5.4'],
      ['2.1 Project Kickoff - SFA', '2.1.5.3', 'Project Manager', "If yes, Revise drawing as per clients' comments.", '2.1.4.8'],
      ['2.1 Project Kickoff - SFA', '2.1.5.4', 'Admin', 'If no, Send documents to Admin for online submission.', '2.1.6'],

      ['2.1 Project Kickoff - SFA', '2.1.6', '[N/A]', 'STAGE 2.1.6: SUBMISSION ON GO BUSINESS SG', '2.1.6.1'],
      ['2.1 Project Kickoff - SFA', '2.1.6.1', 'Admin', 'Log onto Go Business SG (https://www.gobusiness.gov.sg/#).', '2.1.6.2'],
      ['2.1 Project Kickoff - SFA', '2.1.6.2', 'Admin', 'Request OTP from MD.', '2.1.6.3'],
      ['2.1 Project Kickoff - SFA', '2.1.6.3', 'Managing Director', 'Send OTP.', '2.1.6.4'],
      ['2.1 Project Kickoff - SFA', '2.1.6.4', 'Admin', 'Receive OTP.', '2.1.6.5'],
      ['2.1 Project Kickoff - SFA', '2.1.6.5', 'Admin', 'Prepare Draft Submission.', '2.1.6.6'],
      ['2.1 Project Kickoff - SFA', '2.1.6.6', 'Admin', 'Verify details of Draft Submission.', '2.1.6.7'],
      ['2.1 Project Kickoff - SFA', '2.1.6.7', 'Admin', 'Print Summary & attachments.', '2.1.6.8'],
      ['2.1 Project Kickoff - SFA', '2.1.6.8', 'Admin', 'Submit on Go Business SG.', '2.1.6.9'],
      ['2.1 Project Kickoff - SFA', '2.1.6.9', 'Admin', 'Print acknowledgment of submission.', '2.1.6.10'],
      ['2.1 Project Kickoff - SFA', '2.1.6.10', 'Admin', 'File printed Summary & attachments.', '3.1']
    ];

    const formattedNew2_1 = new2_1.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    // Find the index to insert 2.1. 
    // It should be after 1.2 and before 2.2
    let insertIndex = recordsWithout2_1.findIndex(r => r['File Name'].includes('2.2 Project Kickoff'));
    if (insertIndex === -1) insertIndex = recordsWithout2_1.length; // fallback

    let finalRecords = [
        ...recordsWithout2_1.slice(0, insertIndex),
        ...formattedNew2_1,
        ...recordsWithout2_1.slice(insertIndex)
    ];

    // Clean up File Name column so only the first row of each group has the File Name
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
            console.log('Done writing updated CSV with 2.1');
        });
  });
