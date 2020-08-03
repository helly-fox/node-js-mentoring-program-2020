import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';

const readableStream = fs.createReadStream(path.resolve(__dirname, '../csv/csv-example.csv'));
const writableStream = fs.createWriteStream(path.resolve(__dirname, '../csv/output.txt'));
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
