const express = require('express')
const cors = require('cors')
const mongo = require('mongodb')
const mongoose = require('mongoose')
var postmark = require('postmark')

const Email = require('./models/emailSchema')

const app = express()

var serverToken = 'aed3cba6-1603-4ac3-a0f0-21907a9bef5c'
var client = new postmark.ServerClient(serverToken)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 5000

const uri = 'mongodb+srv://bt20cse141:bt20cse141@cluster0.wks60ra.mongodb.net/'

mongoose.connect(uri, { useNewUrlParser: true })

const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB connection established successfully')
})

app.post('/sendEmail', async (req, res) => {
  const data = req.body
  client
    .sendEmail({
      From: data.userEmail,
      To: data.to,
      Subject: data.subject,
      TextBody: data.body,
    })
    .then((response) => {
      console.log('Message delivered')
    })

  const newEmail = new Email(data)
  const result = await newEmail.save()

  console.log('Data inserted successfully:', result)
  res.status(200).send('Data inserted successfully')
})

app.post('/fetchreceived', async (req, res) => {
  const userEmail = req.body.userEmail
  try {
    const documents = await Email.find({ to: userEmail })
    res.json(documents)
  } catch (error) {
    console.error('Error fetching documents:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/fetchsent', async (req, res) => {
  const userId = req.body.userId
  try {
    const documents = await Email.find({ userId: userId })
    res.json(documents)
  } catch (error) {
    console.error('Error fetching documents:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
