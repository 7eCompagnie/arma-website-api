const database = require('../configs/db.config');

let User = (user) => {
    this.identifier     = user.identifier;
    this.email          = user.email;
    this.username       = user.username;
    this.discriminator  = user.discriminator;
    this.avatar         = user.avatar;
}

User.getAllUsers = async (result) => {
    return await database.db.collection('users').find({}).toArray();
}

module.exports = User;
