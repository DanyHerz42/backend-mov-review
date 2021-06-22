import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import config from '../config';
import Role from '../models/roles.model';

export const verifyToken = (req, res, next) => {
    console.log(req.headers['x-access-token'])
    try {
        const token = req.headers['x-access-token']

        if (!token) return res.status(403).json({ message: "No token provided" })

        const decoded = jwt.verify(token, config.SECRET);

        req.userId = decoded.id;

        const user = User.findOne(req.userId, { password: 0 })
        if (!user) return res.status(404).json({ message: "No user found" })

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unautorized"})
    }
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
      res.status(203).json({ message: "Usuario incorrecto" })
    }
    const roles = await Role.find({_id: {$in: user.roles}});
    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name === "admin"){
            next();
            return;
        }
    }
    res.status(403).json({ message: "Require admin role" })
}

export const isAdminTwo = async (req, res, next) => {
  const user = await User.findOne({_id: req.userId});
  if(!user){
    res.status(203).json({ message: "Usuario incorrecto" })
  }
  const roles = await Role.find({_id: {$in: user.roles}});
  for (let i = 0; i < roles.length; i++) {
      if(roles[i].name === "admin"){
          next();
          return;
      }
  }
  res.status(403).json({ message: "Require admin role" })
}