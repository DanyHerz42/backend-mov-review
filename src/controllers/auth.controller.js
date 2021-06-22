import { User, Role, VerificationCode } from '../models/';
import jwt from 'jsonwebtoken';

import config from '../config';
import verificationCode from '../libs/generateVerificationCode'
import deleteVerificationCode from '../libs/timerVerificationCode';
import validateCorrectCode from '../libs/validateCorrectCode';

const client = require('twilio')(config.ACCOUNT_SID, config.AUTH_TOKEN);

export const signup = async (req, res) => {
    const { username, email, password, repeatPassword, roles, phone, twoSteps } = req.body.values;
    console.log(req.body.values);
    //validar si usuario ya existe
    const validarEmail = await User.findOne({ email });
    if (validarEmail) {
        res.status(409).json({ message: "ese usuario ya existe" });
    } else {
        //validar contraseñas iguales
        if (!(password === repeatPassword)) {
            res.status(500).json({ message: "Las contraseñas no coinciden" });
        } else {
            //crear usuario
            const newUser = new User({
                username,
                email,
                password: await User.encryptPassword(password),
                phone,
                twoSteps
            })

            //asignar roles con respecto a array vacio ?
            if (roles) {
                const foundRoles = await Role.find({ name: { $in: roles } })
                newUser.roles = foundRoles.map(role => role._id)
            } else {
                const role = await Role.findOne({ name: "user" });
                newUser.roles = [role._id]
            }

            //guardar usuario y devolver token
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, config.SECRET)
            res.status(200).json({ token });
        }
    }
}

export const verificationTwice = async (req, res) => {
    try {
        const newVerification = new VerificationCode({
            code: verificationCode(),
            phone: req.body.phone
        })
    
        const createNewVerification = await newVerification.save()

        const messInfo = await client.messages.create({
            to: `+${req.body.phone}`,
            from: '+16105690732',
            body: `MovReview - Your verification code is ${createNewVerification.code}`
        })

        console.log(messInfo.sid);
        deleteVerificationCode(newVerification.code)

        res.status(200).json({code: createNewVerification.code});

        
    } catch (error) {
        console.log(error);
    }
}

export const verifyCode = async (req, res) => {

    let respuesta = await validateCorrectCode(req.body.phone, req.body.code)
    res.status(200).json({message: respuesta});
}

export const verifyIfUserExists = async (req, res) => {
    console.log(req.body);
    const {email } = req.body
    const validarEmail = await User.findOne({ email });
    if (validarEmail) {
        res.status(203).json({ message: "Ese usuario ya existe" });
    }else{
        res.status(200).json({message: "Usuario valido"})
    }
}

export const login = async (req,res) => {
    const {email, password} = req.body;
    const userFind = await User.findOne({ email });
    if (userFind) {
        let matchPassword = await User.comparePassword(password, userFind.password)
        if(matchPassword){
            const token = jwt.sign({ id: userFind._id }, config.SECRET)
            res.status(200).json({token, user: userFind})
        }else{
            res.status(206).json({ message: "Contraseña Incorrecta" });
        }

    }else{
        res.status(203).json({ message: "Usuario inexistente" });
    }

}

export const authAdmin = async (req, res) => {
    const {email, password} = req.body;
    const userFind = await User.findOne({ email });
    if (userFind) {
        let matchPassword = await User.comparePassword(password, userFind.password)
        if(matchPassword){
            const token = jwt.sign({ id: userFind._id }, config.SECRET)
            res.status(200).json({token, user: userFind})
        }else{
            res.status(206).json({ message: "Contraseña Incorrecta" });
        }

    }else{
        res.status(203).json({ message: "Usuario inexistente" });
    }

    
}