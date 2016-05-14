const fs = require('fs');
const path = require('path');

const dbFile = path.join(__dirname, 'db.json');
const dbContent = {
  tasks: [
    {id: 0, title: 'Try Angular Redux', completed: false}
  ]
};

fs.exists(dbFile, exists => {
  if (!exists) {
    fs.writeFileSync(dbFile, JSON.stringify(dbContent), {encoding: 'utf-8'});
  }
});
