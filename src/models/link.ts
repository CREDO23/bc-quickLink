import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  ForeignKey,
  DataTypes,
  NonAttribute,
} from 'sequelize';
import User from './user';
import {sequelize} from '.';

class Link extends Model<InferAttributes<Link>, InferCreationAttributes<Link>> {
  declare id: CreationOptional<string>;
  declare long_form: string;
  declare maker: string;
  declare visit_times: number;
  declare created_at: CreationOptional<string>;
  declare updated_at: CreationOptional<string>;

  //Loaded after association
  declare user_id: ForeignKey<User['id']>;
  declare user : NonAttribute<User>;
}

Link.init(
  {
    id: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    long_form: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    maker: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    visit_times: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  { sequelize : sequelize, modelName: 'links' , timestamps : false},
);

export default Link;
