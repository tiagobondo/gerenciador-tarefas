import mongoose from "mongoose"

const schemaUsers = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  passwordRec: {
    type: String,
    required: true
  }
})

export const modelUser = mongoose.model('users', schemaUsers)