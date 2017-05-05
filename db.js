const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = {
  models: { },
  sequelize: null,
  Sequelize,
  init: function init(config) {
    const dbConfig = { };
    Object.assign(dbConfig, config.database);

    dbConfig.logging = console.log;
    dbConfig.user = dbConfig.user || null;

    this.Sequelize = Sequelize;
    this.sequelize = new Sequelize(
      dbConfig.name,
      dbConfig.user,
      dbConfig.password,
      dbConfig
    );

    // Load models into the DB map.
    fs
      .readdirSync(path.join(__dirname, 'models'))
      .filter(file => (file.indexOf('.') !== 0))
      .forEach((file) => {
        const model = this.sequelize.import(path.join(__dirname, 'models', file));
        this.models[model.name] = model;
      });

    // Set up model bindings after all models are loaded.
    Object.keys(this.models).forEach((modelName) => {
      if ('associate' in this.models[modelName]) {
        this.models[modelName].associate(this.models);
      }
    });
  },
};