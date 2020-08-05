import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelinePromise = promisify(pipeline);
const run = () =>
  pipelinePromise(
    fs.createReadStream(path.resolve(__dirname, '../csv/csv-example.csv')),
    csv({
      colParser: {
        Amount: 'omit',
      },
      delimiter: ';',
    }),
    fs.createWriteStream(path.resolve(__dirname, '../csv/output.txt'))
  ).catch((err) => {
    throw err;
  });

run();
