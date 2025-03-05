import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";

export async function GET(req) {
  try {
    const usersCollection = collection(db, "users")
    const querySnapshot = await getDocs(usersCollection)

    const users = { pending: [], accepted: [], rejected: [] };
    querySnapshot.forEach((doc) => {
      const userData = { id: doc.id, ...doc.data() };
      if (userData.status === "pending") users.pending.push(userData);
      else if (userData.status === "accepted") users.accepted.push(userData);
      else if (userData.status === "rejected") users.rejected.push(userData);
    });

    return new Response(JSON.stringify({ success: true, data: users }), { status: 200 })
    
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })
  }
}