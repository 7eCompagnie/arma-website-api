const database = require('../configs/db.config');
const {ObjectId} = require("mongodb");

let Training = (training) => {
    this.title          = training.title;
    this.description    = training.description;
    this.picture        = training.picture;
    this.trainers       = training.trainers;
    this.isOpen         = training.isOpen;
}

Training.getMaxPages = async (result) => {
    const perPage = 50;
    const total = await database.db.collection('trainings').count();

    return Math.ceil(total / perPage);
}

Training.getAllTrainings = async (pageIndex, result) => {
    const perPage = 50;
    const page = parseInt(pageIndex) || 1;
    const startFrom = (page - 1) * perPage;

    return await database.db.collection('trainings').find({})
        .skip(startFrom)
        .limit(perPage)
        .toArray();
}

Training.getTraining = async (_id, result) => {
    return await database.db.collection('trainings').findOne({_id: ObjectId(_id)});
}

Training.createTraining = async (training, result) => {
    await database.db.collection('trainings').insertOne(training);
    return await Training.getTraining(training._id, result);
}

Training.updateTraining = async (_id, training, result) => {
    await database.db.collection('trainings').updateOne({_id: ObjectId(_id)}, {$set: training});
    return await Training.getTraining(_id, result);
}

Training.deleteTraining = async (_id, result) => {
    return await database.db.collection('trainings').deleteOne({_id: ObjectId(_id)});
}

module.exports = Training;
