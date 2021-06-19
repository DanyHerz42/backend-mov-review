import { VerificationCode } from '../models';
export default async function validateCorrectCode(phone, tCode) {
  
  let phoneParsed = parseInt(phone)
  let codeParsed = parseInt(tCode)

  try {

    const existPhone = await VerificationCode.findOne({ phone: phoneParsed });
    if(!existPhone){
      return (1)
    }else{
      if(existPhone.code === codeParsed){
        return (2)
      }else{
        return (3)
      }
    }
    

  } catch (error) {
    console.log(error);
  }

}
