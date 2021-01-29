import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Comment = new Schema(
  {
    content: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    taskId: { type: String, required: true },
    parentId: { type: String, require: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Comment.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Comment
