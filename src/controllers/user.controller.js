import { User } from "../models";

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req;
    console.log(userId);
    const findUser = await User.findOne({ _id: userId })

    res.status(200).json(findUser);
  } catch (error) {
    console.error(error);
  }

}