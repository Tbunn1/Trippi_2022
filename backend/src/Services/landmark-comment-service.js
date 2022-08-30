const LandmarkComment = require("../models/landmarkComment");
const Landmark = require("../models/landmark");
const User = require('../models/user');

class LandmarkCommentService {
    static async getAllByLandmarkId(landmark){
        try {
            const allLandmarkComments = await LandmarkComment.find({ landmark });
            return allLandmarkComments;
        } catch (error) {
            console.log(`Could not fetch LandmarkComments ${error}`)
        }
    }

    static async getAllByUserId(author){
        try {
            const allLandmarkComments = await LandmarkComment.find({ author });
            return allLandmarkComments;
        } catch (error) {
            console.log(`Could not fetch LandmarkComments ${error}`)
        }
    }

    static async getAll(){
        try {
            const allLandmarkComments = await LandmarkComment.find();
            return allLandmarkComments;
        } catch (error) {
            console.log(`Could not fetch LandmarkComments ${error}`)
        }
    }

    static async create(data){
        try {
           const { landmark } = data;
           const relatedLandmark = await Landmark.findById(landmark);

           if (relatedLandmark) {
               const response = await new LandmarkComment(data).save();
               
               relatedLandmark.comments.push(response);
               relatedLandmark.save();
               return response;
           } else {
               throw new Error('No landmark for provided id');
           }
        } catch (error) {
            console.log(error);
        } 

    }
    static async getById(LandmarkCommentId){
        try {
            const singleLandmarkCommentResponse = await LandmarkComment.findById({_id: LandmarkCommentId});
            return singleLandmarkCommentResponse;
        } catch (error) {
            console.log(`LandmarkComment not found. ${error}`)
        }
    }

    static async update(data){
            try {
                const updateResponse =  await LandmarkComment.updateOne(
                    { _id: data._id }, 
                    {$set: {...data, date: Date.now()}});

                    return updateResponse;
            } catch (error) {
                console.log(`Could not update LandmarkComment ${error}` );

        }
    }

    static async delete(LandmarkCommentId){
        try {
            const deletedResponse = await LandmarkComment.findOneAndDelete(LandmarkCommentId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could  ot delete LandmarkComment ${error}`);
        }

    }
}

module.exports = LandmarkCommentService;
