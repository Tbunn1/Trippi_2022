const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const UserSchema = Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    country:{
        type: String,
        required: true
    },
    image: {
        type: String
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    bio: {
        type: String
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    console.log('\n\n\n\n',user.isModified('password'))
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
UserSchema.methods.comparePassword = async (candidatePassword, user) => {
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    return isMatch;
};

module.exports = User = mongoose.model("User", UserSchema);
