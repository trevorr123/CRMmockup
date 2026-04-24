const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const results = [];
fs.createReadStream('flow_cleaned_4col.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const otherRecords = results.filter(r => !r['File Name'].includes('1.1 Business Development'));

    const new1_1 = [
      ['1.1 Business Development - Understanding Referral Needs', '1.1.1', '[N/A]', 'STAGE 1.1.1: ASSESSING APPLICABLE AGENC(IES) FOR PROSPECTIVE CASE', '1.1.1.1'],
      ['', '1.1.1.1', 'Client / Contractors', 'Contact Dyson with a business enquiry.', '1.1.1.2'],
      ['', '1.1.1.2', 'Sales Executive', 'Request information (Type of intended business, Address, Proposed floorplan, Copies of any approval of use).', '1.1.1.3'],
      ['', '1.1.1.3', 'Client / Contractors', 'Gives information on Proposed Business.', '1.1.1.4'],
      ['', '1.1.1.4', 'Sales Executive', 'Is there a desired location in mind?', '1.1.1.5, 1.1.1.6'],
      ['', '1.1.1.5', 'Sales Executive', 'If no location, refer client to RE Agent.', ''],
      ['', '1.1.1.6', 'Sales Executive', "If yes location, Does Proposed Business involve NEA's approval?", '1.1.1.7, 1.1.1.8'],
      ['', '1.1.1.7', 'Sales Executive', 'If no NEA approval needed, refer client to RE Agent.', ''],
      ['', '1.1.1.8', 'Sales Executive', 'If yes NEA approval needed, Will NEA approval be easily obtained?', '1.1.1.9, 1.1.1.10'],
      ['', '1.1.1.9', 'Sales Executive', 'If NEA approval not easily obtained, refer client to RE Agent.', ''],
      ['', '1.1.1.10', 'Sales Executive', 'If NEA approval easily obtained, Did client send AoU?', '1.1.1.11, 1.1.2'],
      ['', '1.1.1.11', 'Sales Executive', 'If yes client sent AoU, proceed to Assess if Quotation is Needed.', '1.1.3'],
      
      ['1.1 Business Development - Understanding Referral Needs', '1.1.2', '[N/A]', 'STAGE 1.1.2: ASSESS IF CHANGE IN APPROVAL OF USE WITH HDB/URA/JTC IS REQUIRED', '1.1.2.1'],
      ['', '1.1.2.1', 'Sales Executive', 'Check address to determine relevant agenc(ies).', '1.1.2.2'],
      ['', '1.1.2.2', 'Sales Executive', 'Is the unit under the purview of HDB/URA/JTC?', '1.1.2.3, 1.1.2.7'],
      ['', '1.1.2.3', 'Sales Executive', 'If HDB / JTC, Check with client if an enquiry has been made with HDB / JTC.', '1.1.2.4, 1.1.2.6'],
      ['', '1.1.2.4', 'Sales Executive', 'If yes enquiry made, Request client to send over HDB/JTC\'s list of requirements for use of premises.', '1.1.2.5'],
      ['', '1.1.2.5', 'Client', 'Sends over HDB/JTC\'s list of requirements for use of premises.', '1.1.2.8'],
      ['', '1.1.2.6', 'Sales Executive', 'If no enquiry made, Inform client to email HDB/JTC and send over list of requirements for use.', '1.1.2.5'],
      ['', '1.1.2.7', 'Sales Executive', 'If URA, Search URA Portal to determine existing Approval of Use.', '1.1.2.8'],
      ['', '1.1.2.8', 'Sales Executive', 'Does the intended business fall under the existing Approval of Use?', '1.1.2.9, 1.1.2.10'],
      ['', '1.1.2.9', 'Sales Executive', 'If yes it falls under existing Approval of Use, proceed to Assess if Quotation is Needed.', '1.1.3'],
      ['', '1.1.2.10', 'Sales Executive', "If no it does not fall under existing Approval of Use, Conduct checks on URA Portal / Email officer handling specific area of unit to verify if Change of Use to client's desired use is allowed.", '1.1.2.11'],
      ['', '1.1.2.11', 'Sales Executive', 'Is Change of Use to desired use allowed?', '1.1.2.12, 1.1.2.13'],
      ['', '1.1.2.12', 'Sales Executive', 'If no Change of Use is not allowed, Inform client of potential issues regarding Approval of Use for desired business (DO NOT TAKE ON THE CASE).', ''],
      ['', '1.1.2.13', 'Sales Executive', 'If yes Change of Use is allowed, proceed to Assess if Quotation is Needed.', '1.1.3'],
      
      ['1.1 Business Development - Understanding Referral Needs', '1.1.3', '[N/A]', 'STAGE 1.1.3: ASSESS IF QUOTATION IS NEEDED', '1.1.3.1'],
      ['', '1.1.3.1', 'Sales Executive', 'Check if client requires Dyson to quote for filing Change of Use application.', '1.2']
    ];

    const formattedNew1_1 = new1_1.map(row => ({
        'File Name': row[0],
        'Step #': row[1],
        'Person-in-charge': row[2],
        'Step': row[3],
        'Next Step / Reference': row[4]
    }));

    const processedOther = otherRecords.map(r => {
        return {
            'File Name': r['File Name'],
            'Step #': r['Step #'],
            'Person-in-charge': r['Person-in-charge'],
            'Step': r['Step'],
            'Next Step / Reference': ''
        };
    });

    const finalRecords = [...formattedNew1_1, ...processedOther];

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
            console.log('Done writing updated CSV');
        });
  });
