import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Task = new Schema(
  {
    content: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    position: { type: Number, require: true },
    parentId: { type: String, require: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Task
