import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function POST(req) {
  try {
    const data = await req.json()
    const userRef = doc(db, 'users', data.userId)

    await updateDoc(userRef, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      age: data.age,
      country: data.country,
      gender: data.gender,
      ethnicity: data.ethnicity,
      school: data.school,
      major: data.major,
      levelOfStudy: data.levelOfStudy,
      firstHackathon: data.firstHackathon,
      shirtSize: data.shirtSize,
      dietaryRestrictions: data.dietaryRestrictions,
      otherAccommodations: data.otherAccommodations,
      disclaimer: data.disclaimer,
      codeOfConduct: data.codeOfConduct,
      privacyPolicy: data.privacyPolicy
    });

    return new Response(JSON.stringify({ message: 'User status updated successfully' }), { status: 200 })

  } catch (error) {
    console.error('Error updating user status', error)
    return new Response(JSON.stringify({ error: 'Error updating user status' }), { status: 500 })
  }
}
