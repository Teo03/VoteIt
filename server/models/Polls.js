var mongoose = require('mongoose');

const Poll = new mongoose.Schema({
    name: { type: String, required: true },
    options: { type: Array, required: true },
    creator: { type: String, default: 'Guest' }
});
  
const Polls = mongoose.model('Polls', Poll);

module.exports = Polls;