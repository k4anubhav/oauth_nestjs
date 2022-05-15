const fs = require('fs');

const dotenv = require('dotenv');

dotenv.config();

fs.writeFileSync('./ormconfig.json', content);
