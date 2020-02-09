import Sequelize, { Model } from 'sequelize';

class Configuration extends Model {
  static init(sequelize) {
    super.init(
      {
        name_project: Sequelize.STRING,
        host: Sequelize.STRING,
        port: Sequelize.NUMBER,
        enable_project: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'configuration',
      }
    );
    return this;
  }
}

export default Configuration;
