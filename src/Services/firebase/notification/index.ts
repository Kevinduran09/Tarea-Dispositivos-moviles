import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../core/firebaseConfig";

export const savePushToken = async (token: string, uid: string) => {
  try {
    await setDoc(doc(db, "deviceTokens", uid), {
      token: token,
      updatedAt: new Date(),
    });
    alert("✅ Token guardado correctamente"); // ✅
  } catch (error) {
    alert("❌ Error al guardar token: " + error);
  }
};


export const getAllPushTokens = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "deviceTokens"));
    const tokens: { uid: string; token: string; }[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tokens.push({
        uid: doc.id,
        token: data.token
      });
    });

    return tokens; // Podés retornarlos o hacer algo con ellos
  } catch (error) {
    console.error("❌ Error al obtener los tokens:", error);
    return [];
  }
};
