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

User.getUser = async (identifier, result) => {
    return await database.db.collection('users').findOne({identifier: identifier});
}

User.createUser = async (user, result) => {
    await database.db.collection('users').insertOne(user);
    return await User.getUser(user.identifier, result);
}

User.updateUser = async (identifier, user, result) => {
    await database.db.collection('users').updateOne({identifier: identifier}, {$set: user});
    return await User.getUser(identifier, result);
}

module.exports = User;
