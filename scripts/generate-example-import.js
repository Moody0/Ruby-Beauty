const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const exampleData = [
    {
        Brand: "Ruby Beauty",
        "Brand Group": "MAIN",
        Category: "Skincare",
        Name: "Vitamin C Serum",
        Description: "Brightening vitamin C serum for radiant skin",
        Price: 29.99,
        "Discount Price": 24.99,
        Stock: 50,
        SKU: "RB-VC-001",
        Images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
        "Is Trending": "Yes"
    },
    {
        Brand: "Ruby Beauty",
        "Brand Group": "MAIN",
        Category: "Skincare",
        Name: "Hydrating Moisturizer",
        Description: "Deep hydration moisturizer for all skin types",
        Price: 35.00,
        "Discount Price": "",
        Stock: 30,
        SKU: "RB-HM-002",
        Images: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800",
        "Is Trending": "No"
    },
    {
        Brand: "Makeup Brand",
        "Brand Group": "MAIN",
        Category: "Lips",
        Name: "Matte Lipstick - Ruby Red",
        Description: "Long-lasting matte lipstick",
        Price: 18.00,
        "Discount Price": "",
        Stock: 100,
        SKU: "MK-LR-001",
        Images: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800",
        "Is Trending": "Yes"
    },
    {
        Brand: "Makeup Brand",
        "Brand Group": "MAIN",
        Category: "Face",
        Name: "Foundation - Beige",
        Description: "Lightweight foundation with natural finish",
        Price: 42.00,
        "Discount Price": 35.00,
        Stock: 45,
        SKU: "MK-FB-002",
        Images: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800",
        "Is Trending": "No"
    },
    {
        Brand: "Chanel",
        "Brand Group": "MAIN",
        Category: "Perfumes",
        Name: "Chanel No. 5",
        Description: "Classic floral fragrance",
        Price: 125.00,
        "Discount Price": "",
        Stock: 20,
        SKU: "PF-CN-001",
        Images: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800",
        "Is Trending": "Yes"
    },
    {
        Brand: "Dior",
        "Brand Group": "MAIN",
        Category: "Perfumes",
        Name: "Sauvage",
        Description: "Fresh and bold masculine fragrance",
        Price: 95.00,
        "Discount Price": 85.00,
        Stock: 25,
        SKU: "PF-DS-002",
        Images: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800",
        "Is Trending": "Yes"
    },
    {
        Brand: "Accessory Brand",
        "Brand Group": "MAIN",
        Category: "Brushes",
        Name: "Professional Brush Set",
        Description: "High-quality brush set for makeup application",
        Price: 55.00,
        "Discount Price": "",
        Stock: 40,
        SKU: "AC-BS-001",
        Images: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
        "Is Trending": "No"
    },
    {
        Brand: "Accessory Brand",
        "Brand Group": "MAIN",
        Category: "Tools",
        Name: "Face Roller",
        Description: "Jade roller for facial massage",
        Price: 25.00,
        "Discount Price": 20.00,
        Stock: 60,
        SKU: "AC-FR-002",
        Images: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800",
        "Is Trending": "Yes"
    },
    {
        Brand: "Ruby Beauty",
        "Brand Group": "MAIN",
        Category: "Skincare",
        Name: "Cleanser",
        Description: "Gentle daily cleanser",
        Price: 22.00,
        "Discount Price": "",
        Stock: 80,
        SKU: "RB-CL-003",
        Images: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
        "Is Trending": "No"
    },
    {
        Brand: "Makeup Brand",
        "Brand Group": "MAIN",
        Category: "Eyes",
        Name: "Eye Shadow Palette",
        Description: "12-color eyeshadow palette",
        Price: 38.00,
        "Discount Price": 30.00,
        Stock: 35,
        SKU: "MK-ES-003",
        Images: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800",
        "Is Trending": "Yes"
    }
];

const worksheet = XLSX.utils.json_to_sheet(exampleData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

const outputPath = path.join(__dirname, 'example-product-import.xlsx');
XLSX.writeFile(workbook, outputPath);

console.log(`Example Excel file created at: ${outputPath}`);
console.log(`Total rows: ${exampleData.length}`);