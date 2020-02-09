import { Model } from 'sequelize';

class UserInProject extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: 'userInProject',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user' });
    this.belongsTo(models.Configuration, { foreignKey: 'id_project' });
  }
}

export default UserInProject;
