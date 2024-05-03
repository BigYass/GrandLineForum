const app = require("./app.js")
const port = process.env.PORT || 4000

app.default.listen(port, () => {
  console.log(`Serveur listening at port ${port}`)
})

