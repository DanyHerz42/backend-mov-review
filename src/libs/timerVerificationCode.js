import { VerificationCode } from '../models';
export default async function deleteVerificationCode(code) {
  try {
    setTimeout(async () => {
      const borrar = await VerificationCode.findOneAndDelete({ code });
      console.log("yaaaaaaa");
    }, 60000)

  } catch (error) {
    console.log(error);
  }

}

