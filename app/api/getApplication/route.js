import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function GET(req) {
  try {
    const userId = new URL(req.url, `http://${req.headers.host}`).searchParams.get('userId');
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    return new Response(JSON.stringify({ success: true, data: docSnap.data() }), { status: 200 })
    
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })
  }
}
