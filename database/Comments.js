const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('./index.js');
const User = require('./Users.js');
const Listing = require('./Listings.js');

let commentSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  username: String,
  message: String,
  posted: { type: Date, default: Date.now }
});

let Comment = mongoose.model('Comment', commentSchema);
exports.Comment = Comment;

exports.saveComment = (comment) => {
  return new Promise((resolve, reject) => {
    let newComment = {};
    newComment.userId = comment.userId;
    newComment.username = comment.username;
    newComment.message = comment.text;
    
    let CommentToStore = new Comment(newComment);
    
    CommentToStore.save(function(err) {
      Listing.Listing.findById(comment.listingId).exec((err, data) => {
        data.comments.push(CommentToStore._id);
        data.save(err => err ? console.error(err) : undefined);
      });
      if (err) { reject(err); }
      resolve(CommentToStore);
    });
  });
};
