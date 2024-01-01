const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailSchema = new Schema({
  userEmail: { type: String, required: true },
  userId: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
})

const Email = mongoose.model('Email', emailSchema)
module.exports = Email
