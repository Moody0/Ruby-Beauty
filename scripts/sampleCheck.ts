import * as XLSX from 'xlsx';

const excelFilePath = 'C:\\Users\\moham\\OneDrive\\Desktop\\products_export.xlsx';

async function main() {
    const workbook = XLSX.readFile(excelFilePath);
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[];

    console.log('Total Rows:', data.length);

    const sampleIndices = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    sampleIndices.forEach(idx => {
        if (data[idx]) {
            console.log(`--- Row ${idx} ---`);
            console.log('Keys:', Object.keys(data[idx]));
            console.log('Name Value:', data[idx]['الاسم'] || data[idx][' الاسم']);
        }
    });

    let nameCount = 0;
    data.forEach(row => {
        if (row['الاسم'] || row[' الاسم']) nameCount++;
    });
    console.log('Rows with Name property:', nameCount);
}

main().catch(console.error);
