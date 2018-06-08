var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
    const user = this;

    //USERNAME CHECK //
    User.find({username : user.username}, function (err, docs) {
        if (!docs.length){
            next();
        } else {                
            next(new Error("User Exists"));
        }
    });

    //PASSWORD HASHING //
    if (!user.isModified('password')) {
      return next();
    }

    return bcrypt.hash(user.password, 10).then(hashedPassword => {
        user.password = hashedPassword;
        return next();
      })
      .catch(err => {
        return next(err);
      });
  });

  UserSchema.methods.comparePassword = function(candidatePassword, next) {
    
    return bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return next(err);
      }
      return next(null, isMatch);
    });
  };
  
  const User = mongoose.model('User', UserSchema);
  module.exports = User;