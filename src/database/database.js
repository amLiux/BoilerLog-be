import mongoose from 'mongoose'
import config from '../config/config'

(async ()=> {
    const db = await mongoose.connect(
        config.mongodbUrl, 
        {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    )
    console.log(`Node is connected to ${db.connection.name} database...`)
}
)()
