import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    twoSteps: {
        type: Boolean,
        require: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
    moviesFavs: [{
        ref: "Movie",
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
    const salts = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salts)
}

userSchema.statics.comparePassword = async (password, receivePassword) => {
    return await bcrypt.compare(password, receivePassword);
}

const User = model('User', userSchema)
export default User;