import fs from 'fs';
import csv from 'csv-parser';

const DRONE_DATA_PATH = "./data/drones.csv"
const DESTINATION_DATA_PATH = './data/destinations.csv'


/**
 * Return a list of objects of destinations from local CSV
 * @returns {Array<Object>}
 */
async function getDestinations() {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(DESTINATION_DATA_PATH)
      .pipe(csv(['destination','weight']))
      .on('data', data => results.push(data)
      )
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

/**
 * Retrieve the list of drones with total weights from local CSV file
 * @returns {Array<Object>}
 */
async function getDrones() {
    return await _parseString( 
        fs.readFileSync(DRONE_DATA_PATH).toString()
    )
}

/**
 * Parse a string from a specific format to a list of objects
 * @param {String} dronesString 
 * @returns {Array<Object>}
 */
async function _parseString(dronesString) {
    const regex = /\[(.*?)\]/g;
    const matches = dronesString.match(regex).map(match => match.replace(/\[|\]/g, ''));
    const drones = [];
  
    for (let i = 0; i < matches.length; i += 2) {
      drones.push({
        name: matches[i],
        capacity: parseFloat(matches[i + 1])
      });
    }
  
    return drones;
  }


export { getDestinations, getDrones };
