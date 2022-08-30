const fs = require('fs');
const Landmark = require("../models/landmark");

class LandmarkService{
    static async getAll(){
        try {
            const allLandmarks = await Landmark.find().populate({
                path: 'comments',
                select: ['text', 'date'],
                populate: {
                    path: 'author',
                    select: ['username', 'image']
                }
            });
            return allLandmarks;
        } catch (error) {
            console.log(`Could not fetch Landmarks ${error}`)
        }
    }

    static async create(data){
        try {
           const response = await new Landmark(data).save();
           return response;
        } catch (error) {
            console.log(error);
        } 

    }
    static async getById(landmarkId){
        try {
            const singleLandmarkResponse = await Landmark.findById({_id: landmarkId}).populate('comments');
            return singleLandmarkResponse;
        } catch (error) {
            console.log(`Landmark not found. ${error}`)
        }
    }

    static async update(data){
            try {
                const updateResponse =  await Landmark.updateOne(
                    { _id: data._id }, 
                    {$set: {...data, date: Date.now()}});

                return updateResponse;
            } catch (error) {
                console.log(`Could not update Landmark ${error}` );

        }
    }

    static async delete(landmarkId){
        try {
            const deletedResponse = await Landmark.findOneAndDelete(landmarkId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could  ot delete Landmark ${error}`);
        }

    }
}

module.exports = LandmarkService;
