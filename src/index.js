const app =  require('./server')
require('./database/database')
require('dotenv').config()

app.listen(
    app.get('port'), 
    ()=> console.log(`Listening on http://localhost:${process.env.PORT}`)
)