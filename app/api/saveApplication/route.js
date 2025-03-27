import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function POST(req) {
  try {
    const data = await req.json()
    
    // Validate required fields
    const requiredFields = ['userId', 'firstName', 'lastName', 'email', 'phone', 'age', 'country', 'gender', 'ethnicity', 'school', 'major', 'levelOfStudy', 'shirtSize', 'disclaimer', 'codeOfConduct', 'privacyPolicy'];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        console.error(`Missing required field: ${field}`);
        return new Response(JSON.stringify({ 
          error: `Missing required field: ${field}`,
          missingField: field 
        }), { status: 400 });
      }
    }

    const userRef = doc(db, 'users', data.userId)

    // Prepare update object with all fields
    const updateObject = {
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
      shirtSize: data.shirtSize,
      disclaimer: data.disclaimer,
      codeOfConduct: data.codeOfConduct,
      privacyPolicy: data.privacyPolicy,
      
      // Optional fields with default values or existing data
      otherSchool: data.otherSchool || '',
      firstHackathon: data.firstHackathon || false,
      dietaryRestrictions: data.dietaryRestrictions || [],
      otherAccommodations: data.otherAccommodations || '',
      fileName: data.fileName || '',
      notifications: data.notifications || false
    };

    await updateDoc(userRef, updateObject);

    return new Response(JSON.stringify({ 
      message: 'User status updated successfully',
      data: { userId: data.userId } 
    }), { status: 200 })

  } catch (error) {
    console.error('Detailed error updating user status:', error);
    return new Response(JSON.stringify({ 
      error: 'Error updating user status', 
      details: error.message 
    }), { status: 500 })
  }
}