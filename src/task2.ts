import csv from 'csvtojson';
import fs from 'fs';

const readableStream = fs.createReadStream('./csv/csv-example.csv');
const writableStream = fs.createWriteStream('./csv/output.txt');
const csvTransform = csv({
  colParser: {
    Amount: 'omit',
  },
  delimiter: ';',
});

readableStream
  .on('error', (error) => {
    throw error;
  })
  .pipe(csvTransform)
  .on('error', (error) => {
    throw error;
  })
  .pipe(writableStream);
