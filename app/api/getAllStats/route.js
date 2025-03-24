import {adminDb} from "@/firebaseadmin";

export async function GET() { // add more stats here...
  try{
    const usersRef = adminDb.collection("users");
    const [emptySnap, pendingSnap, acceptedSnap, rejectedSnap, rsvpSnap, checkedInSnap, firstHackersSnap,
      freshmanSnap, sophomoreSnap, juniorSnap, seniorSnap, graduateSnap
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
      // add meals
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

    // add meals stats here...

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

      // add meals stats here...
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });

  }  catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}