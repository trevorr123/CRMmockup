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

    const recordsWithout2_5 = results.filter(r => !r['File Name'].includes('2.5 Project Kickoff'));

    const new2_5 = [
      ['2.5 Project Kickoff - SPF', '2.5.1', '[N/A]', 'STAGE 2.5.1: CONNECT STAKEHOLDERS', '2.5.1.1'],
      ['2.5 Project Kickoff - SPF', '2.5.1.1', 'Sales Executive', 'Create Group Chat & add all stakeholders.', '2.5.1.2'],
      ['2.5 Project Kickoff - SPF', '2.5.1.2', 'Sales Executive', 'Sends list of required docs in Client Group Chat (Information needed for LoA: ACRA, NRIC of Director, Contact Number, Email. Other information needed: Tenancy agreement, Layout plan).', '2.5.1.3'],
      ['2.5 Project Kickoff - SPF', '2.5.1.3', 'Client', 'Receive & execute forms.', '2.5.1.4'],
      ['2.5 Project Kickoff - SPF', '2.5.1.4', 'Client', 'Send executed forms to SE.', '2.5.1.5'],
      ['2.5 Project Kickoff - SPF', '2.5.1.5', 'Sales Executive', 'Receive executed Forms.', '2.5.1.6'],
      ['2.5 Project Kickoff - SPF', '2.5.1.6', 'Sales Executive', 'Has Client given the necessary documents?', '2.5.1.7, 2.5.1.8'],
      ['2.5 Project Kickoff - SPF', '2.5.1.7', 'Client', 'If yes, Sends requested Docs & Information.', '2.5.2'],
      ['2.5 Project Kickoff - SPF', '2.5.1.8', 'Sales Executive', 'If no, Follow up with Client on list of documents.', '2.5.1.6'],

      ['2.5 Project Kickoff - SPF', '2.5.2', '[N/A]', 'STAGE 2.5.2: OBTAIN CLARIFICATION ON LIQUOR AND/OR PUBLIC ENTERTAINMENT NEEDS', '2.5.2.1'],
      ['2.5 Project Kickoff - SPF', '2.5.2.1', 'Admin', 'Review received documents & information.', '2.5.2.2'],
      ['2.5 Project Kickoff - SPF', '2.5.2.2', 'Admin', 'Clarify with Client on Liquor Licence needs & Public Entertainment needs (Liquor Licence: Types of alcoholic beverages sold, operating time, dine-in/takeaway. Public Entertainment: Will there be live entertainment?).', '2.5.2.3'],
      ['2.5 Project Kickoff - SPF', '2.5.2.3', 'Sales Executive', 'Send information on Liquor Licence needs & Public Entertainment needs.', '2.5.2.4'],
      ['2.5 Project Kickoff - SPF', '2.5.2.4', 'Client', 'Is information given by client complete?', '2.5.4, 2.5.2.2'],

      ['2.5 Project Kickoff - SPF', '2.5.4', '[N/A]', 'STAGE 2.5.4: SUBMISSION ON GO BUSINESS SG', '2.5.4.1'],
      ['2.5 Project Kickoff - SPF', '2.5.4.1', 'Admin', 'Log onto Go Business SG (https://www.gobusiness.gov.sg/#).', '2.5.4.2'],
      ['2.5 Project Kickoff - SPF', '2.5.4.2', 'Admin', 'Request OTP from MD.', '2.5.4.3'],
      ['2.5 Project Kickoff - SPF', '2.5.4.3', 'Managing Director', 'Send OTP.', '2.5.4.4'],
      ['2.5 Project Kickoff - SPF', '2.5.4.4', 'Admin', 'Receive OTP.', '2.5.4.5'],
      ['2.5 Project Kickoff - SPF', '2.5.4.5', 'Admin', 'Prepare Draft Submission (& attach documents).', '2.5.4.6'],
      ['2.5 Project Kickoff - SPF', '2.5.4.6', 'Admin', 'Verify details of Draft Submission.', '2.5.4.7'],
      ['2.5 Project Kickoff - SPF', '2.5.4.7', 'Admin', 'Print/ Screenshot Summary & attachments.', '2.5.4.8'],
      ['2.5 Project Kickoff - SPF', '2.5.4.8', 'Admin', 'Submit on Go Business SG.', '2.5.4.9'],
      ['2.5 Project Kickoff - SPF', '2.5.4.9', 'Admin', 'Print acknowledgment of submission.', '2.5.4.10'],
      ['2.5 Project Kickoff - SPF', '2.5.4.10', 'Admin', 'File printed Summary & attachments & acknowledgement.', '3.5.1']
    ];

    const formattedNew2_5 = new2_5.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout2_5.findIndex(r => r['File Name'].includes('3.1 Post-Submission'));
    if (insertIndex === -1) insertIndex = recordsWithout2_5.length; 

    let finalRecords = [
        ...recordsWithout2_5.slice(0, insertIndex),
        ...formattedNew2_5,
        ...recordsWithout2_5.slice(insertIndex)
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
            console.log('Done writing updated CSV with 2.5');
        });
  });
