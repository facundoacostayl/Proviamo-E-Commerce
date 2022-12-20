const { google } = require('googleapis');
const {sheets} = require('../config/oAuth2client');

const getProducts = async() => {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: '1NHHU7-mhlgVMaTRtyFi2zCTLk5mZzSelGX_xImdq_bI',
        range: 'Productos!A2:I',
    });
    const rows = response.data.values;
    const products = rows.map((row) => ({
        id: +row[0],
        title: row[1],
        price: +row[2],
        image: row[3],
        category: row[4],
        subcategory: row[5],
        description: row[6],
        fiambres: row[7],
        quesos: row[8]
    }));

    return products;
}

const addProducts = async(products) => {
    let values = products.map(p => [p.id, p.title, p.price, p.image, p.category, p.subcategory, p.description, p.fiambres, p.quesos]);

    const resource = {
        values,
    };

    const result = await sheets.spreadsheets.values.update({
        spreadsheetId: '1NHHU7-mhlgVMaTRtyFi2zCTLk5mZzSelGX_xImdq_bI',
        range: 'Productos!A2:I',
        valueInputOption: "RAW",
        resource,
    });
}

module.exports = {getProducts, addProducts};