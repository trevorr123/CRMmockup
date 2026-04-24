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

    const recordsWithout3_8 = results.filter(r => !r['File Name'].includes('3.8 Post-Submission to Project Completion'));

    const new3_8 = [
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.1', '[N/A]', 'STAGE 3.8.1: RECEIVE REGULATORY NOTIFICATION', '3.8.1.1'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.1.1', 'JTC Corporation', 'Issues comments & rectifications required for compliance.', '3.8.1.2'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.1.2', 'Sales Executive', 'Receives Notification.', '3.8.1.3'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.1.3', 'Sales Executive', 'Sends PM.', '3.8.2.1'],

      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2', '[N/A]', 'STAGE 3.8.2: COORDINATE ON RESPONSE TO REGULATORY NOTIFICATION', '3.8.2.1'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.1', 'Project Manager', "Revise floor plan as required by URA (Types of JTC's comments: Sometimes, GFA as submitted does not tally with the approved Main Use of premises. We will need to revise 60:40 ratio to such ratio as required to address JTC's comments. If wall hacking is required, will need to liaise with Civil PE - PM to be accountable. If there is a concern of kitchen exhaust system (too large/too small - design fault, or not sufficient power to extract, or sound issues, or volume issues (CMH), then we will need to instruct freelancer (M&E engineer) to look into JTC's comments - PM to be accountable).", '3.8.2.2'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.2', 'Project Manager', 'Instructs Freelancers on revisions.', '3.8.2.3'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.3', 'Freelancers', 'Receives instructions.', '3.8.2.4'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.4', 'Freelancers', 'Edit floorplan.', '3.8.2.5'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.5', 'Freelancers', 'Send PM.', '3.8.2.6'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.6', 'Project Manager', 'Receives revised Floorplan.', '3.8.2.7'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.7', 'Project Manager', 'Send to SE to forward to client for approval.', '3.8.2.8'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.8', 'Sales Executive', 'Reviews revised Floorplan.', '3.8.2.9'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.9', 'Sales Executive', 'Send revised floor plan to client for approval.', '3.8.2.10'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.10', 'Client', 'Are revision accepted by client?', 'YES: 3.8.2.11, NO: 3.8.2.12'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.11', 'Client', 'Gives approval.', '3.8.2.14'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.12', 'Client', 'Gives comments.', '3.8.2.13'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.13', 'Sales Executive', 'Takes in Comments.', '3.8.2.1'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.2.14', 'Sales Executive', 'Informs PM of Approval.', '3.8.3.1'],

      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3', '[N/A]', 'STAGE 3.8.3: RESPOND TO REGULATORY NOTIFICATION', '3.8.3.1'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3.1', 'Sales Executive', 'Sends such necessary information to PM.', '3.8.3.2'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3.2', 'Project Manager', 'Consolidate all documents for response to JTC (Documents required for submission: 1. Endorsed JTC Form 2. Endorsed Floorplan 3. Such information from SE to respond to JTC\'s notification, if needed).', '3.8.3.3'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3.3', 'Admin', 'Log onto Corenet (Submission is made on ESPro application: https://www.corenet.gov.sg/corenet/eSS/SoftwareDownloads/index.htm).', '3.8.3.4'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3.4', 'Admin', 'Request OTP from MD.', '3.8.3.5'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3.5', 'Managing Director', 'Send OTP.', '3.8.3.6'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3.6', 'Admin', 'Receive OTP.', '3.8.3.7'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3.7', 'Admin', 'Prepare Draft Submission.', '3.8.3.8'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3.8', 'Admin', 'Verify details of Draft Submission.', '3.8.3.9'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3.9', 'Admin', 'Print Summary & attachments.', '3.8.3.10'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3.10', 'Admin', 'Submit on Go Business SG.', '3.8.3.11'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3.11', 'Admin', 'Print acknowledgment of submission.', '3.8.3.12'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.3.12', 'Admin', 'File printed Summary & attachments.', '3.8.4.1'],

      ['3.8 Post-Submission to Project Completion - JTC', '3.8.4', '[N/A]', 'STAGE 3.8.4: RECEIVE ACCEPTANCE / FURTHER OBJECTIONS BY AUTHORITIES', '3.8.4.1'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.4.1', 'JTC Corporation', 'Is response / rectifications acceptable?', 'YES: 3.8.4.6, NO: 3.8.4.2'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.4.2', 'JTC Corporation', 'Issues comments & rectifications required for compliance.', '3.8.4.3'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.4.3', 'Sales Executive', 'Receives Notification.', '3.8.4.4'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.4.4', 'Sales Executive', 'Checks with MD if uncertain of scope of business plans.', '3.8.4.5'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.4.5', 'Managing Director', 'Guides SE on response.', '3.8.3.1'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.4.6', 'JTC Corporation', 'Issues Written Permission to start work (general email).', '3.8.4.7'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.4.7', 'Project Manager', 'Receives Written Permission.', '3.8.4.8'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.4.8', 'Project Manager', 'Informs SE.', '3.8.4.9'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.4.9', 'Sales Executive', 'Receives Written Permission.', '3.8.4.10'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.4.10', 'Sales Executive', 'Informs Clients.', '3.8.4.11'],
      ['3.8 Post-Submission to Project Completion - JTC', '3.8.4.11', 'Client', 'Receives Written Permission to start work.', 'END']
    ];

    const formattedNew3_8 = new3_8.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout3_8.length;

    let finalRecords = [
        ...recordsWithout3_8.slice(0, insertIndex),
        ...formattedNew3_8,
        ...recordsWithout3_8.slice(insertIndex)
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
            console.log('Done writing updated CSV with 3.8');
        });
  });
