const connectToMong = require('./db');
const express = require('express');
const cors = require('cors')

connectToMong();
const app = express()
const port = 5000

app.use(cors());
app.use(express.json())

//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/appointments', require('./routes/appointments'))

app.listen(port, () => {
  console.log(`Appointment app listening on http://localhost:${port}`)
})