const mongoose = require('mongoose')

const uri = 'mongodb+srv://bt20cse141:bt20cse141@cluster0.wks60ra.mongodb.net/'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB connection established successfully')
})
