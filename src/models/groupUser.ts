import { DataTypes, Sequelize } from 'sequelize';

const GroupUserModelFactory = (db: Sequelize) =>
  db.define(
    'UserGroup',
    {
      groupId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: db.models.UserModel,
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: db.models.GroupModels,
          key: 'id',
        },
      },
    },
    { timestamps: false }
  );

export default GroupUserModelFactory;
