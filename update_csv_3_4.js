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

    const recordsWithout3_4 = results.filter(r => !r['File Name'].includes('3.4 Post-Submission to Project Completion'));

    const new3_4 = [
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.1', '[N/A]', 'STAGE 3.4.1: RECEIVE REGULATORY NOTIFICATION', '3.4.1.1'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.1.1', 'Singapore Civil Defence Force', 'Issues Acknowledgement to make payment.', '3.4.1.2'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.1.2', 'Admin', 'Receives Notification.', '3.4.2.1'],

      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.2', '[N/A]', 'STAGE 3.4.2: RECEIVE NOTIFICATION OF PAYMENT BY AUTHORITIES AND ATTEND TO PAYMENT', '3.4.2.1'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.2.1', 'Admin', 'Commence payment process.', '3.4.2.2'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.2.2', 'Admin', "Request Bank's OTP from MD.", '3.4.2.3'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.2.3', 'Managing Director', 'Send OTP.', '3.4.2.4'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.2.4', 'Admin', 'Complete payment.', '3.4.2.5'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.2.5', 'Admin', 'Print payment receipt.', '3.4.2.6'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.2.6', 'Admin', 'File payment receipt.', '3.4.3.1'],

      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3', '[N/A]', 'STAGE 3.4.3(A).1: COORDINATE ON RESPONSE TO AUDIT CHECK FINDINGS', '3.4.3.1'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.1', 'Singapore Civil Defence Force', 'Is an Audit Check required?', 'YES: 3.4.3.2, NO: 3.4.4.1'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.2', 'Singapore Civil Defence Force', 'Issue Notification for Audit.', '3.4.3.3'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.3', 'Client', 'Receives Audit Check findings.', '3.4.3.4'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.4', 'Client', 'Is the Audit Check a plan / site check?', 'PLAN CHECK: 3.4.3.5, SITE CHECK: 3.4.3.7'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.5', 'Sales Executive', 'Sends Audit Check findings to PM.', '3.4.3.6'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.6', 'Project Manager', 'Communicates issues raised by Audit Check findings to Vetter & RI.', '3.4.3.12'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.7', 'Sales Executive', 'Inform client.', '3.4.3.8'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.8', 'Sales Executive', 'Coordinate with client on a pre-audit review of site for compliance.', '3.4.3.9'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.9', 'Sales Executive', 'Inform client of rectifications to be carried out before Site Audit.', '3.4.3.10'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.10', 'Client', 'Rectify.', '3.4.3.11'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.11', 'Sales Executive', 'Conduct audit review of site.', '3.4.3.12'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.12', 'Project Manager', 'Drafts formal response on behalf of QP.', '3.4.3.13'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.13', 'Project Manager', 'Sends draft letter to QP for execution.', '3.4.3.14'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.14', 'Civil Engineer', 'Receives draft letter.', '3.4.3.15'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.15', 'Civil Engineer', 'Endorses letter.', '3.4.3.16'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.16', 'Civil Engineer', 'Send letter to PM.', '3.4.3.17'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.17', 'Project Manager', 'Receives endorsed letter.', '3.4.3.18'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.18', 'Project Manager', 'Email endorsed letter to SCDF officer.', '3.4.3.19'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.19', 'Singapore Civil Defence Force', 'Receives endorsed letter.', '3.4.3.20'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.20', 'Singapore Civil Defence Force', 'Are the Audit Check findings addressed?', 'YES: 3.4.4.1, NO: 3.4.3.21'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.3.21', 'Singapore Civil Defence Force', 'Issues further notification for amendment.', '3.4.3.3'],

      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.4', '[N/A]', 'STAGE 3.4.4: NOTIFY CLIENT OF APPROVAL (PRE-RI INSPECTION)', '3.4.4.1'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.4.1', 'Singapore Civil Defence Force', 'Issues Notice of Approval.', '3.4.4.2'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.4.2', 'Sales Executive', 'Sends Notice of Approval to client.', '3.4.4.3'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.4.3', 'Client', 'Receives Notice of Approval.', '3.4.5.1'],

      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5', '[N/A]', 'STAGE 3.4.5: RI INSPECTION', '3.4.5.1'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.1', 'Sales Executive', 'Visit site to check for compliance.', '3.4.5.2'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.2', 'Sales Executive', 'Inform PM of availability for RI Inspection.', '3.4.5.3'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.3', 'Project Manager', 'Coordinates with RI on availability for inspection.', '3.4.5.4'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.4', 'Vetter / Registered Inspector', 'Informs PM on availability.', '3.4.5.5'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.5', 'Project Manager', 'Confirms RI inspection date via email and WA to RI and SE.', '3.4.5.6'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.6', 'Sales Executive', 'Conducts RI inspection with RI.', '3.4.5.7'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.7', 'Vetter / Registered Inspector', 'Has RI issued further comments?', 'YES: 3.4.5.8, NO: 3.4.5.14'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.8', 'Sales Executive', "Work with contractor/client to carry out rectification required to address RI's comments.", '3.4.5.9'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.9', 'Sales Executive', 'Document rectification works (photos, documents/ certificates).', '3.4.5.10'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.10', 'Sales Executive', 'Send consolidated rectification work to PM.', '3.4.5.11'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.11', 'Project Manager', 'Receives and vet consolidated documentation of rectification.', '3.4.5.12'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.12', 'Project Manager', "Will documentation comply with RI's comments?", 'YES: 3.4.5.13, NO: 3.4.5.8'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.13', 'Project Manager', 'Submits to RI.', '3.4.5.14'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.14', 'Vetter / Registered Inspector', 'Sends RI Report.', '3.4.5.15'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.15', 'Sales Executive', 'HAs RI sent RI report?', 'YES: 3.4.5.17, NO: 3.4.5.16'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.16', 'Sales Executive', 'Follows up with RI on report.', '3.4.5.15'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.5.17', 'Sales Executive', 'Receives RI Report.', '3.4.6.1, 3.4.7.1'],

      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6', '[N/A]', 'STAGE 3.4.6: SUBMISSION ON CORENET', '3.4.6.1'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6.1', 'Sales Executive', 'Sends RI Report to PM.', '3.4.6.2'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6.2', 'Project Manager', 'Receives RI Report.', '3.4.6.3'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6.3', 'Admin', 'Log onto Corenet.', '3.4.6.4'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6.4', 'Admin', 'Request OTP from CE and ME.', '3.4.6.5'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6.5', 'Mechanical Engineer & Civil Engineer', 'Send OTP.', '3.4.6.6'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6.6', 'Admin', 'Receive OTP.', '3.4.6.7'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6.7', 'Admin', 'Prepare Draft Submission.', '3.4.6.8'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6.8', 'Admin', 'Verify details of Draft Submission.', '3.4.6.9'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6.9', 'Admin', 'Screenshot Submission & attachments.', '3.4.6.10'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6.10', 'Admin', 'Submit on Corenet.', '3.4.6.11'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6.11', 'Admin', 'Print acknowledgment of submission.', '3.4.6.12'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.6.12', 'Admin', 'File screenshot of Summary & attachments.', '3.4.8.1'],

      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.7', '[N/A]', 'STAGE 3.4.7: GENERATE BALANCE INVOICE', '3.4.7.1'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.7.1', 'Admin', 'Create Balance Invoice.', '3.4.7.2'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.7.2', 'Admin', 'Send to Client.', '3.4.7.3'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.7.3', 'Client', 'Receive Balance Invoice.', '3.4.7.4'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.7.4', 'Sales Executive', 'Has client paid Balance Invoice?', 'YES: 3.4.8.2, NO: 3.4.7.5'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.7.5', 'Sales Executive', 'Follow up on payment.', '3.4.7.4'],

      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.8', '[N/A]', 'STAGE 3.4.8: NOTIFY CLIENT OF FIRE SAFETY CERT ISSUANCE', '3.4.8.1'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.8.1', 'Singapore Civil Defence Force', 'Issues Notice of Fire Safety Cert.', '3.4.8.2'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.8.2', 'Sales Executive', 'Sends Notice of Fire Safety Cert to client.', '3.4.8.3'],
      ['3.4 Post-Submission to Project Completion - SCDF', '3.4.8.3', 'Client', 'Receives Notice of Fire Safety Cert.', 'END']
    ];

    const formattedNew3_4 = new3_4.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout3_4.length;

    let finalRecords = [
        ...recordsWithout3_4.slice(0, insertIndex),
        ...formattedNew3_4,
        ...recordsWithout3_4.slice(insertIndex)
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
            console.log('Done writing updated CSV with 3.4');
        });
  });
