import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  DataTypes,
} from 'sequelize';
import sequelize from '.';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  //Loaded after association
  links: NonAttribute<ILink>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'users',
  },
);

export default User;
