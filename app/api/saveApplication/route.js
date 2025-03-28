import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/HackUSF/firebase";

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
      otherSchool: data.otherSchool,
      major: data.major,
      levelOfStudy: data.levelOfStudy,
      firstHackathon: data.firstHackathon,
      shirtSize: data.shirtSize,
      dietaryRestrictions: data.dietaryRestrictions,
      otherAccommodations: data.otherAccommodations,
      fileName: data.fileName,
      disclaimer: data.disclaimer,
      codeOfConduct: data.codeOfConduct,
      privacyPolicy: data.privacyPolicy,
      notifications: data.notifications
    });

    return new Response(JSON.stringify({ message: 'User status updated successfully' }), { status: 200 })

  } catch (error) {
    console.error('Error updating user status', error)
    return new Response(JSON.stringify({ error: 'Error updating user status' }), { status: 500 })
  }
}
