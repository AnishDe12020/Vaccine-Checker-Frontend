import { firestore } from "@/lib/firebase"

export const submitData = async (email, data) => {
  return await firestore.collection("data").doc(email).set(data)
}
