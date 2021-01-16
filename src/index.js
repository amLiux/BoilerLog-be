import app from './server'
import './database/database'
import 'dotenv'

app.listen(
    app.get('port'), 
    ()=> console.log(`Listening on http://localhost:${process.env.PORT}`)
)