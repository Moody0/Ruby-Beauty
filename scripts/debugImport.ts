import * as XLSX from 'xlsx';

const excelFilePath = 'C:\\Users\\moham\\OneDrive\\Desktop\\products_export.xlsx';

async function main() {
    const workbook = XLSX.readFile(excelFilePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const range = sheet['!ref'] || 'A1';
    const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    console.log('--- EXCEL STATS ---');
    console.log('Range:', range);
    console.log('Rows in data array:', data.length);

    if (data.length > 0) {
        const firstRow = data[0] as any;
        console.log('Keys in first row:', Object.keys(firstRow));
    }
}

main().catch(console.error);
