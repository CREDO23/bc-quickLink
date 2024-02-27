import User from './user';
import Link from './link';
import UserLinks from './usersLinks';

Link.belongsToMany(User, {
  through: UserLinks,
  as: 'user',
  foreignKey: 'link_id',
});

User.belongsToMany(Link, {
  through: UserLinks,
  as: 'link',
  foreignKey: 'user_id',
});

UserLinks.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
});

UserLinks.belongsTo(Link, {
  as: 'link',
  foreignKey: 'link_id',
});
