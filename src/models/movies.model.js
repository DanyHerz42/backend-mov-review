import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
    name: String,
    sinopsis: String,
    duration: String,
    producedBy: String,
    imageURL: String
    
},{
    timestamps: true,
    versionKey: false
})

const Movie = model("Movie", movieSchema);
export default Movie;