var mongoose = require('mongoose');

const FacebookUserSchema = new mongoose.Schema({
    username: String,
    facebookId: String
});
  
const FacebookUser = mongoose.model('FacebookUser', FacebookUserSchema);

module.exports = FacebookUser;