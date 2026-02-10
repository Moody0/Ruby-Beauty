import * as XLSX from 'xlsx';

const excelFilePath = 'C:\\Users\\moham\\OneDrive\\Desktop\\Ruby-Beauty-Products.xlsx';

async function main() {
    const workbook = XLSX.readFile(excelFilePath);
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[];
    if (data.length > 0) {
        console.log('--- ALL KEYS IN ROW 0 ---');
        Object.keys(data[0]).forEach(k => console.log(`Key: "${k}"`));
        console.log('--- VALUES IN ROW 0 ---');
        console.log(JSON.stringify(data[0], null, 2));
    }
}
main().catch(console.error);
