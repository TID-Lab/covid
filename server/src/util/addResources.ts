import axios from 'axios'
import fs from 'fs'
import { parse } from 'csv-parse'
import { array } from 'prop-types';

export function addResourcesFromCSV(filePath: any) {
  const data = [];
  fs.createReadStream(filePath)
  .pipe(
    parse({
      delimiter: ",",
      columns: true,
      ltrim: true,
    })
  )
  .on("data", function (row) {
    // 👇 push the object row into the array
    data.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    // 👇 log the result array
    console.log("parsed csv data:");
    console.log(data);
    
    data.forEach((csvEntry) => {
      console.log("hmm")
      axios
      .post('localhost:5000/api/resource', {
        author: csvEntry['Source/creator'],
        name: csvEntry['Title of resource'],
        type: csvEntry['Link'].endsWith('pdf') ? 'pdf' : 'website',
        fetchedAt: Date.now(),
        authoredAt: Date.now(),
        url: csvEntry['Link'],
        // topics: csvEntry[]
      })
      .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
    })
  });

 
}


addResourcesFromCSV("../covid_res.csv");