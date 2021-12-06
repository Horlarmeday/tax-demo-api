module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define(
    'Income',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      income: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      amount_tax_paid: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      tax_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  );
  Income.associate = ({ Tax }) => {
    // associations can be defined here
    Income.belongsTo(Tax, {
      foreignKey: 'tax_id',
    });
  };
  return Income;
};
