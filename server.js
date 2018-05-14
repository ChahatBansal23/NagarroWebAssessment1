const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/api', require('./routes/api'))

app.listen(3000, () => console.log('server started at http://localhost:3000'))