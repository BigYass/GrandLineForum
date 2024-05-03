const express = require('express')
const app = express()



//Starting the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server listening at port ' + port)
})
