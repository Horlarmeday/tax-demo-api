module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Taxes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      source_of_income: {
        type: Sequelize.STRING,
      },
      officer_assigned_to: {
        type: Sequelize.INTEGER,
      },
      officer_approval_status: {
        type: Sequelize.ENUM('Pending', 'Approved', 'Declined'),
        defaultValue: 'Pending',
      },
      officer_remarks: {
        type: Sequelize.TEXT,
      },
      final_approval: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('Taxes');
  },
};
