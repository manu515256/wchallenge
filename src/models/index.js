import User from './user';
import UserCrypto from './crypto';

User.hasMany(UserCrypto, {foreignKey: 'user_id'});
UserCrypto.belongsTo(User);

export default{
    User,
    UserCrypto
}