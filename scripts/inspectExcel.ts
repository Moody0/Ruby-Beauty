import * as XLSX from 'xlsx';
import * as path from 'path';

const excelFilePath = 'C:\\Users\\moham\\OneDrive\\Desktop\\products_export.xlsx';

async function main() {
    console.log('Reading Excel file:', excelFilePath);
    const workbook = XLSX.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log('Total rows found:', data.length);
    if (data.length > 0) {
        console.log('First row keys:', Object.keys(data[0] as any));
        console.log('First row example:', JSON.stringify(data[0], null, 2));
    }
}

main().catch(console.error);
