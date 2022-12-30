const express = require('express')
const app = express()
const port = 3000

app.use(require('./middlewares/logger.js'))
app.use('/api', require('./routes/api.js'))
app.listen(port, () => {
    console.log(`server is listening on http://locahost:${port}`)
})