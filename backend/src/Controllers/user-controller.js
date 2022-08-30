require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserService = require("../services/user-service");

module.exports = class User {

   static async apiGetAll(req, res, next){
       try {
         const Users = await UserService.getAll();
         res.json(Users);
       } catch (error) {
          res.status(500).json({ error });
       }
   }

   static async apiGetById(req, res, next){
      try {
         let id = req.params.id || {};
         const User = await UserService.getById(id);
         if(!User){
            res.status(404).json("There is no User")
         }
         res.json(User);
      } catch (error) {
         res.status(500).json({ error: error.message || error.error });
      }
   }

   static async apiCreate(req, res, next){
      try {
         const createdUser = await UserService.create({
            ...req.body,
            image: req?.file?.path
         });
         res.json(createdUser);
      } catch (error) {
         res.status(500).json({ error: error.message || error.error });
      }
   }

   static async apiUpdate(req, res, next){
      try {
         const { bio } = req.body || {};
         const updates = {
            _id: req.userId,
            ...(bio ? { bio } : {}),
            ...(req?.file?.path ? { image: req?.file?.path } : {})
         };

         // return 400 if no data was provided
         if (Object.keys(updates).length <= 1) {
            res.status(400).json({ error: 'No body or incorrect body was provided' });
         }

         const updatedUser = await UserService.update(updates);
         if(updatedUser.modifiedCount === 0){
            throw new Error("Unable to update User, error occord");
         }

         res.json({ message: 'User profile was successfully updated' });

      } catch (error) {
         console.log(error);
         res.status(500).json({ error: error.message || error.error });
      }
   }

   static async apiDelete(req, res, next){
         try {
            const deleteResponse =  await UserService.delete(req.params.id)
            res.json(deleteResponse);
         } catch (error) {
            res.status(500).json({ error: error.message || error.error });
         }
   }

   static async apiLogin(req, res, next) {
      try {
         const username = req.body.username || '';
         const user = await UserService.findByUsername(username, true);

         if (!user) {
            return res.status(400).json({
               message: "Username or password mismatch"
            });
         }

         const isMatch = await user.comparePassword(req?.body?.password || '', user);
         if (!isMatch) {
            return res.status(400).json({
               message: "Username or password mismatch"
            });
         }

         const payload = {
           user: {
             id: user.id
           }
         };

         const token = jwt.sign(
           payload,
           process.env.JWT_SECRET,
           {
             expiresIn: '12h'
           }
         );
         console.log(token)
         // cookie max age 12hr
         res.cookie('x-access-token', token, { maxAge: 12 * 60 * 60 * 1000, httpOnly: true, signed: true });
         res.json({ token, userId: user.id, username });
      } catch (error) {
         res.status(500).json({ error: error.message || error.error });
      }
   }

   static async updatePassword(req, res, next) {
      try {
         const { password, newPassword, confirmNewPassword } = req.body || {};
         const user = await UserService.getById(req.userId, true);

         if (!user) {
            return res.status(400).json({
               message: 'User cannot be found'
            });
         }

         if (!password && !newPassword && !confirmNewPassword) {
             return res.status(400).json({
               message: "Please provide current password, new password, and confirm new password"
            });
         }

         const isMatch = await user.comparePassword(req?.body?.password || '', user);
         if (!isMatch) {
            return res.status(401).json({
               message: "Incorrect current password provided"
            });
         }

         if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
               message: "New password and confirm new password do not match"
            });
         }

         const updatedUser = await UserService.update({ _id: req.userId, password });

         if(updatedUser?.modifiedCount === 0){
            throw new Error("Unable to update User, error occord");
         }

         res.json({ message: 'Password successfully updated' });

      } catch (error) {
         console.log(error);
         res.status(500).json({ error: error.message || error.error });
      }
   }

}
