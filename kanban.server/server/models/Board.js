import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Board = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Board.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Board
