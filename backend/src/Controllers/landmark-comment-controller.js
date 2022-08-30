const fs = require('fs');
const LandmarkCommentService = require("../services/landmark-comment-service");

module.exports = class LandmarkComment {

   static async apiGetAll(req, res, next){
       try {
         const LandmarkComments = await LandmarkCommentService.getAll();
         res.json(LandmarkComments);
       } catch (error) {
          res.status(500).json({ error: error.message || error.error });
       }
   }

   static async apiGetById(req, res, next){
      try {
         let id = req.params.id || {};
         const LandmarkComment = await LandmarkCommentService.getById(id);
         if(!LandmarkComment){
            res.status(404).json("There is no LandmarkComment")
         }
         res.json(LandmarkComment);
      } catch (error) {
         res.status(500).json({ error: error.message || error.error });
      }
   }

   static async apiCreate(req, res, next){
      try {
         const newItem = {
            ...req.body,
            userId: req.userId
         };
         const createdLandmarkComment =  await LandmarkCommentService.create(newItem);
         res.json(createdLandmarkComment);
      } catch (error) {
         res.status(500).json({ error: error.message || error.error });;
      }
   }

   static async apiUpdate(req, res, next){
      try {
         const newItem = {
            ...req.body,
            userId: req.userId
         };
         const updatedLandmarkComment = await LandmarkCommentService.update(newItem);

         if(updatedLandmarkComment.modifiedCount === 0){
            throw new Error("Unable to update LandmarkComment, error occord");
         }

         res.json(updatedLandmarkComment);

      } catch (error) {
         res.status(500).json({ error: error.message || error.error });;
      }
   }

   static async apiDelete(req, res, next){
         try {
            const deleteResponse =  await LandmarkCommentService.delete(req.params.id)
            res.json(deleteResponse);
         } catch (error) {
            res.status(500).json({ error: error.message || error.error });
         }
   }

}
