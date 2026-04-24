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

    const recordsWithout3_3 = results.filter(r => !r['File Name'].includes('3.3 Post-Submission to Project Completion'));

    const new3_3 = [
      ['3.3 Post-Submission to Project Completion - URA', '3.3.1', '[N/A]', 'STAGE 3.3.1: RECEIVE REGULATORY NOTIFICATION', '3.3.1.1'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.1.1', 'Urban Redevelopment Authority', 'Issues comments & rectifications required for compliance.', '3.3.1.2'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.1.2', 'Urban Redevelopment Authority', 'Changes sought:', 'BUSINESS PLAN: 3.3.2.1, FLOOR PLAN: 3.3.2.8'],

      ['3.3 Post-Submission to Project Completion - URA', '3.3.2', '[N/A]', 'STAGE 3.3.2: COORDINATE ON RESPONSE TO REGULATORY NOTIFICATION', '3.3.2.1, 3.3.2.8'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.1', 'Sales Executive', "Request required docs from client to address URA's comments.", '3.3.2.2'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.2', 'Client', 'Sends docs to SE.', '3.3.2.3'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.3', 'Sales Executive', "Receives client's docs / instructions.", '3.3.2.4'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.4', 'Sales Executive', 'Edit Business Plan.', '3.3.2.5'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.5', 'Sales Executive', 'Send edited Business Plan to MD for final review.', '3.3.2.6'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.6', 'Managing Director', 'Approves Business Plan.', '3.3.2.7'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.7', 'Sales Executive', 'Send approved Business Plan to Admin for submission.', '3.3.3.1'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.8', 'Project Manager', 'Revise floor plan as required by URA.', '3.3.2.9'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.9', 'Project Manager', 'Send revised floor plan to client for approval.', '3.3.2.10'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.10', 'Client', 'Are revision accepted by client?', 'YES: 3.3.2.13, NO: 3.3.2.11'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.11', 'Client', 'If no, Gives comments.', '3.3.2.12'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.12', 'Project Manager', 'Takes in Comments.', '3.3.2.8'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.13', 'Client', 'If yes, Gives approval.', '3.3.2.14'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.2.14', 'Project Manager', 'Sends approved floor plan to Admin.', '3.3.3.1'],

      ['3.3 Post-Submission to Project Completion - URA', '3.3.3', '[N/A]', 'STAGE 3.3.3: RESPOND TO REGULATORY NOTIFICATION', '3.3.3.1'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.1', 'Admin', 'Consolidates all documents for response to URA.', '3.3.3.2'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.2', 'Admin', 'Resubmit to URA (via portal or email, depending on officer).', 'Via Portal: 3.3.3.4, Via Email: 3.3.3.3'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.3', 'Admin', 'Admin Send documents via email.', '3.3.4.1'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.4', 'Admin', 'Log onto Go Business SG (https://www.gobusiness.gov.sg/#).', '3.3.3.5'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.5', 'Admin', 'Request OTP from MD (2 OTPs needed).', '3.3.3.6'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.6', 'Managing Director', 'Send OTP.', '3.3.3.7'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.7', 'Admin', 'Receive OTP.', '3.3.3.8'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.8', 'Admin', 'Prepare Draft Submission.', '3.3.3.9'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.9', 'Admin', 'Verify details of Draft Submission.', '3.3.3.10'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.10', 'Admin', 'Print Summary & attachments.', '3.3.3.11'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.11', 'Admin', 'Submit on Go Business SG.', '3.3.3.12'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.12', 'Admin', 'Print acknowledgment of submission.', '3.3.3.13'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.3.13', 'Admin', 'File printed Summary & attachments.', '3.3.4.1'],

      ['3.3 Post-Submission to Project Completion - URA', '3.3.4', '[N/A]', 'STAGE 3.3.4: COORDINATION BETWEEN URA & SLA ON LAND BETTERMENT CHARGES', '3.3.4.1'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.4.1', 'Urban Redevelopment Authority', 'Receives resubmission.', '3.3.4.2'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.4.2', 'Urban Redevelopment Authority', 'Conducts further checks with SLA on Land Betterment Charge, if any.', '3.3.4.3'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.4.3', 'Singapore Land Authority', "Receives URA's enquiry on Land Betterment Charges.", '3.3.4.4'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.4.4', 'Singapore Land Authority', 'Informs URA if Land Betterment Charges are applicable or not.', 'if LBC is required: 3.3.5.1, if LBC is NOT required: 3.3.7.1'],

      ['3.3 Post-Submission to Project Completion - URA', '3.3.5', '[N/A]', "STAGE 3.3.5: COORDINATION WITH AUTHORITIES ON URA'S PROVISIONAL PERMISSION & COORDINATE WITH CLIENT ON PAYMENT", '3.3.5.1'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.1', 'Urban Redevelopment Authority', 'Issues Provisional Permission & contact of Officer at SLA.', '3.3.5.2'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.2', 'Admin', "Emails SLA (attach URA's Provisional Permission).", '3.3.5.3'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.3', 'Singapore Land Authority', "Receive URA's Provisional Permission from Applicant (via Admin).", '3.3.5.4'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.4', 'Singapore Land Authority', 'Computes Land Betterment Charges.', '3.3.5.5'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.5', 'Singapore Land Authority', "Issues Form to Dyson for applicant's completion.", '3.3.5.6'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.6', 'Admin', 'Receives draft Form from SLA.', '3.3.5.7'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.7', 'Admin', 'Fills up draft From and send to SE.', '3.3.5.8'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.8', 'Sales Executive', 'Sends to Client for approval & execution.', '3.3.5.9'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.9', 'Client', 'Receives draft Form.', '3.3.5.10'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.10', 'Client', 'Signs Form.', '3.3.5.11'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.11', 'Client', 'Send SE signed Form.', '3.3.5.12'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.12', 'Sales Executive', 'Received signed Form.', '3.3.5.13'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.13', 'Sales Executive', 'Send signed Form to Admin.', '3.3.5.14'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.14', 'Admin', 'Emails SLA with signed Form.', '3.3.5.15'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.15', 'Singapore Land Authority', 'Issues Payment Instructions.', '3.3.5.16'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.16', 'Admin', 'Receives Payment Instructions.', '3.3.5.17'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.17', 'Admin', 'Instructs client on Payment Instructions.', '3.3.5.18'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.18', 'Client', 'Receives Payment Instructions.', '3.3.5.19'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.19', 'Client', 'Makes Payment to SLA.', '3.3.5.20'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.20', 'Client', 'Sends screenshot of payment to Dyson.', '3.3.5.21'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.21', 'Sales Executive', 'Receives screenshot of payment.', '3.3.5.22'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.22', 'Sales Executive', 'Sends screenshot of payment to Admin.', '3.3.5.23'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.23', 'Admin', 'Sends screenshot of payment to SLA.', '3.3.5.24'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.5.24', 'Singapore Land Authority', 'Receives screenshot of payment.', '3.3.6.1'],

      ['3.3 Post-Submission to Project Completion - URA', '3.3.6', '[N/A]', "STAGE 3.3.6: COORDINATION WITH AUTHORITIES ON SLA'S OFFICIAL PAYMENT RECEIPT", '3.3.6.1'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.6.1', 'Singapore Land Authority', 'Issues Official Payment Receipt.', '3.3.6.2'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.6.2', 'Admin', 'Receives Official Payment Receipt from SLA.', '3.3.6.3'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.6.3', 'Admin', "Emails URA with SLA's Official Payment Receipt attached.", '3.3.6.4'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.6.4', 'Urban Redevelopment Authority', "Receives SLA's Official Payment Receipt from Dyson.", '3.3.7.1'],

      ['3.3 Post-Submission to Project Completion - URA', '3.3.7', '[N/A]', 'STAGE 3.3.7: RECEIVE ACCEPTANCE BY AUTHORITIES', '3.3.7.1'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.7.1', 'Urban Redevelopment Authority', 'Issues Written Permission.', '3.3.7.2'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.7.2', 'Admin', 'Receives Written Permission from URA.', '3.3.7.3'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.7.3', 'Admin', 'Compile and send copy of Written Permission to SE.', '3.3.8.1'],

      ['3.3 Post-Submission to Project Completion - URA', '3.3.8', '[N/A]', 'STAGE 3.3.8: NOTIFY CLIENT OF APPROVAL', '3.3.8.1'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.8.1', 'Sales Executive', 'Receives Written Permission from Admin.', '3.3.8.2'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.8.2', 'Sales Executive', 'Send Client WP.', '3.3.8.3'],
      ['3.3 Post-Submission to Project Completion - URA', '3.3.8.3', 'Client', 'Receive Written Permission.', 'END']
    ];

    const formattedNew3_3 = new3_3.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    let insertIndex = recordsWithout3_3.length;

    let finalRecords = [
        ...recordsWithout3_3.slice(0, insertIndex),
        ...formattedNew3_3,
        ...recordsWithout3_3.slice(insertIndex)
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
            console.log('Done writing updated CSV with 3.3');
        });
  });
