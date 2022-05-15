const fs = require('fs');

const dotenv = require('dotenv');

dotenv.config();

let config = process.env.ORM_CONFIG;
if (process.env.DATABASE_URL) {
  console.log('Using DATABASE_URL');
  config = config.replace('{DATABASE_URL}', process.env.DATABASE_URL);
}

fs.writeFileSync('./ormconfig.json', config);
