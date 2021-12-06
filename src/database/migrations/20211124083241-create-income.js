module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Incomes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      income: {
        type: Sequelize.DECIMAL(12, 2),
      },
      amount_tax_paid: {
        type: Sequelize.DECIMAL(12, 2),
      },
      tax_id: {
        type: Sequelize.INTEGER,
      },
      year: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Incomes');
  },
};
