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
import { sequelize } from '.';
import Link from './link';

class UserLinks extends Model<
  InferAttributes<UserLinks>,
  InferCreationAttributes<UserLinks>
> {
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  //Loaded after association
  declare user_id: ForeignKey<User['id']>;
  declare link_id: ForeignKey<User['id']>;

  declare users: NonAttribute<User[]>;
  declare links: NonAttribute<Link[]>;
}

UserLinks.init(
  {
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    modelName: 'users_links',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default UserLinks;
