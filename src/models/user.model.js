const database = require('../configs/db.config');

let User = (user) => {
    this.identifier     = user.identifier;
    this.username       = user.username;
    this.discriminator  = user.discriminator;
    this.avatar         = user.avatar;
}

User.getAllOfUsers = async (result) => {
    return await database.db.collection('users').find({}).toArray();
}

User.getMaxPages = async (result) => {
    const perPage = 50;
    const total = await database.db.collection('users').count();

    return Math.ceil(total / perPage);
}

User.getUsers = async (pageIndex, result) => {
    const perPage = 50;
    const page = parseInt(pageIndex) || 1;
    const startFrom = (page - 1) * perPage;

    if (page === -1) {
        return await database.db.collection('users').find({}).toArray();
    } else {
        return await database.db.collection('users').find({})
            .sort({"username": 1})
            .skip(startFrom)
            .limit(perPage)
            .toArray();
    }
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

User.deleteUser = async (identifier, result) => {
    return await database.db.collection('users').deleteOne({identifier: identifier});
}

module.exports = User;
