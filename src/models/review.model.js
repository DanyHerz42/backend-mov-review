import { Schema, model} from 'mongoose';

const reviewSchema = new Schema({
    review: String,
    points: Number,
    user: {
        ref: "User",
        type: Schema.Types.ObjectId
    }
},{
    timestamps: true,
    versionKey: false
})

const Review = model("Review", reviewSchema);
export default Review;