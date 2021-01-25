import mongoose from 'mongoose'
const Schema = mongoose.Schema

const List = new Schema(
  {
    title: { type: String, required: true },
    position: { type: Number, require: true },
    creatorId: { type: String, ref: 'Account', required: true },
    parentId: { type: String, require: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

List.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default List
