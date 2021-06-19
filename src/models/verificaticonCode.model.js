import { Schema, model } from 'mongoose';

const verificationCode = new Schema({
    code: Number,
    phone: Number
},{
    versionKey: false
})

const VerificationCode = model("VerificationCode", verificationCode)

export default VerificationCode;
