import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Tax = sequelize.define(
    'Tax',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      source_of_income: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      officer_assigned_to: {
        type: DataTypes.INTEGER,
      },
      officer_approval_status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Declined'),
        defaultValue: 'Pending',
      },
      officer_remarks: {
        type: DataTypes.TEXT,
      },
      final_approval: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {}
  );
  Tax.associate = ({ User, Staff, Income }) => {
    // associations can be defined here
    Tax.belongsTo(User, {
      foreignKey: 'user_id',
    });

    Tax.belongsTo(Staff, {
      foreignKey: 'officer_assigned_to',
    });

    Tax.hasMany(Income, {
      foreignKey: 'tax_id',
    });
  };
  sequelizePaginate.paginate(Tax);
  return Tax;
};
