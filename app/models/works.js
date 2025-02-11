import mongoose from 'mongoose'

const schecmaWorks = mongoose.Schema({
  workType: {
    type: String,
    required: true
  },

  dateRemeber: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  }
})

export const modelWorks = mongoose.model('works', schecmaWorks)