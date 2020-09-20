import { DataTypes, Sequelize } from 'sequelize';
import { UserInstance } from 'src/types';

const UserModelFactory = (db: Sequelize) =>
  db.define<UserInstance>(
    'users',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      login: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

export default UserModelFactory;
