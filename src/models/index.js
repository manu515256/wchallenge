import User from './user';
import UserCrypto from './crypto';

User.hasMany(UserCrypto);
UserCrypto.belongsTo(User, {foreignKey: 'user_id'});

export default{
    User,
    UserCrypto
}