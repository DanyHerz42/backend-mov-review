import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
    name: String,
    sinopsis: String,
    duration: String,
    protaginist: String,
    director: String,
    language: String,
    producedBy: String,
    roles: [{
        ref: "Review",
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false
})

const Movie = model("Movie", movieSchema);
export default Movie;