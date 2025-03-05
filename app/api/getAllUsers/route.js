import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";

export async function GET(req) {
  try {
    const usersCollection = collection(db, "users")
    const querySnap = await getDocs(usersCollection)

    const users = {};
    querySnap.forEach((doc) => {
      users[doc.id] = doc.data(); // Store data with doc ID as key
    });

    return new Response(JSON.stringify({ success: true, data: users }), { status: 200 })
    
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })
  }
}