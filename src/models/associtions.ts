import User from './user';
import Link from './link';

Link.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
});

User.hasMany(Link, {
  as: { singular: 'link', plural: 'links' },
  foreignKey: 'user_id',
});
