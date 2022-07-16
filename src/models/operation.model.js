const database = require('../configs/db.config');
const {ObjectId} = require("mongodb");

let Operation = (operation) => {
    this.title                  = operation.title;
    this.description            = operation.description;
    this.picture                = operation.picture;
    this.date                   = operation.date;
    this.duration               = operation.duration;
    this.connectionStartTime    = operation.connectionStartTime;
}

Operation.getMaxPages = async (result) => {
    const perPage = 50;
    const total = await database.db.collection('operations').count();

    return Math.ceil(total / perPage);
}

Operation.getAllOperations = async (pageIndex, result) => {
    const perPage = 50;
    const page = parseInt(pageIndex) || 1;
    const startFrom = (page - 1) * perPage;

    return await database.db.collection('operations').find({})
        .skip(startFrom)
        .limit(perPage)
        .toArray();
}

Operation.getOperation = async (_id, result) => {
    return await database.db.collection('operations').findOne({_id: ObjectId(_id)});
}

Operation.createOperation = async (operation, result) => {
    await database.db.collection('operations').insertOne(operation);
    return await Operation.getOperation(operation._id, result);
}

Operation.updateOperation = async (_id, operation, result) => {
    await database.db.collection('operations').updateOne({_id: ObjectId(_id)}, {$set: operation});
    return await Operation.getOperation(_id, result);
}

Operation.deleteOperation = async (_id, result) => {
    return await database.db.collection('operations').deleteOne({_id: ObjectId(_id)});
}

module.exports = Operation;
