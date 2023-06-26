/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
import fs from 'fs';
import dns from 'dns';
import emailValidator from 'email-validator';

async function validateEmailAddresses(
  inputPaths: string[],
  outputFile: string,
) {
  let fetchArray: string[] = [];
  const validEmails: string[] = [];
  const domainArray: string[] = [];
  const result: string[] = [];

  let mail = '';
  const check: { [key: string]: boolean | undefined } = {};
  for (let i = 0; i < inputPaths.length; i++) {
    try {
      const email = fs.readFileSync(inputPaths[i], 'utf-8');
      mail += email;
      fetchArray = mail.split('\n');
      const fetchArray2 = String(fetchArray.shift());
      console.log(fetchArray2);
      const newArray = String(fetchArray.shift());
      for (let k = 0; k < fetchArray.length; k++) {
        if (emailValidator.validate(fetchArray[k]) === true) {
          validEmails.push(fetchArray[k]);
        }
      }
      for (let n = 0; n < validEmails.length; n++) {
        const tested = await new Promise<boolean>((resolve) => {
          dns.resolveMx(validEmails[n].split('@')[1], (error, addresses) => {
            if (error) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
        });
        if (tested) {
          result.push(validEmails[n]);
        }
      }
      result.unshift(fetchArray2);
      const allResult = result.join('\n');
      console.log(allResult);
      fs.writeFileSync(outputFile, allResult, 'utf-8');
    } catch (error) {
      console.log(error);
    }
  }

  console.log('Complete the implementation in src/validation.ts');
}
validateEmailAddresses(
  [
    '/Users/decagon/Desktop/week-4-task-pelzman/task-two/fixtures/inputs/small-sample.csv',
  ],
  'test1.json',
);
export default validateEmailAddresses;
