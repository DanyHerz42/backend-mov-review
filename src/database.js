import mongoose from 'mongoose';
import config from './config';

mongoose.connect(config.DB_SERVER, {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(db => console.log("Db is connected"))
.catch(error => console.error(error))
