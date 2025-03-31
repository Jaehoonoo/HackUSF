import { adminDb } from "@/firebaseadmin";

export async function GET() { // add more stats here...
  try{
    const usersRef = adminDb.collection("users");

    const [totalApplicationCount, pendingCount, acceptedCount, rejectedCount,
        rsvpCount, checkedInCount, firstHackersCount,
        freshmanCount, sophomoreCount, juniorCount, seniorCount, graduateCount,
        scannedBreakfastCount, scannedLunch1Count, scannedDinnerCount, scannedLunch2Count,
    ] = await Promise.all([
      usersRef.where("email", "!=", "").count().get(),
      usersRef.where("status", "==", "pending").count().get(),
      usersRef.where("status", "==", "accepted").count().get(),
      usersRef.where("status", "==", "rejected").count().get(),
      usersRef.where("rsvp", "==", true).count().get(),
      usersRef.where("checkedIn", "==", true).count().get(),
      usersRef.where("firstHackathon", "==", true).count().get(),
      usersRef.where("levelOfStudy", "==", "Freshman").count().get(),
      usersRef.where("levelOfStudy", "==", "Sophomore").count().get(),
      usersRef.where("levelOfStudy", "==", "Junior").count().get(),
      usersRef.where("levelOfStudy", "==", "Senior").count().get(),
      usersRef.where("levelOfStudy", "==", "Graduate Student").count().get(),
      usersRef.where("scannedMeals.breakfast", "==",true).count().get(),
      usersRef.where("scannedMeals.lunch1", "==",true).count().get(),
      usersRef.where("scannedMeals.dinner", "==",true).count().get(),
      usersRef.where("scannedMeals.lunch2", "==",true).count().get(),
    ]);

    const data = {
      totalRsvp: rsvpCount.data().count,
      totalCheckedIn: checkedInCount.data().count,
      totalFirstHackers: firstHackersCount.data().count,
      totalAccepted: acceptedCount.data().count,
      totalPending: pendingCount.data().count,
      totalRejected: rejectedCount.data().count,
      totalApplications: totalApplicationCount.data().count,

      totalFreshman: freshmanCount.data().count,
      totalSophomore: sophomoreCount.data().count,
      totalJunior: juniorCount.data().count,
      totalSenior: seniorCount.data().count,
      totalGrad: graduateCount.data().count,

      totalScannedBreakfast: scannedBreakfastCount.data().count,
      totalScannedLunch1: scannedLunch1Count.data().count,
      totalScannedDinner: scannedDinnerCount.data().count,
      totalScannedLunch2: scannedLunch2Count.data().count,
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });

  }  catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}