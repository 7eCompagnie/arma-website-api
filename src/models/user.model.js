const db = require('../configs/db.config');

let User = (user) => {
    this.identifier     = user.identifier;
    this.email          = user.email;
    this.username       = user.username;
    this.discriminator  = user.discriminator;
    this.avatar         = user.avatar;
}

User.getAllUsers = (result) => {
    db.collection('users').find().toArray(function(err, res) {
        if (err) throw err;
        result(null, res);
    });
}

module.exports = User;
