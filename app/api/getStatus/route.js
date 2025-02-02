import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function GET(request) {
  try {
    console.log(request.nextURL)
    // const userId = req.nextURL.searchParams.get('userId')
    // const docRef = doc(db, "users", userId)
    // const docSnap = await getDoc(docRef)
    // console.log(docSnap)

    return new Response(JSON.stringify({ success: true }), { status: 200 })
    
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })
  }
}