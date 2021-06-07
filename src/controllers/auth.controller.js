import { User, Role } from '../models/';
import jwt from 'jsonwebtoken';
import  config from '../config';

export const signup = async (req, res) => {
    const { username, email, password,repeatPassword, name, lastname, roles } = req.body;
    //validar si usuario ya existe
    const validarUsername = await User.findOne({ username });
    const validarEmail = await User.findOne({ email });
    if (validarUsername || validarEmail) {
        res.status(500).json({ message: "ese usuario ya existe" });
    }
    //validar contraseñas iguales
    if(!(password === repeatPassword)){
        res.status(500).json({ message: "Las contraseñas no coinciden" });
    }

    //crear usuario
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
        name,
        lastname
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
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400
    })
    res.status(200).json({ token });
}