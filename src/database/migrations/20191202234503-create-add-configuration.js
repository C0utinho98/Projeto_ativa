module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'configuration_id', {
      type: Sequelize.INTEGER,
      references: { model: 'configuration', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColum('users', 'configuration_id');
  },
};
