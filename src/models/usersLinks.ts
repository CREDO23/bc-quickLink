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
import Link from './link';
  
  class UserLinks extends Model<InferAttributes<UserLinks>, InferCreationAttributes<UserLinks>> {
    declare id: CreationOptional<string>;
  
    //Loaded after association
    declare user_id: ForeignKey<User['id']>;
    declare link_id: ForeignKey<User['id']>;

    declare users : NonAttribute<User[]>;
    declare links : NonAttribute<Link[]>;
  }
  
  UserLinks.init(
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      }
    },
    { sequelize : sequelize, modelName: 'users_inks' , timestamps : false},
  );
  
  export default UserLinks;
  