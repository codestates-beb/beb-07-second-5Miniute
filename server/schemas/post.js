const mongoose = require('mongoose');

const { Schema } = mongoose;
const postSchema = new Schema({
  user_name: {type: String, ref: 'User'},
  profile_image: {type: String},
  like: {type: Number},
  problem_name: {type: String, ref: "Problem"},
  title: {type: String},
  hash_title: [{type:String ,default:null,ref: "Hashtag"}],
  content: {type: String},
  created_at :{type: Date,default: Date.now},
  address: {type:String},
  comments: [
    {
      user_name:{type: String},
      profile_image: {type: String},
      comment_content: {type: String},
      like: {type:Number},
    }
  ]
})
module.exports = mongoose.model('Post', postSchema);