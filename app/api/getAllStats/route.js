import { adminDb } from "@/firebaseadmin";

export async function GET() { // add more stats here...
  try{
    const usersRef = adminDb.collection("users");
    const [emptySnap, pendingSnap, acceptedSnap, rejectedSnap, rsvpSnap, checkedInSnap, firstHackersSnap,
      freshmanSnap, sophomoreSnap, juniorSnap, seniorSnap, graduateSnap,
      breakfastFalseSnap, lunch1FalseSnap, dinnerFalseSnap, lunch2FalseSnap,
      breakfastTrueSnap, lunch1TrueSnap, dinnerTrueSnap,lunch2TrueSnap
    ] = await Promise.all([
      usersRef.where("age", "==", "").get(),
      usersRef.where("status", "==", "pending").get(),
      usersRef.where("status", "==", "accepted").get(),
      usersRef.where("status", "==", "rejected").get(),
      usersRef.where("rsvp", "==", true).get(),
      usersRef.where("checkedIn", "==", true).get(),
      usersRef.where("firstHackathon", "==", true).get(),
      usersRef.where("levelOfStudy", "==", "Freshman").get(),
      usersRef.where("levelOfStudy", "==", "Sophomore").get(),
      usersRef.where("levelOfStudy", "==", "Junior").get(),
      usersRef.where("levelOfStudy", "==", "Senior").get(),
      usersRef.where("levelOfStudy", "==", "Graduate Student").get(),
      usersRef.where("scannedMeals.breakfast", "==",false).get(),
      usersRef.where("scannedMeals.lunch1", "==",false).get(),
      usersRef.where("scannedMeals.dinner", "==",false).get(),
      usersRef.where("scannedMeals.lunch2", "==",false).get(),
      usersRef.where("scannedMeals.breakfast", "==",true).get(),
      usersRef.where("scannedMeals.lunch1", "==",true).get(),
      usersRef.where("scannedMeals.dinner", "==",true).get(),
      usersRef.where("scannedMeals.lunch2", "==",true).get(),
    ]);

    const emptyUsers = emptySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const pendingUsers = pendingSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const acceptedUsers = acceptedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const rejectedUsers = rejectedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const rsvpUsers = rsvpSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const checkedInUsers = checkedInSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const firstHackersUsers = firstHackersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const freshmanUsers = freshmanSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const sophomoreUsers = sophomoreSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const juniorUsers = juniorSnap.docs.map(doc => ({ id: doc.id,...doc.data() }));
    const seniorUsers = seniorSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const graduateUsers = graduateSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const notScannedBreakfast = breakfastFalseSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const notScannedLunch1 = lunch1FalseSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const notScannedDinner = dinnerFalseSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const notScannedLunch2 = lunch2FalseSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const scannedBreakfast = breakfastTrueSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const scannedLunch1 = lunch1TrueSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const scannedDinner = dinnerTrueSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const scannedLunch2 = lunch2TrueSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const data = {
      totalRsvp: rsvpUsers.length,
      totalCheckedIn: checkedInUsers.length,
      totalFirstHackers: firstHackersUsers.length,
      totalAccepted: acceptedUsers.length,
      totalPending: pendingUsers.length,
      totalRejected: rejectedUsers.length,
      totalApplications: (pendingUsers.length + acceptedUsers.length + rejectedUsers.length) - emptyUsers.length,

      totalFreshman: freshmanUsers.length,
      totalSophomore: sophomoreUsers.length,
      totalJunior: juniorUsers.length,
      totalSenior: seniorUsers.length,
      totalGrad: graduateUsers.length,

      totalNotScannedBreakfast: notScannedBreakfast.length,
      totalNotScannedLunch1: notScannedLunch1.length,
      totalNotScannedDinner: notScannedDinner.length,
      totalNotScannedLunch2: notScannedLunch2.length,
      totalScannedBreakfast: scannedBreakfast.length,
      totalScannedLunch1: scannedLunch1.length,
      totalScannedDinner: scannedDinner.length,
      totalScannedLunch2: scannedLunch2.length,
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });

  }  catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}