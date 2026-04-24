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

    const recordsWithout2_3 = results.filter(r => !r['File Name'].includes('2.3 Project Kickoff'));

    const new2_3 = [
      ['2.3 Project Kickoff - URA', '2.3.1', '[N/A]', 'STAGE 2.3.1: CONNECT STAKEHOLDERS', '2.3.1.1'],
      ['2.3 Project Kickoff - URA', '2.3.1.1', 'Sales Executive', 'Create Group Chat & add all stakeholders (LANDLORD NOT INCLUDED).', '2.3.1.2'],
      ['2.3 Project Kickoff - URA', '2.3.1.2', 'Sales Executive', 'Sends list of required docs in Client Group Chat (Requested Information: Layout plan, Photos of the premises if possible, Landlord\'s NRIC, Landlord Contact Number, Landlord Email, Business Plan/Concept, ACRA, NRIC of Director, Director\'s Contact Number, Director\'s Email).', '2.3.1.3'],
      ['2.3 Project Kickoff - URA', '2.3.1.3', 'Client', 'Has Client given the necessary documents?', '2.3.1.4, 2.3.1.5'],
      ['2.3 Project Kickoff - URA', '2.3.1.4', 'Client', 'If yes, Sends requested Docs & Information.', '2.3.2, 2.3.3, 2.3.4'],
      ['2.3 Project Kickoff - URA', '2.3.1.5', 'Sales Executive', 'If no, Follow up with Client on list of documents.', '2.3.1.3'],

      ['2.3 Project Kickoff - URA', '2.3.2', '[N/A]', 'STAGE 2.3.2: PREPARE LETTER OF AUTHORISATION', '2.3.2.1'],
      ['2.3 Project Kickoff - URA', '2.3.2.1', 'Sales Executive', 'Review received documents & information.', '2.3.2.2'],
      ['2.3 Project Kickoff - URA', '2.3.2.2', 'Sales Executive', 'Prepare Letter of Authorisation (LoA).', '2.3.2.3'],
      ['2.3 Project Kickoff - URA', '2.3.2.3', 'Sales Executive', 'Send LoA to client for execution.', '2.3.2.4'],
      ['2.3 Project Kickoff - URA', '2.3.2.4', 'Client', 'Executes LoA.', '2.3.2.5'],
      ['2.3 Project Kickoff - URA', '2.3.2.5', 'Client', 'Sends executed LoA to SE.', '2.3.2.6'],
      ['2.3 Project Kickoff - URA', '2.3.2.6', 'Sales Executive', 'Receives executed LoA.', '2.3.2.7'],
      ['2.3 Project Kickoff - URA', '2.3.2.7', 'Sales Executive', 'Send to Admin.', '2.3.5'],

      ['2.3 Project Kickoff - URA', '2.3.3', '[N/A]', 'STAGE 2.3.3: PREPARE BUSINESS PLAN FOR REGULATORY COMPLIANCE', '2.3.3.1'],
      ['2.3 Project Kickoff - URA', '2.3.3.1', 'Project Manager', 'Review received documents & information (Information Required: Business Plan/Concept).', '2.3.3.2'],
      ['2.3 Project Kickoff - URA', '2.3.3.2', 'Project Manager', "Edits Business Plan for compliance with URA's requirements.", '2.3.3.3'],
      ['2.3 Project Kickoff - URA', '2.3.3.3', 'Project Manager', 'Send edited Business Plan to SE for review & approval.', '2.3.3.4'],
      ['2.3 Project Kickoff - URA', '2.3.3.4', 'Sales Executive', 'Receives edited Business Plan.', '2.3.3.5'],
      ['2.3 Project Kickoff - URA', '2.3.3.5', 'Sales Executive', 'Reviews edited Business Plan.', '2.3.3.6'],
      ['2.3 Project Kickoff - URA', '2.3.3.6', 'Sales Executive', 'Is edited Business Plan in line with what was preliminarily guided by URA during BD process check-in?', '2.3.3.7, 2.3.3.8'],
      ['2.3 Project Kickoff - URA', '2.3.3.7', 'Sales Executive', 'If yes, Sends revised/edited Business Plan to client for approval.', '2.3.5'],
      ['2.3 Project Kickoff - URA', '2.3.3.8', 'Sales Executive', 'If no, Gives Admin comments on edited Business Plan.', '2.3.3.9'],
      ['2.3 Project Kickoff - URA', '2.3.3.9', 'Admin', "Takes in SE's comments and revises Business Plan.", '2.3.3.4'],

      ['2.3 Project Kickoff - URA', '2.3.4', '[N/A]', 'STAGE 2.3.4: PREPARE FLOORPLAN FOR REGULATORY COMPLIANCE', '2.3.4.1'],
      ['2.3 Project Kickoff - URA', '2.3.4.1', 'Project Manager', 'Review received documents & information (Information Required: Layout Plan. Review for Compliance: 60:40 ratio, Fire Safety).', '2.3.4.2'],
      ['2.3 Project Kickoff - URA', '2.3.4.2', 'Project Manager', 'Draft advice on possible non-compliance and revisions needed for SE to inform client.', '2.3.4.3'],
      ['2.3 Project Kickoff - URA', '2.3.4.3', 'Sales Executive', 'Forward advice to client on possible non-compliance and revisions needed.', '2.3.4.4'],
      ['2.3 Project Kickoff - URA', '2.3.4.4', 'Client', 'Accept proposed suggestions/revisions to floorplan.', '2.3.4.5'],
      ['2.3 Project Kickoff - URA', '2.3.4.5', 'Client', 'Need Quote?', '1.2, 2.3.4.6'],
      ['2.3 Project Kickoff - URA', '2.3.4.6', 'Sales Executive', 'If no, Informs PM.', '2.3.4.7'],
      ['2.3 Project Kickoff - URA', '2.3.4.7', 'Project Manager', 'Instructs Freelancers on revisions.', '2.3.4.8'],
      ['2.3 Project Kickoff - URA', '2.3.4.8', 'Freelancers', 'Receives instructions.', '2.3.4.9'],
      ['2.3 Project Kickoff - URA', '2.3.4.9', 'Freelancers', 'Edit Floorplan.', '2.3.4.10'],
      ['2.3 Project Kickoff - URA', '2.3.4.10', 'Freelancers', 'Send PM.', '2.3.4.11'],
      ['2.3 Project Kickoff - URA', '2.3.4.11', 'Project Manager', 'Receives revised Floorplan.', '2.3.4.12'],
      ['2.3 Project Kickoff - URA', '2.3.4.12', 'Project Manager', 'Send to SE to forward to client for approval.', '2.3.4.13'],
      ['2.3 Project Kickoff - URA', '2.3.4.13', 'Sales Executive', 'Reviews revised Floorplan.', '2.3.4.14'],
      ['2.3 Project Kickoff - URA', '2.3.4.14', 'Client', 'Receive detailed drawings.', '2.3.4.15'],
      ['2.3 Project Kickoff - URA', '2.3.4.15', 'Client', 'Are the detailed drawings approved by client?', '2.3.4.22, 2.3.4.16'],
      ['2.3 Project Kickoff - URA', '2.3.4.16', 'Project Manager', "If no, Collate Client's comments & revisions.", '2.3.4.17'],
      ['2.3 Project Kickoff - URA', '2.3.4.17', 'Project Manager', 'Revise Building Plan (BP).', '2.3.4.18'],
      ['2.3 Project Kickoff - URA', '2.3.4.18', 'Project Manager', 'Instructs Freelancers on revisions.', '2.3.4.19'],
      ['2.3 Project Kickoff - URA', '2.3.4.19', 'Freelancers', 'Receives instructions.', '2.3.4.20'],
      ['2.3 Project Kickoff - URA', '2.3.4.20', 'Freelancers', 'Edit BP.', '2.3.4.21'],
      ['2.3 Project Kickoff - URA', '2.3.4.21', 'Freelancers', 'Send PM.', '2.3.4.11'],
      ['2.3 Project Kickoff - URA', '2.3.4.22', 'Project Manager', 'If yes, Sends Admin Approved Detailed Drawings for Submission.', '2.3.5'],

      ['2.3 Project Kickoff - URA', '2.3.5', '[N/A]', 'STAGE 2.3.5: SUBMISSION ON GO BUSINESS SG', '2.3.5.1'],
      ['2.3 Project Kickoff - URA', '2.3.5.1', 'Admin', 'Log onto Go Business SG (https://www.gobusiness.gov.sg/#).', '2.3.5.2'],
      ['2.3 Project Kickoff - URA', '2.3.5.2', 'Admin', 'Request OTP from MD.', '2.3.5.3'],
      ['2.3 Project Kickoff - URA', '2.3.5.3', 'Managing Director', 'Send OTP.', '2.3.5.4'],
      ['2.3 Project Kickoff - URA', '2.3.5.4', 'Admin', 'Receive OTP.', '2.3.5.5'],
      ['2.3 Project Kickoff - URA', '2.3.5.5', 'Admin', 'Prepare Draft Submission.', '2.3.5.6'],
      ['2.3 Project Kickoff - URA', '2.3.5.6', 'Admin', 'Verify details of Draft Submission.', '2.3.5.7'],
      ['2.3 Project Kickoff - URA', '2.3.5.7', 'Admin', 'Print Summary & attachments.', '2.3.5.8'],
      ['2.3 Project Kickoff - URA', '2.3.5.8', 'Admin', 'Submit on Go Business SG.', '2.3.5.9'],
      ['2.3 Project Kickoff - URA', '2.3.5.9', 'Admin', 'Print acknowledgment of submission.', '2.3.5.10'],
      ['2.3 Project Kickoff - URA', '2.3.5.10', 'Admin', 'File printed Summary & attachments.', '3.3']
    ];

    const formattedNew2_3 = new2_3.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout2_3.findIndex(r => r['File Name'].includes('2.4 Project Kickoff'));
    if (insertIndex === -1) insertIndex = recordsWithout2_3.length; 

    let finalRecords = [
        ...recordsWithout2_3.slice(0, insertIndex),
        ...formattedNew2_3,
        ...recordsWithout2_3.slice(insertIndex)
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
            console.log('Done writing updated CSV with 2.3');
        });
  });
