
const XLSX = require('xlsx');

async function analyzeXlsx() {
    try {
        const filePath = 'C:/Users/moham/Downloads/المنتجات حسب الصيغة المطلوبة (1) (1).xlsx';
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        
        console.log('--- XLSX ANALYSIS ---');
        console.log(`Total Rows: ${data.length}`);
        if (data.length > 0) {
            console.log('Columns Found:', Object.keys(data[0]));
            
            // Check for missing data
            const missingCategory = data.filter(item => !item.Category);
            const missingName = data.filter(item => !item.Name);
            
            console.log(`Rows missing Category: ${missingCategory.length}`);
            console.log(`Rows missing Name: ${missingName.length}`);
            
            if (missingCategory.length > 0) {
                console.log('Sample row missing Category:', JSON.stringify(missingCategory[0], null, 2));
            }
        }
    } catch (error) {
        console.error('Error reading XLSX:', error.message);
    }
}

analyzeXlsx();
