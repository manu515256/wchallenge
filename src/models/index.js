import User from './user';
import UserCrypto from './crypto';

User.hasMany(UserCrypto, {foreignKey: 'id'});
UserCrypto.belongsTo(User, {foreignKey: 'user_id'});

export default{
    User,
    UserCrypto
}