import * as XLSX from 'xlsx';

const excelFilePath = 'C:\\Users\\moham\\OneDrive\\Desktop\\products_export.xlsx';

async function main() {
    const workbook = XLSX.readFile(excelFilePath);
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[];

    const categories = new Set();
    const keys = data.length > 0 ? Object.keys(data[0]) : [];
    console.log('Available Keys:', keys);

    data.forEach(row => {
        // Find category key
        const catKey = keys.find(k => k.includes('الفئة'));
        if (catKey) {
            categories.add(row[catKey]);
        }
    });

    console.log('Unique Categories found in Excel:', Array.from(categories));
}

main().catch(console.error);
