import Sequelize from 'sequelize';

import User from '../app/models/User';
import Configuration from '../app/models/Configuration';
import UserInProject from '../app/models/UserInProject';
import databaseConfig from '../config/database';

const models = [User, Configuration, UserInProject];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
