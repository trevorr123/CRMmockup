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

    const recordsWithout2_2 = results.filter(r => !r['File Name'].includes('2.2 Project Kickoff'));

    const new2_2 = [
      ['2.2 Project Kickoff - HDB', '2.2.1', '[N/A]', 'STAGE 2.2.1: PREPARE HDB FORM', '2.2.1.1'],
      ['2.2 Project Kickoff - HDB', '2.2.1.1', 'Sales Executive', 'Fill up HDB Form.', '2.2.2'],

      ['2.2 Project Kickoff - HDB', '2.2.2', '[N/A]', 'STAGE 2.2.2: CONNECT STAKEHOLDERS', '2.2.2.1'],
      ['2.2 Project Kickoff - HDB', '2.2.2.1', 'Sales Executive', 'Create Group Chat & add all stakeholders.', '2.2.2.2'],
      ['2.2 Project Kickoff - HDB', '2.2.2.2', 'Sales Executive', 'Sends list of required docs in Client Group Chat (Requested Information: Layout plan OR photos of the premises, ACRA, NRIC of Director, Contact Number, Email).', '2.2.2.3'],
      ['2.2 Project Kickoff - HDB', '2.2.2.3', 'Client', 'Receive & execute forms.', '2.2.2.4'],
      ['2.2 Project Kickoff - HDB', '2.2.2.4', 'Client', 'Send executed forms to SE.', '2.2.2.5'],
      ['2.2 Project Kickoff - HDB', '2.2.2.5', 'Sales Executive', 'Receive executed Forms.', '2.2.2.6'],
      ['2.2 Project Kickoff - HDB', '2.2.2.6', 'Sales Executive', 'Has Client given the necessary documents?', '2.2.2.7, 2.2.2.8'],
      ['2.2 Project Kickoff - HDB', '2.2.2.7', 'Client', 'If yes, Sends requested Docs & Information.', '2.2.3'],
      ['2.2 Project Kickoff - HDB', '2.2.2.8', 'Sales Executive', 'If no, Follow up with Client on list of documents.', '2.2.2.6'],

      ['2.2 Project Kickoff - HDB', '2.2.3', '[N/A]', 'STAGE 2.2.3: PREPARE DETAILED DRAWINGS FOR REGULATORY COMPLIANCE', '2.2.3.1'],
      ['2.2 Project Kickoff - HDB', '2.2.3.1', 'Project Manager', 'Prepare Building Plan (BP).', '2.2.3.2'],
      ['2.2 Project Kickoff - HDB', '2.2.3.2', 'Admin', 'Send necessary documents to Freelancer to draw MV.', '2.2.3.3'],
      ['2.2 Project Kickoff - HDB', '2.2.3.3', 'Freelancers', 'Prepare detailed drawings.', '2.2.3.4, 2.2.3.7'],
      ['2.2 Project Kickoff - HDB', '2.2.3.4', 'Sales Executive', 'Receive detailed drawings by Freelancer.', '2.2.3.5'],
      ['2.2 Project Kickoff - HDB', '2.2.3.5', 'Sales Executive', 'SE checks for whether revisions tally with site condition.', '2.2.3.6'],
      ['2.2 Project Kickoff - HDB', '2.2.3.6', 'Sales Executive', 'Are there revisions to be made by Freelancer?', '2.2.3.12, 2.2.3.13'],
      ['2.2 Project Kickoff - HDB', '2.2.3.7', 'Project Manager', 'Receive detailed drawings by Freelancer.', '2.2.3.8'],
      ['2.2 Project Kickoff - HDB', '2.2.3.8', 'Project Manager', 'PM checks for regulatory compliance (FS code, etc).', '2.2.3.9'],
      ['2.2 Project Kickoff - HDB', '2.2.3.9', 'Project Manager', 'Are there revisions to be made by Freelancer?', '2.2.3.10, 2.2.3.11'],
      ['2.2 Project Kickoff - HDB', '2.2.3.10', 'Project Manager', 'If yes, Instructs Freelancers on revisions.', '2.2.3.11'],
      ['2.2 Project Kickoff - HDB', '2.2.3.11', 'Project Manager', 'Collate and send detailed drawings (BP, MV) to Vetter/RI for approval.', '2.2.3.14'],
      ['2.2 Project Kickoff - HDB', '2.2.3.12', 'Sales Executive', 'If yes, Instructs Freelancers on revisions.', '2.2.3.13'],
      ['2.2 Project Kickoff - HDB', '2.2.3.13', 'Sales Executive', 'Send to PM to collate.', '2.2.3.11'],
      ['2.2 Project Kickoff - HDB', '2.2.3.14', 'Civil Engineer', 'Receive detailed drawings.', '2.2.3.15'],
      ['2.2 Project Kickoff - HDB', '2.2.3.15', 'Civil Engineer', 'Are the detailed drawings approved by Vetter/RI?', '2.2.4, 2.2.3.16'],
      ['2.2 Project Kickoff - HDB', '2.2.3.16', 'Project Manager', "If no, Collate Vetter/RI's comments & revisions.", '2.2.3.17'],
      ['2.2 Project Kickoff - HDB', '2.2.3.17', 'Project Manager', 'Revise Building Plan (BP).', '2.2.3.18'],
      ['2.2 Project Kickoff - HDB', '2.2.3.18', 'Project Manager', 'Instructs Freelancers on revisions.', '2.2.3.3'],

      ['2.2 Project Kickoff - HDB', '2.2.4', '[N/A]', 'STAGE 2.2.4: ENDORSE & ENCRYPT DETAILED DRAWINGS', '2.2.4.1'],
      ['2.2 Project Kickoff - HDB', '2.2.4.1', 'Project Manager', 'Send detailed drawings to Qualified Persons (QP).', '2.2.4.2, 2.2.4.6'],
      ['2.2 Project Kickoff - HDB', '2.2.4.2', 'Mechanical Engineer', 'Receives ACMV & HDB Form.', '2.2.4.3'],
      ['2.2 Project Kickoff - HDB', '2.2.4.3', 'Mechanical Engineer', 'Endorses & encrypts ACMV.', '2.2.4.4'],
      ['2.2 Project Kickoff - HDB', '2.2.4.4', 'Mechanical Engineer', 'Sends to PM.', '2.2.4.5'],
      ['2.2 Project Kickoff - HDB', '2.2.4.5', 'Project Manager', 'Receives endorsed & encrypted ACMV.', '2.2.4.11'],
      ['2.2 Project Kickoff - HDB', '2.2.4.6', 'Civil Engineer', 'Receives BP & HDB Form.', '2.2.4.7'],
      ['2.2 Project Kickoff - HDB', '2.2.4.7', 'Civil Engineer', 'Endorses BP.', '2.2.4.8'],
      ['2.2 Project Kickoff - HDB', '2.2.4.8', 'Civil Engineer', 'Sends to PM.', '2.2.4.9'],
      ['2.2 Project Kickoff - HDB', '2.2.4.9', 'Project Manager', 'Receives endorsed BP.', '2.2.4.10'],
      ['2.2 Project Kickoff - HDB', '2.2.4.10', 'Admin', 'Encrypt BP.', '2.2.4.11'],
      ['2.2 Project Kickoff - HDB', '2.2.4.11', 'Project Manager', 'Consolidate Documents from QPs.', '2.2.5'],

      ['2.2 Project Kickoff - HDB', '2.2.5', '[N/A]', 'STAGE 2.2.5: SUBMISSION ON CORENET', '2.2.5.1'],
      ['2.2 Project Kickoff - HDB', '2.2.5.1', 'Admin', 'Log onto Corenet.', '2.2.5.2'],
      ['2.2 Project Kickoff - HDB', '2.2.5.2', 'Admin', 'Request OTP from MD.', '2.2.5.3'],
      ['2.2 Project Kickoff - HDB', '2.2.5.3', 'Managing Director', 'Send OTP.', '2.2.5.4'],
      ['2.2 Project Kickoff - HDB', '2.2.5.4', 'Admin', 'Receive OTP.', '2.2.5.5'],
      ['2.2 Project Kickoff - HDB', '2.2.5.5', 'Admin', 'Prepare Draft Submission.', '2.2.5.6'],
      ['2.2 Project Kickoff - HDB', '2.2.5.6', 'Admin', 'Verify details of Draft Submission.', '2.2.5.7'],
      ['2.2 Project Kickoff - HDB', '2.2.5.7', 'Admin', 'Print Summary & attachments.', '2.2.5.8'],
      ['2.2 Project Kickoff - HDB', '2.2.5.8', 'Admin', 'Submit on Corenet.', '2.2.5.9'],
      ['2.2 Project Kickoff - HDB', '2.2.5.9', 'Admin', 'Print acknowledgment of submission.', '2.2.5.10'],
      ['2.2 Project Kickoff - HDB', '2.2.5.10', 'Admin', 'File printed Summary & attachments.', '2.2.5.11'],
      ['2.2 Project Kickoff - HDB', '2.2.5.11', 'Admin', 'Email client on submission.', '2.2.5.12, 2.2.5.13'],
      ['2.2 Project Kickoff - HDB', '2.2.5.12', 'Client', 'Receive email confirmation of submission.', '3.2'],
      ['2.2 Project Kickoff - HDB', '2.2.5.13', 'Admin', 'Follow up with HDB (within 1 week).', '3.2']
    ];

    const formattedNew2_2 = new2_2.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout2_2.findIndex(r => r['File Name'].includes('2.3 Project Kickoff'));
    if (insertIndex === -1) insertIndex = recordsWithout2_2.length; 

    let finalRecords = [
        ...recordsWithout2_2.slice(0, insertIndex),
        ...formattedNew2_2,
        ...recordsWithout2_2.slice(insertIndex)
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
            console.log('Done writing updated CSV with 2.2');
        });
  });
