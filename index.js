const config = require('./config');
const db = require('./db');

db.init(config);

const maxSelectTime = 1000;
const maxInsertTime = 1000;
const concurrentSelect = 10;
const concurrentInsert = 10;
const ids = [];

function getId() {
  return Math.floor(Math.random() * ids.length);
}

function insertTest() {
  const test = db.models.Test.create({
    time: (new Date()).getTime() / 1000,
  });
  ids.push(test.id);
  setTimeout(insertTest, Math.floor(Math.random() * maxInsertTime));
}

function selectTest() {
  const test = db.models.Test.find(ids[getId()]);
  setTimeout(selectTest, Math.floor(Math.random() * maxSelectTime));
}

db.sequelize
  .sync()
  .then(() => {
    for (let i = 0; i < concurrentSelect; i++) {
      setTimeout(selectTest, Math.floor(Math.random() * maxSelectTime));
    }
    for (let i = 0; i < concurrentInsert; i++) {
      setTimeout(insertTest, Math.floor(Math.random() * maxInsertTime));
    }
  });