const fs = require('fs');
const LandmarkService = require("../services/landmark-service");

module.exports = class Landmark {

   static async apiGetAll(req, res, next){
       try {
         const Landmarks = await LandmarkService.getAll();
         res.json(Landmarks);
       } catch (error) {
          res.status(500).json({ error: error.message || error.error });
       }
   }

   static async apiGetById(req, res, next){
      try {
         let id = req.params.id || {};
         const landmark = await LandmarkService.getById(id);
         if(!landmark){
            res.status(404).json("There is no landmark")
         }
         res.json(landmark);
      } catch (error) {
         res.status(500).json({ error: error.message || error.error });
      }
   }

   static async apiCreate(req, res, next){
      try {
         const createdLandmark =  await LandmarkService.create(req.body);

         res.json(createdLandmark);
      } catch (error) {
         res.status(500).json({ error: error.message || error.error });;
      }
   }

   static async apiUpdate(req, res, next){
      try {
         const newItem = {
            ...req.body
         }
         const updatedLandmark = await LandmarkService.update(newItem);

         if(updatedLandmark.modifiedCount === 0){
            throw new Error("Unable to update Landmark, error occord");
         }

         res.json(updatedLandmark);

      } catch (error) {
         res.status(500).json({ error: error.message || error.error });;
      }
   }

   static async apiDelete(req, res, next){
         try {
            const deleteResponse =  await LandmarkService.delete(req.params.id)
            res.json(deleteResponse);
         } catch (error) {
            res.status(500).json({ error: error.message || error.error });
         }
   }

}
