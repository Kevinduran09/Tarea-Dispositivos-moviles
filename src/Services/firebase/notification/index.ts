import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../core/firebaseConfig";

export const savePushToken = async (token: string, uid: string,name:string) => {
 
  
  try {
    await setDoc(doc(db, "deviceTokens", uid), {
      token: token,
      owner:name,
      updatedAt: new Date(),
    });
    alert("✅ Token guardado correctamente"); 
  } catch (error) {
    alert("❌ Error al guardar token: " + error);
  }
};


export const getAllPushTokens = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "deviceTokens"));
    const tokens: { uid: string; token: string; owner:string}[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tokens.push({
        uid: doc.id,
        token: data.token,
        owner:data.owner
      });
    });

    return tokens; 
  } catch (error) {
    console.error("❌ Error al obtener los tokens:", error);
    return [];
  }
};
