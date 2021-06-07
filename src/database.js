import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://daniel:12345@cluster0.ymxjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(db => console.log("Db is connected"))
.catch(error => console.error(error))
