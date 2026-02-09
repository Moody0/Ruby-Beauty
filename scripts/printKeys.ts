import * as XLSX from 'xlsx';

const excelFilePath = 'C:\\Users\\moham\\OneDrive\\Desktop\\products_export.xlsx';

async function main() {
    const workbook = XLSX.readFile(excelFilePath);
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    if (data.length > 0) {
        const item = data[0] as any;
        for (const key in item) {
            console.log(`KEY: ${key} | VALUE type: ${typeof item[key]}`);
        }
    }
}

main().catch(console.error);
