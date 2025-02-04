import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function POST(req) {
  try {
    const data = await req.json()
    const userRef = doc(db, "users", data.userId)
    const docSnap = await getDoc(userRef)
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: "",
        country: "",
        gender: "",
        ethnicity: "",

        school: "",
        major: "",
        levelOfStudy: "",

        firstHackathon: false,
        shirtSize: "",
        dietaryRestrictions: [],
        otherAccommodations: "",

        status: "pending",
        checkedIn: false,
        rsvp: false,
        disclaimer: false,
        codeOfConduct: false,
        privacyPolicy: false
      })
    } else {
      console.log("User already exists")
    }

    return new Response(JSON.stringify({ success: true, message: "Profile created successfully" }), { status: 200 })

  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })
  }
}
