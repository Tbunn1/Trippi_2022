const User = require("../models/user");

class UserService{
    static async getAll(){
        try {
            return await User.find();
        } catch (error) {
            console.log(`Could not fetch Users ${error}`)
        }
    }

    static async create(data){
        try {
            const response = await new User(data).save();
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        } 

    }
    static async getById(id, includePassword=false){
        try {
            const user = await User.findById({_id: id}).select(includePassword ? '+password' : '');
            return user; 
        } catch (error) {
            console.log(`User not found. ${error}`)
        }
    }

    static async update(data){
            try {
                const updateResponse =  await User.updateOne(
                    { _id: data._id }, 
                    {$set: {...data, date: Date.now()}});
                    return updateResponse;
            } catch (error) {
                console.log(`Could not update User ${error}` );

        }
    }

    static async delete(UserId){
        try {
            const deletedResponse = await User.findOneAndDelete(UserId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could  ot delete User ${error}`);
        }
    }

    static async findByUsername(username, includePassword=false){
        try {
            const foundResponse = await User.findOne({ username }).select(includePassword ? '+password' : '');
            return foundResponse;
        } catch (error) {
            console.log(`Could not find User ${error}`);
        }
    }
}

module.exports = UserService;
