const mongoose = require ('mongoose');

(async ()=> {
    const db = await mongoose.connect(
        process.env.MONGODB_URI, 
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
