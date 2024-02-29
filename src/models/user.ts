import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  DataTypes,
  BelongsToManyAddAssociationMixin,
  BelongsToManyCreateAssociationMixin
} from 'sequelize';
import {sequelize} from '.';
import Link from './link';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  // Association mixins
  declare createLink : BelongsToManyCreateAssociationMixin<Link>
  declare addLink : BelongsToManyAddAssociationMixin<Link, Link['id']>
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
    created_at:  DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize : sequelize,
    modelName: 'users',
    timestamps : true,
    createdAt : 'created_at',
    updatedAt : 'updated_at'
  },
);

export default User;
