import { DataTypes, Sequelize } from 'sequelize';
import { GroupInstance } from 'src/types';

const GroupModelFactory = (db: Sequelize) =>
  db.define<GroupInstance>(
    'groups',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      permission: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    { timestamps: false }
  );

export default GroupModelFactory;
