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

    const recordsWithout2_8 = results.filter(r => !r['File Name'].includes('2.8 Project Kickoff'));

    const new2_8 = [
      ['2.8 Project Kickoff - JTC', '2.8.1', '[N/A]', 'STAGE 2.8.1: CONNECT STAKEHOLDERS', '2.8.1.1'],
      ['2.8 Project Kickoff - JTC', '2.8.1.1', 'Sales Executive', 'Create Group Chat & add all stakeholders (LANDLORD NOT INCLUDED).', '2.8.1.2'],
      ['2.8 Project Kickoff - JTC', '2.8.1.2', 'Sales Executive', "Sends list of required docs in Client Group Chat (Requested Information: Layout plan, Photos of the premises, if possible, Landlord's NRIC, Landlord Contact Number, Landlord Email, ACRA, NRIC of Director, Director's Contact Number, Director's Email).", '2.8.1.3'],
      ['2.8 Project Kickoff - JTC', '2.8.1.3', 'Client', 'Has Client given the necessary documents?', '2.8.1.4, 2.8.1.5'],
      ['2.8 Project Kickoff - JTC', '2.8.1.4', 'Client', 'If yes, Sends requested Docs & Information.', '2.8.2, 2.8.3'],
      ['2.8 Project Kickoff - JTC', '2.8.1.5', 'Sales Executive', 'If no, Follow up with Client on list of documents.', '2.8.1.3'],

      ['2.8 Project Kickoff - JTC', '2.8.2', '[N/A]', 'STAGE 2.8.2: PREPARE LETTER OF AUTHORISATION', '2.8.2.1'],
      ['2.8 Project Kickoff - JTC', '2.8.2.1', 'Sales Executive', 'Review received documents & information (Information Required: ACRA, NRIC of Director, Contact Number, Email).', '2.8.2.2'],
      ['2.8 Project Kickoff - JTC', '2.8.2.2', 'Sales Executive', 'Prepare Letter of Authorisation (LoA).', '2.8.2.3'],
      ['2.8 Project Kickoff - JTC', '2.8.2.3', 'Sales Executive', 'Send LoA to client for execution.', '2.8.2.4'],
      ['2.8 Project Kickoff - JTC', '2.8.2.4', 'Client', 'Executes LoA.', '2.8.2.5'],
      ['2.8 Project Kickoff - JTC', '2.8.2.5', 'Client', 'Sends executed LoA to SE.', '2.8.2.6'],
      ['2.8 Project Kickoff - JTC', '2.8.2.6', 'Sales Executive', 'Receives executed LoA.', '2.8.2.7'],
      ['2.8 Project Kickoff - JTC', '2.8.2.7', 'Sales Executive', 'Send to Admin.', '2.8.4'],

      ['2.8 Project Kickoff - JTC', '2.8.3', '[N/A]', 'STAGE 2.8.3: PREPARE FLOORPLAN FOR REGULATORY COMPLIANCE', '2.8.3.1'],
      ['2.8 Project Kickoff - JTC', '2.8.3.1', 'Project Manager', 'Review received documents & information (Information Required: Layout Plan. Review for Compliance: 1. 60:40 ratio maintained for main & ancilliary business respectively. a. 60% for seating and 40% for food preparation. b. 60% for warehousing/40% for office use. 2. Fire Safety (SCDF): a. Enrichment Centres: desired number of rooms. b. Clear escape route of 1.2m width).', '2.8.3.2'],
      ['2.8 Project Kickoff - JTC', '2.8.3.2', 'Project Manager', 'Draft advice on possible non-compliance and revisions needed for SE to inform client.', '2.8.3.3'],
      ['2.8 Project Kickoff - JTC', '2.8.3.3', 'Sales Executive', 'Forward advice to client on possible non-compliance and revisions needed.', '2.8.3.4'],
      ['2.8 Project Kickoff - JTC', '2.8.3.4', 'Client', 'Accept proposed suggestions/revisions to floorplan.', '2.8.3.5'],
      ['2.8 Project Kickoff - JTC', '2.8.3.5', 'Sales Executive', 'Informs PM.', '2.8.3.6'],
      ['2.8 Project Kickoff - JTC', '2.8.3.6', 'Project Manager', 'Instructs Freelancers on revisions.', '2.8.3.7'],
      ['2.8 Project Kickoff - JTC', '2.8.3.7', 'Freelancers', 'Receives instructions.', '2.8.3.8'],
      ['2.8 Project Kickoff - JTC', '2.8.3.8', 'Freelancers', 'Edit BP.', '2.8.3.9'],
      ['2.8 Project Kickoff - JTC', '2.8.3.9', 'Freelancers', 'Send PM.', '2.8.3.10'],
      ['2.8 Project Kickoff - JTC', '2.8.3.10', 'Project Manager', 'Receives revised Floorplan.', '2.8.3.11'],
      ['2.8 Project Kickoff - JTC', '2.8.3.11', 'Project Manager', 'Send to SE to forward to client for approval.', '2.8.3.12'],
      ['2.8 Project Kickoff - JTC', '2.8.3.12', 'Sales Executive', 'Send revised Floorplan to client for approval.', '2.8.3.13'],
      ['2.8 Project Kickoff - JTC', '2.8.3.13', 'Client', 'Receive detailed drawings of Floorplan.', '2.8.3.14'],
      ['2.8 Project Kickoff - JTC', '2.8.3.14', 'Client', 'Does client approve the detailed drawings?', '2.8.4, 2.8.3.15'],
      ['2.8 Project Kickoff - JTC', '2.8.3.15', 'Project Manager', "If no, Collate Client's comments & revisions.", '2.8.3.16'],
      ['2.8 Project Kickoff - JTC', '2.8.3.16', 'Project Manager', 'Revise Building Plan (BP).', '2.8.3.17'],
      ['2.8 Project Kickoff - JTC', '2.8.3.17', 'Project Manager', 'Instructs Freelancers on revisions.', '2.8.3.18'],
      ['2.8 Project Kickoff - JTC', '2.8.3.18', 'Freelancers', 'Receives instructions.', '2.8.3.19'],
      ['2.8 Project Kickoff - JTC', '2.8.3.19', 'Freelancers', 'Edit Floorplan.', '2.8.3.20'],
      ['2.8 Project Kickoff - JTC', '2.8.3.20', 'Freelancers', 'Send PM.', '2.8.3.21'],
      ['2.8 Project Kickoff - JTC', '2.8.3.21', 'Project Manager', 'Receives revised Floorplan.', '2.8.4'],

      ['2.8 Project Kickoff - JTC', '2.8.4', '[N/A]', 'STAGE 2.8.4: OBTAIN NECESSARY ENDORSEMENTS FROM CIVIL ENGINEER', '2.8.4.1'],
      ['2.8 Project Kickoff - JTC', '2.8.4.1', 'Admin', 'Log onto Corenet (https://www.corenet.gov.sg/corenet/eSS/SoftwareDownloads/index.htm).', '2.8.4.2'],
      ['2.8 Project Kickoff - JTC', '2.8.4.2', 'Admin', 'Request OTP from MD.', '2.8.4.3'],
      ['2.8 Project Kickoff - JTC', '2.8.4.3', 'Managing Director', 'Send OTP.', '2.8.4.4'],
      ['2.8 Project Kickoff - JTC', '2.8.4.4', 'Admin', 'Receive OTP.', '2.8.4.5'],
      ['2.8 Project Kickoff - JTC', '2.8.4.5', 'Admin', 'Download JTC Form.', '2.8.4.6'],
      ['2.8 Project Kickoff - JTC', '2.8.4.6', 'Admin', 'Fill up JTC Form.', '2.8.4.7'],
      ['2.8 Project Kickoff - JTC', '2.8.4.7', 'Admin', "Send JTC Form to SE for client's signing.", '2.8.4.8'],
      ['2.8 Project Kickoff - JTC', '2.8.4.8', 'Sales Executive', 'Receive JTC Form & send to client.', '2.8.4.9'],
      ['2.8 Project Kickoff - JTC', '2.8.4.9', 'Client', 'Receive JTC Form.', '2.8.4.10'],
      ['2.8 Project Kickoff - JTC', '2.8.4.10', 'Client', 'Signs JTC Form.', '2.8.4.11'],
      ['2.8 Project Kickoff - JTC', '2.8.4.11', 'Client', 'Sends signed JTC Form to SE.', '2.8.4.12'],
      ['2.8 Project Kickoff - JTC', '2.8.4.12', 'Sales Executive', 'Receive signed JTC Form & send to PM.', '2.8.4.13'],
      ['2.8 Project Kickoff - JTC', '2.8.4.13', 'Project Manager', 'Send signed JTC Form to PE for endorsement.', '2.8.4.14'],
      ['2.8 Project Kickoff - JTC', '2.8.4.14', 'Project Manager', 'Collate signed JTC Form & Revised Floorplan from Freelancers.', '2.8.4.15'],
      ['2.8 Project Kickoff - JTC', '2.8.4.15', 'Project Manager', 'Send consolidated documents to PE for endorsement.', '2.8.4.16'],
      ['2.8 Project Kickoff - JTC', '2.8.4.16', 'Civil Engineer', 'Receives consolidated documents.', '2.8.4.17'],
      ['2.8 Project Kickoff - JTC', '2.8.4.17', 'Civil Engineer', 'Endorses consolidated documents.', '2.8.4.18'],
      ['2.8 Project Kickoff - JTC', '2.8.4.18', 'Civil Engineer', 'Sends to PM.', '2.8.4.19'],
      ['2.8 Project Kickoff - JTC', '2.8.4.19', 'Project Manager', 'Receives endorsed consolidated documents.', '2.8.45'],

      ['2.8 Project Kickoff - JTC', '2.8.45', '[N/A]', 'STAGE 2.8.45: SUBMISSION ON CORENET SG', '2.8.45.1'],
      ['2.8 Project Kickoff - JTC', '2.8.45.1', 'Admin', 'Prepare Draft Submission.', '2.8.45.2'],
      ['2.8 Project Kickoff - JTC', '2.8.45.2', 'Admin', 'Verify details of Draft Submission.', '2.8.45.3'],
      ['2.8 Project Kickoff - JTC', '2.8.45.3', 'Admin', 'Print Summary & attachments.', '2.8.45.4'],
      ['2.8 Project Kickoff - JTC', '2.8.45.4', 'Admin', 'Submit on Corenet SG (https://www.corenet.gov.sg/corenet/eSS/SoftwareDownloads/index.htm).', '2.8.45.5'],
      ['2.8 Project Kickoff - JTC', '2.8.45.5', 'Admin', 'Print acknowledgment of submission.', '2.8.45.6'],
      ['2.8 Project Kickoff - JTC', '2.8.45.6', 'Admin', 'File printed Summary & attachments.', '3.8']
    ];

    const formattedNew2_8 = new2_8.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout2_8.findIndex(r => r['File Name'].includes('3.1 Post-Submission'));
    if (insertIndex === -1) insertIndex = recordsWithout2_8.length; 

    let finalRecords = [
        ...recordsWithout2_8.slice(0, insertIndex),
        ...formattedNew2_8,
        ...recordsWithout2_8.slice(insertIndex)
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
            console.log('Done writing updated CSV with 2.8');
        });
  });
