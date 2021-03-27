const mongoose = require('mongoose');

module.exports = {
    async connect():Promise<void>{
        try{
            await mongoose.connect('mongodb://localhost:27017/uptimeurl', {useNewUrlParser: true, useUnifiedTopology: true});
            console.log("Successful connected to the database on port 27017");
        }catch(err){
            console.warn(err);
        }
    }
}
