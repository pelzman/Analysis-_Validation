/**
 * First task - Read the csv files in the inputPath and analyse them
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
import fs from 'fs';
import emailValidator from 'email-validator';
function analyseFiles(inputPaths: string[], outputPath: string) {
  interface AllTotal {
    validDomains: string[];
    totalEmailsParsed: number;
    totalValidEmails: number;
    categories: Record<string, number>;
  }
  const resultObj: AllTotal = {
    validDomains: [],
    totalEmailsParsed: 0,
    totalValidEmails: 0,
    categories: {},
  };
  let fetchArray: string[] = [];
  let mails = '';
  const validEmails: string[] = [];
  const domainArray: string[] = [];
  const categories: Record<string, number> = {};

  // let validDomains : string[]
  for (let i = 0; i < inputPaths.length; i++) {
    fs.readFile(inputPaths[i], 'utf-8', (error, data) => {
      
      for (let j = 0; j < data.length; j++) {
        mails += data[j];
      }
      fetchArray = mails.split('\n');
      for (let k = 0; k < fetchArray.length; k++) {
        if (emailValidator.validate(fetchArray[k]) === true) {
          validEmails.push(fetchArray[k]);
        }
      }

      const loopedArr = validEmails.map((validEmail) => validEmail.split('@'));

      const secondLoop = loopedArr.map(([name, domain]) =>
        domainArray.push(domain),
      );
      for (let r = 0; r < domainArray.length; r++) {
        if (Object.hasOwnProperty.call(categories, domainArray[r])) {
          categories[domainArray[r]]++;
        } else {
          categories[domainArray[r]] = 1;
        }
      }
      console.log(domainArray);
      resultObj['validDomains'] = domainArray;
      resultObj['totalValidEmails'] = validEmails.length;
      resultObj['totalEmailsParsed'] = fetchArray.length;
      resultObj['categories'] = categories;
      console.log(resultObj);

      fs.writeFile(outputPath, JSON.stringify(resultObj), 'utf-8', (err) => {
        if (err) console.log(err);
        else console.log('Result saved');
      });
    });
  }

  console.log('Complete the implementation in src/analysis.ts');
}
analyseFiles(
  [
    '/Users/decagon/Desktop/week-4-task-pelzman/task-two/fixtures/inputs/small-sample.csv',
  ],
  'test.json',
);
export default analyseFiles;
