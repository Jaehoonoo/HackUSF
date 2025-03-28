import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/HackUSF/firebase";

export async function POST(req) {
  try {
    const data = await req.json()
    const userRef = doc(db, 'users', data.userId)

    await updateDoc(userRef, {rsvp: data.rsvp});

    return new Response(JSON.stringify({ message: 'User RSVP updated successfully' }), { status: 200 })

  } catch (error) {
    console.error('Error updating user status', error)
    return new Response(JSON.stringify({ error: 'Error updating user RSVP' }), { status: 500 })
  }
}
