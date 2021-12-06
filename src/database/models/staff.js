import sequelizePaginate from 'sequelize-paginate';
import bcrypt from 'bcryptjs';

import { sign } from 'jsonwebtoken';

module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    'Staff',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.ENUM('Chairman', 'Officer'),
        defaultValue: 'Officer',
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    // {
    //   defaultScope: {
    //     attributes: {
    //       exclude: ['password'],
    //     },
    //   },
    // },
    {
      hooks: {
        // eslint-disable-next-line no-unused-vars
        async beforeCreate(staff, options) {
          const salt = await bcrypt.genSalt(12);
          staff.password = await bcrypt.hash(staff.password, salt);
        },
      },
    },
    {}
  );

  Staff.prototype.generateAuthToken = function() {
    return sign(
      {
        sub: this.id,
        name: this.name,
        username: this.username,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2 days',
      }
    );
  };

  Staff.associate = ({}) => {
    // associations can be defined here
  };

  sequelizePaginate.paginate(Staff);
  return Staff;
};
