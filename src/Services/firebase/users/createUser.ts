import { Auth } from "firebase/auth"
import { db } from "../../../core/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"


export const createNewAccount = async (uid:string,email:string,username:string)=>{
    try {
        await setDoc(doc(db,'users',uid),{
            username: username,
            email: email,
            createdAt: new Date().toISOString()
        })
        await saveUserRol(uid)
        return {success:true,error:null}
    } catch (error) {
        const errorMessage = (error as Error)?.message || 'Error Desconocido'
        console.error('Error to login: ', errorMessage);
        return { success: false, error: errorMessage }
    }
}   

const saveUserRol = async (uid:string)=>{
   try {
       await setDoc(doc(db, 'roluser', uid), {
           rol: 'user',
           user_id: uid
       })
       return {result:true}
   } catch (error) {
       const errorMessage = (error as Error)?.message || 'Error Desconocido'
       console.error('Error to login: ', errorMessage);
       return { result: false, error: errorMessage }
   }
}